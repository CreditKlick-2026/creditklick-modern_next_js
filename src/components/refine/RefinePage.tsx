'use client';

import React, { useState } from "react";
import Link from "next/link";
import {
    ShieldCheck,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Award,
    ChevronDown,
    Building2,
    Sparkles,
    UserCheck,
    Check,
    Clock,
    ShieldAlert,
    Search,
    CreditCard,
    Landmark,
    Fingerprint,
    CheckCircle,
    Activity,
    FileCheck2
} from "lucide-react";
import styles from "./RefinePage.module.css";
import { RefineScoreChart } from "./RefineScoreChart";

interface ErrorItem {
    id: string;
    title: string;
    desc: string;
    fix: string;
    iconType: "clock" | "shield" | "scan" | "radar" | "card" | "bank";
}

const ERROR_ITEMS: ErrorItem[] = [
    {
        id: "dpd",
        title: "Wrong DPD & Late Payments",
        desc: "Banks mistakenly reporting 30+, 60+, or 90+ Days Past Due (DPD) on accounts that were cleared on time.",
        fix: "Deleted via Bureau Dispute",
        iconType: "clock"
    },
    {
        id: "settled",
        title: "Settled / Written-Off Status",
        desc: "Settled accounts remain toxic on your report for 7 years. Lenders treat settlement as a partial default.",
        fix: "Rectified to Closed / Clean NOC",
        iconType: "shield"
    },
    {
        id: "identity",
        title: "PAN & Identity Mix-ups",
        desc: "A clerical error by a lender linking someone else's default, overdue loan, or card to your PAN or Aadhaar.",
        fix: "Complete Bureau Scrub & De-link",
        iconType: "scan"
    },
    {
        id: "inquiry",
        title: "Unauthorized Hard Inquiries",
        desc: "Aggressive DSA agents or unapproved lenders pulling your credit report repeatedly, dragging your score down.",
        fix: "Fraudulent Inquiries Removed",
        iconType: "radar"
    },
    {
        id: "zombie",
        title: "Zombie Overdue on Closed Cards",
        desc: "Cards closed years ago showing residual interest or annual fee dues that silently destroy your credit score.",
        fix: "Zero-Due Bank NOC Procured",
        iconType: "card"
    },
    {
        id: "loan-status",
        title: "Wrong Loan Account Status",
        desc: "Fully repaid vehicle, personal, or education loans still reported as 'Active' or 'Overdue' by banks.",
        fix: "Updated to 'Closed with 0 Overdue'",
        iconType: "bank"
    }
];

const PROCESS_STEPS = [
    {
        step: "01",
        title: "4-Bureau Forensic Audit",
        desc: "We analyze your official reports across CIBIL, Experian, Equifax, and CRIF to isolate every clerical error, wrong DPD, and damaging remark."
    },
    {
        step: "02",
        title: "RBI-Compliant Dispute Filing",
        desc: "Our regulatory team drafts formal legal notices and Section 17 dispute petitions backed by RBI Banking Ombudsman guidelines."
    },
    {
        step: "03",
        title: "Bank Nodal Escalation",
        desc: "We follow up directly with bank Principal Nodal Officers (PNO) and legal desks to ensure wrongful tags are deleted and clean NOCs issued."
    },
    {
        step: "04",
        title: "Bureau Correction & 750+ Score",
        desc: "Bureaus reflect your clean records. Your credit score jumps by an average of 78+ points, unlocking low-interest personal & home loans."
    }
];

const SUCCESS_STORIES = [
    {
        name: "Vikram Sharma",
        city: "Delhi NCR",
        before: 585,
        after: 768,
        delta: "+183 pts",
        time: "65 Days",
        quote: "HDFC reported 90 DPD on an auto loan I had already paid. CreditKlick escalated directly to the Nodal Desk. Remarks were deleted and my score jumped to 768! Got my ₹45L home loan sanctioned at 8.40%.",
        outcome: "Approved for ₹45L Home Loan"
    },
    {
        name: "Pooja Hegde",
        city: "Bengaluru",
        before: 610,
        after: 780,
        delta: "+170 pts",
        time: "80 Days",
        quote: "An old ICICI credit card had a 'Settled' tag from 2021. No bank would give me a business loan. CreditKlick negotiated a clean NOC and converted it to 'Closed'. My score is now 780.",
        outcome: "Unlocked ₹15L Business Credit"
    },
    {
        name: "Rahul Verma",
        city: "Mumbai",
        before: 630,
        after: 792,
        delta: "+162 pts",
        time: "45 Days",
        quote: "There were 14 hard inquiries that I never applied for, plus a mismatched personal loan on my PAN. The Credit Refine Guru handled the disputes seamlessly. Everything was cleared within 6 weeks.",
        outcome: "Axis Bank Neo Card with ₹3L limit"
    }
];

const FAQS = [
    {
        q: "What exactly is CreditKlick Credit Refine™?",
        a: "Credit Refine is CreditKlick's specialized credit improvement service that audits your official credit reports across all 4 RBI-licensed bureaus (CIBIL, Experian, Equifax, CRIF), identifies false or negative remarks, and provides assisted dispute filing with banks to restore your credit health."
    },
    {
        q: "How does Credit Refine improve my score to 750+?",
        a: "Over 80% of poor credit scores in India are caused by inaccurate bureau reporting, wrong DPDs (Days Past Due), duplicate loan accounts, or unresolved settlement tags. Our dedicated Credit Gurus prepare formal challenges under RBI regulations to rectify these errors. As banks update bureau records, your score naturally rebounds."
    },
    {
        q: "How much time does it take to see results?",
        a: "Under RBI guidelines, credit bureaus and banks must resolve credit disputes within 30 days. Most of our clients see substantial score increases (average 50 to 90 points) within 45 to 90 days."
    },
    {
        q: "Which plan is best for Credit Refine?",
        a: "Our PRO plan is specifically designed for Credit Refine. It gives you a dedicated 1-on-1 human Credit Guru, assisted dispute filing for wrong remarks and DPDs, overdue status rectification, and continuous monthly monitoring."
    },
    {
        q: "Is Credit Refine 100% legal and RBI compliant?",
        a: "Yes, absolutely. We operate in strict compliance with the Credit Information Companies (Regulation) Act, 2005 (CICRA) and RBI Banking Ombudsman guidelines. We challenge genuine errors and negotiate lawful bank settlements."
    }
];

function RenderAnimatedIcon({ type }: { type: ErrorItem["iconType"] }) {
    switch (type) {
        case "clock":
            return (
                <div className={`${styles.animIconBox} ${styles.animBoxClock}`}>
                    <Clock className={styles.animSvgClock} size={22} />
                    <span className={styles.animPulseRing} />
                </div>
            );
        case "shield":
            return (
                <div className={`${styles.animIconBox} ${styles.animBoxShield}`}>
                    <ShieldAlert className={styles.animSvgShield} size={22} />
                    <span className={styles.animRadarWave} />
                </div>
            );
        case "scan":
            return (
                <div className={`${styles.animIconBox} ${styles.animBoxScan}`}>
                    <Fingerprint className={styles.animSvgScan} size={22} />
                    <span className={styles.animLaserBeam} />
                </div>
            );
        case "radar":
            return (
                <div className={`${styles.animIconBox} ${styles.animBoxRadar}`}>
                    <Search className={styles.animSvgRadar} size={22} />
                    <span className={styles.animRadarSweep} />
                </div>
            );
        case "card":
            return (
                <div className={`${styles.animIconBox} ${styles.animBoxCard}`}>
                    <CreditCard className={styles.animSvgCard} size={22} />
                    <span className={styles.animCardShine} />
                </div>
            );
        case "bank":
            return (
                <div className={`${styles.animIconBox} ${styles.animBoxBank}`}>
                    <Landmark className={styles.animSvgBank} size={22} />
                    <CheckCircle2 className={styles.animCheckBadge} size={13} />
                </div>
            );
        default:
            return <Activity size={22} />;
    }
}

export default function RefinePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className={styles.refineRoot}>
            {/* ── 1. Hero Section ──────────────────────── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>

                    <div className={styles.badgePill}>
                        <span className={styles.badgeGlowIcon}>
                            <Sparkles size={14} />
                        </span>
                        <span>CREDIT REFINE™ • CREDIT SCORE IMPROVEMENT</span>
                    </div>

                    <h1 className={styles.heroTitle}>
                        Fix Bureau Errors. Recover Score to <span className={styles.heroGradientText}>750+</span>.
                    </h1>

                    <p className={styles.heroSub}>
                        India&apos;s trusted RBI-compliant credit improvement & dispute resolution service. Our Credit Gurus handle the paperwork and bank follow-ups to delete wrong DPDs, settlement tags, and unauthorized inquiries.
                    </p>

                    <div className={styles.heroCtas}>
                        <Link href="/credit-score" className={styles.btnPrimary}>
                            <FileCheck2 size={18} />
                            <span>Check Credit Score Free</span>
                            <ArrowRight size={17} />
                        </Link>
                        <Link href="/pricing" className={styles.btnSecondary}>
                            <span>View Refine Plans</span>
                        </Link>
                    </div>

                    {/* Trust Highlights */}
                    <div className={styles.trustStrip}>
                        <div className={styles.trustItem}>
                            <ShieldCheck className={styles.trustIcon} size={18} />
                            <span>100% RBI & CICRA Compliant</span>
                        </div>
                        <div className={styles.trustItem}>
                            <TrendingUp className={styles.trustIcon} size={18} />
                            <span>Avg. +78 Points in 60-90 Days</span>
                        </div>
                        <div className={styles.trustItem}>
                            <Building2 className={styles.trustIcon} size={18} />
                            <span>All 4 RBI Bureaus Covered</span>
                        </div>
                        <div className={styles.trustItem}>
                            <UserCheck className={styles.trustIcon} size={18} />
                            <span>Dedicated Credit Guru</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. Real Interactive Graph Showcase ───── */}
            <section className={styles.showcaseSection}>
                <div className={styles.container}>
                    {/* Render Real Animated Chart.js Graph */}
                    <RefineScoreChart />
                </div>
            </section>

            {/* ── 3. Common Bureau Errors Section ──────── */}
            <section className={styles.section} id="errors">
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>WHAT WE FIX</span>
                        <h2 className={styles.sectionTitle}>Damaging Credit Report Errors Solved</h2>
                        <p className={styles.sectionDesc}>
                            Over 1 in 4 credit reports in India contain bank reporting errors that drag your score down. Credit Refine systematically fixes these:
                        </p>
                    </div>

                    <div className={styles.errorGrid}>
                        {ERROR_ITEMS.map((item) => (
                            <div key={item.id} className={styles.errorCard}>
                                <div className={styles.errorCardTop}>
                                    <RenderAnimatedIcon type={item.iconType} />
                                </div>
                                <h3 className={styles.errorTitle}>{item.title}</h3>
                                <p className={styles.errorDesc}>{item.desc}</p>
                                <div className={styles.errorFix}>
                                    <Check size={14} />
                                    <span>{item.fix}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. How It Works (4 Steps) ────────────── */}
            <section className={styles.sectionAlt} id="how-it-works">
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>SIMPLE PROCESS</span>
                        <h2 className={styles.sectionTitle}>How Credit Refine Works</h2>
                        <p className={styles.sectionDesc}>
                            A transparent, legally backed dispute engine designed to get bank errors corrected fast.
                        </p>
                    </div>

                    <div className={styles.stepsGrid}>
                        {PROCESS_STEPS.map((step, idx) => (
                            <div key={idx} className={styles.stepCard}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepNumber}>{step.step}</span>
                                </div>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. Simple Refine Plan Card ───────────── */}
            <section className={styles.section} id="plan">
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>RECOMMENDED PROGRAM</span>
                        <h2 className={styles.sectionTitle}>Start Credit Refine with Our PRO Plan</h2>
                        <p className={styles.sectionDesc}>
                            Everything you need to challenge incorrect remarks, dispute false DPDs, and restore your credit health.
                        </p>
                    </div>

                    <div className={styles.planCardWrapper}>
                        <div className={styles.planCard}>
                            <div className={styles.planBadge}>
                                <Award size={15} />
                                <span>MOST POPULAR FOR CREDIT REPAIR</span>
                            </div>

                            <div className={styles.planHeader}>
                                <div>
                                    <h3 className={styles.planName}>Credit Refine PRO</h3>
                                    <p className={styles.planTagline}>Dedicated 1-on-1 human Credit Guru assistance</p>
                                </div>
                                <div className={styles.planPrice}>
                                    <span className={styles.planAmount}>₹300</span>
                                    <span className={styles.planPeriod}>/ month</span>
                                </div>
                            </div>

                            <div className={styles.planDivider} />

                            <div className={styles.planFeatures}>
                                <div className={styles.planFeatureItem}>
                                    <CheckCircle size={17} className="text-blue-600 flex-shrink-0" />
                                    <span><strong>4-Bureau In-depth Audit:</strong> CIBIL, Experian, Equifax & CRIF</span>
                                </div>
                                <div className={styles.planFeatureItem}>
                                    <CheckCircle size={17} className="text-blue-600 flex-shrink-0" />
                                    <span><strong>Assisted Dispute Filing:</strong> Formal Section 17 bank notices</span>
                                </div>
                                <div className={styles.planFeatureItem}>
                                    <CheckCircle size={17} className="text-blue-600 flex-shrink-0" />
                                    <span><strong>Dedicated Credit Guru:</strong> Personal expert assigned to your case</span>
                                </div>
                                <div className={styles.planFeatureItem}>
                                    <CheckCircle size={17} className="text-blue-600 flex-shrink-0" />
                                    <span><strong>Bank Nodal Desk Escalation:</strong> Rapid clearance of false DPDs & settlement tags</span>
                                </div>
                                <div className={styles.planFeatureItem}>
                                    <CheckCircle size={17} className="text-blue-600 flex-shrink-0" />
                                    <span><strong>Monthly Progress Re-pulls:</strong> Real-time score recovery tracking</span>
                                </div>
                            </div>

                            <div className={styles.planActions}>
                                <Link href="/contact?plan=pro" className={styles.planBtnPrimary}>
                                    <span>Get Started with Refine PRO</span>
                                    <ArrowRight size={17} />
                                </Link>
                                <Link href="/pricing" className={styles.planBtnOutline}>
                                    <span>Compare All Membership Plans</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. Proven Results (Testimonials) ─────── */}
            <section className={styles.sectionAlt}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>SUCCESS STORIES</span>
                        <h2 className={styles.sectionTitle}>Real Borrowers. Real Score Growth.</h2>
                        <p className={styles.sectionDesc}>
                            Verified stories of Indian borrowers who resolved credit errors and secured their dream loan terms.
                        </p>
                    </div>

                    <div className={styles.testimonialsGrid}>
                        {SUCCESS_STORIES.map((item, idx) => (
                            <div key={idx} className={styles.testimonialCard}>
                                <div className={styles.testimonialTop}>
                                    <div>
                                        <div className={styles.testimonialName}>{item.name}</div>
                                        <div className={styles.testimonialCity}>{item.city}</div>
                                    </div>
                                    <div className={styles.testimonialBadge}>
                                        {item.before} ➔ {item.after} ({item.delta})
                                    </div>
                                </div>
                                <p className={styles.testimonialQuote}>&ldquo;{item.quote}&rdquo;</p>
                                <div className={styles.testimonialOutcome}>
                                    ✓ {item.outcome} in {item.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. FAQs ──────────────────────────────── */}
            <section className={styles.section}>
                <div className={styles.containerSmall}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>FAQ</span>
                        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                        <p className={styles.sectionDesc}>
                            Got questions? Here is how Credit Refine helps you legally repair and elevate your score.
                        </p>
                    </div>

                    <div className={styles.faqList}>
                        {FAQS.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div key={idx} className={styles.faqCard}>
                                    <button
                                        type="button"
                                        className={styles.faqQuestion}
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown
                                            size={18}
                                            className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className={styles.faqAnswer}>
                                            <p>{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 8. Bottom CTA Banner ─────────────────── */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaBox}>
                        <h2 className={styles.ctaTitle}>
                            Stop Letting Bureau Errors Cost You Extra Interest
                        </h2>
                        <p className={styles.ctaText}>
                            Join over 2,00,000+ borrowers who trusted CreditKlick Credit Refine™ to fix negative remarks and regain financial freedom.
                        </p>
                        <div className={styles.ctaBtnRow}>
                            <Link href="/credit-score" className={styles.ctaBtnPrimary}>
                                <span>Check Free Credit Score</span>
                                <ArrowRight size={17} />
                            </Link>
                            <Link href="/pricing" className={styles.ctaBtnSecondary}>
                                <span>Explore Pricing Plans</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
