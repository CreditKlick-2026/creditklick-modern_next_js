'use client';

import React from "react";
import shared from "../PricingShared.module.css";
import local from "../PlanCard/PlanCard.module.css";
import { type BillingCycle, inr, isCustomPlan, planPrice } from "../../pricingModel";

const styles = { ...shared, ...local };

export function PlanCardPrice({ plan, cycle, includeAi }: { plan: any; cycle: BillingCycle; includeAi: boolean }) {
    if (isCustomPlan(plan)) {
        return (
            <>
                <div className={styles.priceRow}>
                    <span className={styles.priceValue}>Custom</span>
                </div>
                <div className={styles.billedNote}>Tailored to your case</div>
            </>
        );
    }
    const { perMonth, billedTotal, originalPerMonth, periodLabel } = planPrice(plan, cycle, includeAi);
    
    if (perMonth === 0) {
        return (
            <>
                <div className={styles.priceRow}>
                    <span className={styles.priceValue}>₹0</span>
                    <span className={styles.pricePer}>/forever</span>
                </div>
                <div className={styles.billedNote}>No credit card required</div>
            </>
        );
    }

    const showStrike = cycle === "yearly" && originalPerMonth !== null && originalPerMonth > perMonth;
    return (
        <>
            <div className={styles.priceRow}>
                <span className={styles.priceCurrency}>₹</span>
                <span className={styles.priceValue}>{perMonth.toLocaleString("en-IN")}</span>
                <span className={styles.pricePer}>/mo</span>
                {showStrike && <span className={styles.priceStrike}>{inr(originalPerMonth!)}</span>}
            </div>
            <div className={styles.billedNote}>
                {inr(billedTotal)} {periodLabel}
            </div>
        </>
    );
}

export default PlanCardPrice;
