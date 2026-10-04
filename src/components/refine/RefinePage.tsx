'use client';

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ShieldCheck,
    TrendingUp,
    CheckCircle2,
    AlertTriangle,
    ArrowRight,
    Award,
    Lock,
    ChevronDown,
    Building2,
    Scale,
    Sparkles,
    UserCheck,
    Check,
    HelpCircle
} from "lucide-react";
import styles from "./RefinePage.module.css";
import { defaultPricingPlans } from "../pricing/pricingPlansData";
import { buildCategories } from "../pricing/buildPlanCategories";
import { type BillingCycle, isCustomPlan, sortPlans } from "../pricing/pricingModel";
import { PricingPlanCards } from "../pricing/PricingV2/PricingPlanCards";
import { BillingToggle, AiAgentsSwitch } from "../pricing/PricingV2/BillingToggle";

const ERROR_ITEMS = [
    {
        title: "Wrong DPD & Late Payments",
        desc: "Banks mistakenly reporting 30+, 60+, or 90+ Days Past Due (DPD) on accounts that were cleared on time.",
        fix: "Deleted via Bureau Dispute"
    },
    {
        title: "Settled / Written-Off Status",
        desc: "Settled accounts remain toxic on your report for 7 years. Lenders treat settlement as a partial default.",
        fix: "Rectified to Closed / Clean NOC"
    },
    {
        title: "PAN & Identity Mix-ups",
        desc: "A clerical error by a lender linking someone else's default, overdue loan, or card to your PAN or Aadhaar.",
        fix: "Complete Bureau Scrub & De-link"
    },
    {
        title: "Unauthorized Hard Inquiries",
        desc: "Aggressive DSA agents or unapproved lenders pulling your credit report repeatedly, dragging your score down.",
        fix: "Fraudulent Inquiries Removed"
    },
    {
        title: "Zombie Overdue on Closed Cards",
        desc: "Cards closed years ago showing residual interest or annual fee dues that silently destroy your credit score.",
        fix: "Zero-Due Bank NOC Procured"
    },
    {
        title: "Wrong Loan Account Status",
        desc: "Fully repaid vehicle, personal, or education loans still reported as 'Active' or 'Overdue' by banks.",
        fix: "Updated to 'Closed with 0 Overdue'"
    }
];

const PROCESS_STEPS = [
    {
        step: "STEP 01",
        title: "Forensic 4-Bureau Audit",
        desc: "Our AI scanner and Credit Gurus pull full data across CIBIL, Experian, Equifax, and CRIF to pinpoint every error, wrong DPD, and inaccurate remark."
    },
    {
        step: "STEP 02",
        title: "Legal Dispute Drafting",
        desc: "We draft formal RBI-compliant legal notices and bureau dispute challenges backed by Banking Ombudsman regulations."
    },
    {
        step: "STEP 03",
        title: "Principal Nodal Follow-up",
        desc: "Our team directly engages with bank Principal Nodal Officers (PNO) and legal desks to get false remarks removed and bank NOCs issued."
    },
    {
        step: "STEP 04",
        title: "Score Re-pull & 750+ Health",
        desc: "Your bureaus reflect the clean remarks. Your credit score jumps by an average of 78+ points, unlocking low-interest personal & home loans."
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
        quote: "HDFC reported 90 DPD on an auto loan I had already paid. CreditKlick's team escalated directly to the Nodal Desk. Remarks were deleted and my score jumped to 768! Just got my ₹45 Lakh home loan sanctioned at 8.40%.",
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
        quote: "There were 14 hard inquiries that I never applied for, plus a mismatched personal loan on my PAN. The Credit Refine Pro Guru handled the disputes seamlessly. Everything was cleared within 6 weeks.",
        outcome: "Got Axis Bank Neo Card with ₹3L limit"
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
        a: "Our PRO plan (₹300/mo or ₹500/mo with AI Agents) is specifically designed for Credit Refine. It gives you a dedicated 1-on-1 human Credit Guru, assisted dispute filing for wrong remarks and DPDs, overdue status rectification, and loan fee waivers."
    },
    {
        q: "Is Credit Refine 100% legal and RBI compliant?",
        a: "Yes, absolutely. We operate in strict compliance with the Credit Information Companies (Regulation) Act, 2005 (CICRA) and RBI Banking Ombudsman guidelines. We do not use any questionable tricks; we challenge genuine errors and negotiate lawful bank settlements."
    }
];

export default function RefinePage() {
    const router = useRouter();
    const [cycle, setCycle] = useState<BillingCycle>("monthly");
    const [includeAi, setIncludeAi] = useState<boolean>(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const plans = useMemo(() => sortPlans(defaultPricingPlans), []);
    const categories = useMemo(() => buildCategories(plans, includeAi), [plans, includeAi]);

    const handleSelectPlan = (plan: any) => {
        if (isCustomPlan(plan)) {
            router.push('/contact');
            return;
        }
        const pid = plan?.id || plan?._id || 'pro';
        router.push(`/contact?plan=${encodeURIComponent(pid)}`);
    };

    return (
        <div className={styles.refineRoot}>
            {/* ── 1. Hero Section ──────────────────────── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.badgePill}>
                        <span className={styles.badgeDot} />
                        <span>CREDITKLICK • CREDIT REFINE™ ENGINE</span>
                    </div>

                    <h1 className={styles.heroTitle}>
                        Fix Bureau Errors. Recover Score to <span className={styles.heroGradientText}>750+</span>. Unlock Lower Interest.
                    </h1>

                    <p className={styles.heroSub}>
                        India&apos;s most trusted RBI-compliant credit improvement & dispute resolution service. Dedicated Credit Gurus & AI-powered dispute drafting to delete wrong DPDs, settled remarks, and unauthorized inquiries.
                    </p>

                    <div className={styles.heroCtas}>
                        <a href="#plans" className={styles.btnPrimary}>
                            <span>View Plans & Start Refine</span>
                            <ArrowRight size={18} />
                        </a>
                        <a href="#how-it-works" className={styles.btnSecondary}>
                            <span>How It Works</span>
                        </a>
                    </div>

                    <div className={styles.trustStrip}>
                        <div className={styles.trustItem}>
                            <ShieldCheck className={styles.trustIcon} size={20} />
                            <span>100% RBI & CICRA Compliant</span>
                        </div>
                        <div className={styles.trustItem}>
                            <TrendingUp className={styles.trustIcon} size={20} />
                            <span>Avg. +78 Points in 60-90 Days</span>
                        </div>
                        <div className={styles.trustItem}>
                            <Building2 className={styles.trustIcon} size={20} />
                            <span>All 4 Credit Bureaus Covered</span>
                        </div>
                        <div className={styles.trustItem}>
                            <UserCheck className={styles.trustIcon} size={20} />
                            <span>1-on-1 Assigned Credit Guru</span>
                        </div>
                    </div>

                    {/* Interactive Before / After Case Card */}
                    <div className={styles.previewSection}>
                        <div className={styles.previewCard}>
                            <div className={styles.previewLeft}>
                                <div className={styles.previewHeader}>
                                    <span className={styles.previewTag}>Real Client Transformation</span>
                                    <h3 className={styles.previewTitle}>Wrong Remarks Removed ➔ Home Loan Sanctioned</h3>
                                </div>

                                <div className={styles.scoreComparison}>
                                    <div className={styles.scoreBlock}>
                                        <div className={styles.scoreLabel}>Initial Score</div>
                                        <div className={styles.scoreNumRed}>592</div>
                                    </div>

                                    <div className={styles.scoreDelta}>
                                        <div className={styles.scoreDeltaPill}>
                                            <TrendingUp size={14} />
                                            <span>+182 PTS</span>
                                        </div>
                                        <div className={styles.scoreDays}>In 75 Days</div>
                                    </div>

                                    <div className={styles.scoreBlock}>
                                        <div className={styles.scoreLabel}>After Refine</div>
                                        <div className={styles.scoreNumGreen}>774</div>
                                    </div>
                                </div>

                                <div className="text-sm text-slate-500 font-medium">
                                    ★ Result: Interest rate slashed from 11.5% to 8.40%, saving ₹8,40,000 across loan tenure.
                                </div>
                            </div>

                            <div className={styles.previewRight}>
                                <div className={styles.previewRightTitle}>
                                    <Sparkles size={18} className="text-blue-600" />
                                    <span>Bureau Discrepancies Resolved:</span>
                                </div>
                                <ul className={styles.disputeList}>
                                    <li className={styles.disputeItem}>
                                        <CheckCircle2 size={16} className={styles.disputeIconResolved} />
                                        <span><strong>2 Wrong Late Payments (60+ DPD):</strong> Deleted from CIBIL & Experian.</span>
                                    </li>
                                    <li className={styles.disputeItem}>
                                        <CheckCircle2 size={16} className={styles.disputeIconResolved} />
                                        <span><strong>Settled Credit Card Tag:</strong> Negotiated & updated to &apos;Closed with NOC&apos;.</span>
                                    </li>
                                    <li className={styles.disputeItem}>
                                        <CheckCircle2 size={16} className={styles.disputeIconResolved} />
                                        <span><strong>8 Fraudulent Inquiries:</strong> Successfully challenged and purged.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. Common Bureau Errors Section ──────── */}
            <section className={styles.section} id="errors">
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionEyebrow}>COMMON BUREAU MISTAKES</span>
                    <h2 className={styles.sectionTitle}>Errors On Your Credit Report Siphoning Your Hard-Earned Money</h2>
                    <p className={styles.sectionDesc}>
                        More than 1 in 4 credit reports in India contain errors made by banks and lending institutions. Here are the most damaging mistakes Credit Refine fixes for you:
                    </p>
                </div>

                <div className={styles.errorGrid}>
                    {ERROR_ITEMS.map((item, idx) => (
                        <div key={idx} className={styles.errorCard}>
                            <div className={styles.errorIconWrapper}>
                                <AlertTriangle size={22} />
                            </div>
                            <h3 className={styles.errorCardTitle}>{item.title}</h3>
                            <p className={styles.errorCardText}>{item.desc}</p>
                            <div className={styles.errorFixBadge}>
                                <Check size={14} />
                                <span>{item.fix}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 3. How It Works: 4-Step Engine ───────── */}
            <section className={styles.processSection} id="how-it-works">
                <div className={styles.processInner}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>THE 4-STEP SYSTEM</span>
                        <h2 className={styles.sectionTitle}>How Credit Refine Powers Your Score to 750+</h2>
                        <p className={styles.sectionDesc}>
                            Our structured, legally compliant dispute engine guarantees formal tracking and maximum impact on your credit profile.
                        </p>
                    </div>

                    <div className={styles.stepsGrid}>
                        {PROCESS_STEPS.map((step, idx) => (
                            <div key={idx} className={styles.stepCard}>
                                <span className={styles.stepNum}>{step.step}</span>
                                <h3 className={styles.stepCardTitle}>{step.title}</h3>
                                <p className={styles.stepCardText}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. Live Plans & Pricing Section ──────── */}
            <section className={styles.pricingSection} id="plans">
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionEyebrow}>PLANS & PRICING</span>
                    <h2 className={styles.sectionTitle}>Simple, Transparent Pricing For Credit Refine</h2>
                    <p className={styles.sectionDesc}>
                        Choose the plan that suits your credit recovery needs. Upgrade, downgrade, or cancel anytime.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                        <BillingToggle value={cycle} onChange={setCycle} savePct={17} />
                        <AiAgentsSwitch checked={includeAi} onChange={setIncludeAi} />
                    </div>
                </div>

                <div className={styles.pricingFocusCard}>
                    <div>
                        <div className={styles.pricingFocusTitle}>
                            <Award className="text-blue-600" size={20} />
                            <span>Recommended For Credit Refine: PRO Plan</span>
                        </div>
                        <div className={styles.pricingFocusDesc}>
                            Includes dedicated 1-on-1 human Credit Guru coaching, assisted dispute filing, and full DPD error rectification.
                        </div>
                    </div>
                    <Link href="/pricing" className={styles.pricingActionLink}>
                        <span>Compare full feature matrix</span>
                        <ArrowRight size={15} />
                    </Link>
                </div>

                <PricingPlanCards
                    plans={plans}
                    categories={categories}
                    cycle={cycle}
                    includeAi={includeAi}
                    onIncludeAiChange={setIncludeAi}
                    currentPlanName={null}
                    onSelect={handleSelectPlan}
                />
            </section>

            {/* ── 5. Real Borrower Success Stories ─────── */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionEyebrow}>PROVEN RESULTS</span>
                    <h2 className={styles.sectionTitle}>Real Credit Refine Success Stories</h2>
                    <p className={styles.sectionDesc}>
                        Verified stories of Indian borrowers who restored their creditworthiness and unlocked dream loans.
                    </p>
                </div>

                <div className={styles.testimonialsGrid}>
                    {SUCCESS_STORIES.map((item, idx) => (
                        <div key={idx} className={styles.testimonialCard}>
                            <div className={styles.testimonialHeader}>
                                <div>
                                    <div className={styles.testimonialUser}>{item.name}</div>
                                    <div className={styles.testimonialLocation}>{item.city}</div>
                                </div>
                                <div className={styles.testimonialScoreBadge}>
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
            </section>

            {/* ── 6. Credit Refine FAQ ─────────────────── */}
            <section className={styles.faqSection}>
                <div className={styles.faqContainer}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>QUESTIONS & ANSWERS</span>
                        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                        <p className={styles.sectionDesc}>
                            Everything you need to know about the Credit Refine dispute process and timelines.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div key={idx} className={styles.faqItem}>
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

            {/* ── 7. Final Bottom CTA Banner ───────────── */}
            <section className={styles.bottomCta}>
                <div className={styles.bottomCtaInner}>
                    <h2 className={styles.bottomCtaTitle}>
                        Stop Letting Bureau Errors Cost You Lakhs in Interest
                    </h2>
                    <p className={styles.bottomCtaSub}>
                        Join over 2,00,000+ borrowers who trusted CreditKlick Credit Refine™ to fix negative remarks and regain financial freedom.
                    </p>
                    <a href="#plans" className={styles.bottomCtaBtn}>
                        <span>Start Credit Refine Today</span>
                        <ArrowRight size={18} />
                    </a>
                </div>
            </section>
        </div>
    );
}
