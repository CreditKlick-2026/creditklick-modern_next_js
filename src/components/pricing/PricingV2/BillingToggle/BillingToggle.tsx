'use client';

import React from "react";
import shared from "../PricingShared.module.css";
import local from "./BillingToggle.module.css";

const styles = { ...shared, ...local };
import type { BillingCycle } from "../../pricingModel";

interface BillingToggleProps {
    value: BillingCycle;
    onChange: (cycle: BillingCycle) => void;
    savePct?: number;
    onDark?: boolean;
}

export function BillingToggle({ value, onChange, savePct = 15, onDark = false }: BillingToggleProps) {
    const isYearly = value === "yearly";
    return (
        <div role="group" aria-label="Billing frequency" className={`${styles.toggle} ${onDark ? styles.toggleOnDark : ""}`}>
            <button
                type="button"
                className={styles.toggleBtn}
                aria-pressed={!isYearly}
                onClick={() => onChange("monthly")}
            >
                MONTHLY
            </button>
            <button
                type="button"
                className={styles.toggleBtn}
                aria-pressed={isYearly}
                onClick={() => onChange("yearly")}
            >
                YEARLY
                {savePct > 0 && <span className={styles.saveTag}>−{savePct}%</span>}
            </button>
        </div>
    );
}

interface AiAgentsSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    onDark?: boolean;
}

export function AiAgentsSwitch({ checked, onChange, onDark = false }: AiAgentsSwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`${styles.aiSwitch} ${checked ? styles.aiSwitchChecked : ""} ${onDark ? styles.aiSwitchOnDark : ""}`}
            title="Toggle autonomous AI agents integration"
        >
            <span className={styles.aiSwitchTrack}>
                <span className={styles.aiSwitchThumb} />
            </span>
            <span className={styles.aiSwitchLabel}>INCLUDE AI AGENTS</span>
        </button>
    );
}

export default BillingToggle;
