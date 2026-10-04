'use client';

import React, { useState } from "react";
import shared from "../PricingShared.module.css";
import local from "./CompareMobile.module.css";
import { BillingToggle } from "../BillingToggle";
import { planCta, planKey } from "../planCta";
import { type BillingCycle, isPopularPlan } from "../../pricingModel";
import { type Category, CategoryTitle, CompareNoMatch, CompareSearch, CompareValue, HeaderPrice, useHeightVar } from "../CompareParts";

const styles = { ...shared, ...local };

interface CompareMobileProps {
    plans: any[];
    categories: Category[];
    query: string;
    onQueryChange: (q: string) => void;
    searchId: string;
    cycle: BillingCycle;
    onCycleChange: (cycle: BillingCycle) => void;
    includeAi: boolean;
    savePct: number;
    currentPlanName: string | null;
    onSelect: (plan: any) => void;
}

/** Mobile comparison: one plan at a time (plan tabs), no horizontal scrolling. */
export function CompareMobile({
    plans, categories, query, onQueryChange, searchId, cycle, onCycleChange, includeAi, savePct, currentPlanName, onSelect
}: CompareMobileProps) {
    const [planIdx, setPlanIdx] = useState(() => Math.max(0, plans.findIndex(isPopularPlan)));
    const head = useHeightVar("--pv-mhead-h");
    const plan = plans[Math.min(planIdx, plans.length - 1)];
    const cta = plan ? planCta(plan, currentPlanName) : null;

    return (
        <div className={styles.mobile} ref={head.hostRef}>
            <div className={styles.mobileHead} ref={head.ref}>
                <div className={styles.planTabs} role="tablist" aria-label="Choose a plan to compare">
                    {plans.map((p, i) => (
                        <button
                            key={planKey(p)}
                            type="button"
                            role="tab"
                            aria-selected={i === planIdx}
                            className={styles.planTab}
                            onClick={() => setPlanIdx(i)}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
                {plan && cta && (
                    <div className={styles.mobileSummary}>
                        <HeaderPrice plan={plan} cycle={cycle} includeAi={includeAi} />
                        <button
                            type="button"
                            className={`${styles.btn} ${cta.solid ? styles.btnSolid : styles.btnOutline}`}
                            onClick={() => onSelect(plan)}
                            disabled={cta.disabled}
                        >
                            {cta.label}
                        </button>
                    </div>
                )}
                <BillingToggle value={cycle} onChange={onCycleChange} savePct={savePct} />
                <CompareSearch id={searchId} value={query} onChange={onQueryChange} />
            </div>

            {categories.length === 0 ? <CompareNoMatch query={query} /> : categories.map((cat) => (
                <div key={cat.title} className={styles.mGroup}>
                    <div className={styles.mobileBand}>
                        <CategoryTitle title={cat.title} />
                    </div>
                    {cat.rows.map((row) => (
                        <div key={row.name} className={styles.mobileRow}>
                            <span>{row.name}</span>
                            <CompareValue value={row.values[planIdx]} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default CompareMobile;
