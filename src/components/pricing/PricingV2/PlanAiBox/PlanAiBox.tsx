'use client';

import React from "react";
import { Check } from "lucide-react";
import shared from "../PricingShared.module.css";
import local from "./PlanAiBox.module.css";
import type { PlanTier } from "../planCardData";

const styles = { ...shared, ...local };

function Item({ children }: { children: React.ReactNode }) {
    return (
        <li>
            <Check size={14} className={styles.tickGreen} strokeWidth={2.5} />
            <span>{children}</span>
        </li>
    );
}

/** "AI Credit Advisory" callout shown on each plan card when the AI toggle is on. */
export function PlanAiBox({ tier }: { tier: PlanTier }) {
    if (tier === "starter") {
        return (
            <div className={styles.aiBoxStarter}>
                <div className={styles.aiBoxHeaderGray}>AI SCORE SIMULATOR</div>
                <div className={styles.aiBoxSubGray}>Basic simulator only</div>
            </div>
        );
    }

    if (tier === "pro") {
        return (
            <div className={styles.aiBoxPro}>
                <div className={styles.aiBoxHeaderGreen}>AI CREDIT ADVISORY — INCLUDED</div>
                <ul className={styles.aiBoxList}>
                    <Item>AI 90-Day Score Improvement Roadmap</Item>
                    <Item>Automated Bureau Dispute Drafting</Item>
                    <Item>Debt-to-Income (DTI) Optimization</Item>
                </ul>
            </div>
        );
    }

    return (
        <div className={styles.aiBoxEnterprise}>
            <div className={styles.aiBoxHeaderGreen}>AI CREDIT SHIELD — INCLUDED</div>
            <ul className={styles.aiBoxListDark}>
                <Item>AI Debt Settlement Haircut Estimator</Item>
                <Item>Legal Notice Analyzer & Response Drafts</Item>
                <Item>Multi-Bureau Dispute Tracking</Item>
            </ul>
            <div className={styles.aiBoxFootnote}>Custom roadmap with senior legal & banking advisors.</div>
        </div>
    );
}

export default PlanAiBox;
