'use client';

import React from "react";
import { Check } from "lucide-react";
import shared from "../PricingShared.module.css";
import layout from "../PricingLayout.module.css";
import local from "./PlanCard.module.css";
import type { BillingCycle } from "../../pricingModel";
import { planCta } from "../planCta";
import { describePlan } from "../planCardData";
import { PlanCardPrice } from "../PlanCardPrice/PlanCardPrice";
import { PlanAiBox } from "../PlanAiBox";

const styles = { ...shared, ...layout, ...local };

interface PlanCardProps {
    plan: any;
    cycle: BillingCycle;
    includeAi: boolean;
    onIncludeAiChange?: (val: boolean) => void;
    currentPlanName: string | null;
    onSelect: (plan: any) => void;
}

export function PlanCard({ plan, cycle, includeAi, onIncludeAiChange, currentPlanName, onSelect }: PlanCardProps) {
    const { popular, dark, tier, isPro, displayName, tagline, features, prevTier } = describePlan(plan, includeAi);
    const cta = planCta(plan, currentPlanName);
    const isCurrent = cta.label === "Current plan";
    const btnVariant = dark ? styles.btnOnDark : popular ? styles.btnProHighlight : cta.solid ? styles.btnSolid : styles.btnOutline;

    return (
        <article
            className={`${styles.card} ${popular ? styles.cardPopular : ""} ${dark ? styles.cardDark : ""}`}
            aria-label={`${displayName} plan`}
        >
            <div className={styles.cardTier}>
                <span>{displayName}</span>
                {popular && <span className={styles.badge}>POPULAR</span>}
                {isCurrent && <span className={`${styles.badge} ${styles.badgeCurrent}`}>Current</span>}
            </div>

            <PlanCardPrice plan={plan} cycle={cycle} includeAi={includeAi} />

            {isPro && onIncludeAiChange && (
                <div className={styles.proAiToggleRow}>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={includeAi}
                        onClick={() => onIncludeAiChange(!includeAi)}
                        className={`${styles.proAiToggleBtn} ${includeAi ? styles.proAiActive : ""}`}
                        title="Add AI Agent to Pro"
                    >
                        <span className={styles.proAiSwitchTrack}>
                            <span className={styles.proAiSwitchThumb} />
                        </span>
                        <span className={styles.proAiToggleText}>
                            {includeAi ? "AI Agent Added (+₹200/mo)" : "+ Add AI Agent (+₹200/mo)"}
                        </span>
                    </button>
                </div>
            )}

            <p className={styles.cardDesc}>{plan.tagline || plan.description || tagline}</p>

            <button
                type="button"
                className={`${styles.btn} ${btnVariant}`}
                onClick={() => onSelect(plan)}
                disabled={cta.disabled}
            >
                <span>Get started</span>
            </button>

            {includeAi && <PlanAiBox tier={tier} />}

            {features.length > 0 && (
                <>
                    <div className={styles.cardDivider}>
                        {prevTier ? `Everything in ${prevTier}, plus ↴` : "What's included"}
                    </div>
                    <ul className={styles.featureList}>
                        {features.map((item) => (
                            <li key={item} className={styles.featureItem}>
                                <Check className={styles.tick} size={16} strokeWidth={2.5} aria-hidden="true" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </article>
    );
}

export default PlanCard;
