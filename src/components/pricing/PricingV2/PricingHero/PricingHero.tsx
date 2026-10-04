'use client';

import React, { useId } from "react";
import shared from "../PricingShared.module.css";
import local from "./PricingHero.module.css";

const styles = { ...shared, ...local };
import { BillingToggle, AiAgentsSwitch } from "../BillingToggle";
import type { BillingCycle } from "../../pricingModel";
import { CircuitDecor } from "../CircuitDecor/CircuitDecor";

interface PricingHeroProps {
    cycle: BillingCycle;
    onCycleChange: (cycle: BillingCycle) => void;
    includeAi: boolean;
    onIncludeAiChange: (val: boolean) => void;
    savePct: number;
}

export function PricingHero({ cycle, onCycleChange, includeAi, onIncludeAiChange, savePct }: PricingHeroProps) {
    const titleId = useId();
    return (
        <>
            <section className={styles.hero} aria-labelledby={titleId}>
                <CircuitDecor side="left" />
                <CircuitDecor side="right" />
                <div className={styles.heroInner}>
                    <div className={styles.eyebrowWrapper}>
                        <span className={styles.eyebrow}>CREDITKLICK PLANS</span>
                    </div>
                    <h1 id={titleId} className={`${styles.serif} ${styles.heroTitle}`}>
                        Transparent & Fair Pricing for Your Credit Health
                    </h1>
                    <p className={styles.heroSub}>
                        Choose the right plan to monitor, repair, and boost your CIBIL score — with expert guidance every step of the way.
                    </p>
                    <div className={styles.heroControls}>
                        <BillingToggle value={cycle} onChange={onCycleChange} savePct={savePct} />
                        <div className={styles.heroAiSwitchWrapper}>
                            <AiAgentsSwitch checked={includeAi} onChange={onIncludeAiChange} />
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles.heroDotStrip} aria-hidden="true" />
        </>
    );
}

export default PricingHero;
