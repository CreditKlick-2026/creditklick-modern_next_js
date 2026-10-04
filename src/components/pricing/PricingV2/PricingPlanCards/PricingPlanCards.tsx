'use client';

import React from "react";
import { ArrowDown } from "lucide-react";
import shared from "../PricingShared.module.css";
import layout from "../PricingLayout.module.css";
import local from "./PricingPlanCards.module.css";
import type { BillingCycle } from "../../pricingModel";
import { planKey } from "../planCta";
import { PlanCard } from "../PlanCard";

const styles = { ...shared, ...layout, ...local };

interface PricingPlanCardsProps {
    plans: any[];
    categories: { rows: { name: string; values: any[] }[] }[];
    cycle: BillingCycle;
    includeAi: boolean;
    onIncludeAiChange?: (val: boolean) => void;
    currentPlanName: string | null;
    onSelect: (plan: any) => void;
}

// Plain hash navigation doesn't scroll here (the app intercepts in-page hash links), and the client router can
// keep a hidden copy of this page mounted, so scroll to the *visible* comparison section explicitly.
function scrollToCompare(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = Array.from(document.querySelectorAll<HTMLElement>("[data-compare-plans]")).find((el) => el.offsetParent !== null);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#compare-plans");
}

export function PricingPlanCards({ plans, cycle, includeAi, onIncludeAiChange, currentPlanName, onSelect }: PricingPlanCardsProps) {
    return (
        <>
            <div className={styles.cards} style={{ ["--pv-cols" as any]: plans.length }}>
                {plans.map((plan) => (
                    <PlanCard
                        key={planKey(plan)}
                        plan={plan}
                        cycle={cycle}
                        includeAi={includeAi}
                        onIncludeAiChange={onIncludeAiChange}
                        currentPlanName={currentPlanName}
                        onSelect={onSelect}
                    />
                ))}
            </div>
            <a href="#compare-plans" className={styles.compareLink} onClick={scrollToCompare}>
                Compare all plans <ArrowDown size={15} aria-hidden="true" />
            </a>
        </>
    );
}

export default PricingPlanCards;
