'use client';

import React from "react";
import { Info } from "lucide-react";
import shared from "../PricingShared.module.css";
import local from "./CompareMatrix.module.css";
import { BillingToggle } from "../BillingToggle";
import { planCta, planKey } from "../planCta";
import { describePlan } from "../planCardData";
import { type BillingCycle, isPopularPlan } from "../../pricingModel";
import {
    type Category,
    CategoryTitle,
    CompareNoMatch,
    CompareSearch,
    CompareValue,
    HeaderPrice,
    useHeightVar
} from "../CompareParts";

const styles = { ...shared, ...local };

interface CompareMatrixProps {
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

/** Desktop comparison: sticky plan header + sticky category bands over a bordered grid. */
export function CompareMatrix({
    plans, categories, query, onQueryChange, searchId, cycle, onCycleChange, includeAi, savePct, currentPlanName, onSelect
}: CompareMatrixProps) {
    const head = useHeightVar("--pv-head-h");
    const cols = { ["--pv-cols" as any]: plans.length } as React.CSSProperties;
    const popularIdx = plans.findIndex(isPopularPlan);

    return (
        <div className={styles.matrix} ref={head.hostRef} role="table" aria-label="Plan feature comparison" style={cols}>
            <div className={`${styles.mRow} ${styles.mHead}`} ref={head.ref} role="row">
                <div className={styles.mHeadTools} role="columnheader">
                    <span className="sr-only">Feature</span>
                    <BillingToggle value={cycle} onChange={onCycleChange} savePct={savePct} />
                    <CompareSearch id={searchId} value={query} onChange={onQueryChange} />
                </div>
                {plans.map((plan) => {
                    const cta = planCta(plan, currentPlanName);
                    const { popular, displayName } = describePlan(plan, includeAi);
                    const btnVariant = popular ? styles.btnProHighlight : cta.solid ? styles.btnSolid : styles.btnOutline;
                    return (
                        <div key={planKey(plan)} className={styles.mHeadPlan} role="columnheader">
                            <div className={styles.mHeadName}>
                                {displayName}
                                {popular && <span className={styles.badge}>POPULAR</span>}
                            </div>
                            <HeaderPrice plan={plan} cycle={cycle} includeAi={includeAi} />
                            <button
                                type="button"
                                className={`${styles.btn} ${btnVariant}`}
                                onClick={() => onSelect(plan)}
                                disabled={cta.disabled}
                            >
                                <span>Get started</span>
                            </button>
                        </div>
                    );
                })}
            </div>

            {categories.length === 0 ? <CompareNoMatch query={query} /> : categories.map((cat) => (
                <div key={cat.title} className={styles.mGroup} role="rowgroup">
                    <div className={styles.mBand} role="row">
                        <CategoryTitle title={cat.title} asRowHeader />
                    </div>
                    {cat.rows.map((row) => (
                        <div key={row.name} className={styles.mRow} role="row">
                            <div className={styles.mCellLabel} role="rowheader">
                                <span>{row.name}</span>
                                {row.tooltip && (
                                    <span className={styles.infoWrapper} title={row.tooltip}>
                                        <Info size={13} className={styles.infoIcon} aria-hidden="true" />
                                    </span>
                                )}
                            </div>
                            {row.values.map((v, i) => (
                                <div
                                    key={i}
                                    className={`${styles.mCell} ${i === popularIdx ? styles.mColPopular : ""}`}
                                    role="cell"
                                >
                                    <CompareValue value={v} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default CompareMatrix;
