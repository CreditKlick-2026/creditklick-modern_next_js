'use client';

import React, { useId } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import shared from "../PricingShared.module.css";
import local from "./PricingFaq.module.css";

const styles = { ...shared, ...local };
import { pricingFaqs } from "../../pricingPlansData";

export function PricingFaq() {
    const titleId = useId();
    return (
        <section aria-labelledby={titleId} style={{ borderTop: "1px solid var(--pv-line)" }}>
            <div className={styles.sectionHead}>
                <span className={styles.eyebrow}>FREQUENTLY ASKED QUESTIONS</span>
                <h2 id={titleId} className={`${styles.serif} ${styles.sectionTitle}`}>
                    Questions about credit repair & plans
                </h2>
            </div>
            <div className={styles.faqList}>
                {pricingFaqs.map((faq, i) => (
                    <details key={faq.q} className={styles.faqItem} open={i === 0}>
                        <summary className={styles.faqQ}>
                            <span>{faq.q}</span>
                            <Plus className={styles.faqIcon} size={20} aria-hidden="true" />
                        </summary>
                        <p className={styles.faqA}>{faq.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}

export function PricingCta() {
    const titleId = useId();
    return (
        <section className={styles.cta} aria-labelledby={titleId}>
            <span className={styles.eyebrow}>START YOUR RECOVERY</span>
            <h2 id={titleId} className={`${styles.serif} ${styles.ctaTitle}`}>
                Take Control of Your Credit Score & Financial Freedom Today
            </h2>
            <p className={styles.ctaSub}>
                Check your credit report for free, or partner with a dedicated Credit Guru to remove negative remarks and target a 750+ CIBIL score.
            </p>
            <div className={styles.ctaActions}>
                <Link href="/credit-score" className={`${styles.btn} ${styles.btnSolid}`}>
                    Check Free Score <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link href="/contact" className={`${styles.btn} ${styles.btnOutline}`}>
                    Talk to Credit Guru
                </Link>
            </div>
        </section>
    );
}

export default PricingFaq;
