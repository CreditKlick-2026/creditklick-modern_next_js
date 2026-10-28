"use client"

import React, { useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
    ShieldCheck,
    BarChart3,
    Handshake,
    Rocket,
    Gauge,
    Calculator,
    Smartphone,
    Sparkles,
    FileText,
    BadgeCheck,
    Check,
} from 'lucide-react'
import {
    AboutIllustrationStyles,
    TreeCrown,
    TreeRoots,
    MissionArt,
    VisionArt,
    Wave,
} from '@/components/about/AboutIllustrations'
import './about.css'

const fadeUp = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const stagger = (i: number, step = 0.08) => ({ ...fadeUp, transition: { ...fadeUp.transition, delay: i * step } });

const values = [
    {
        icon: BarChart3,
        title: 'Data-driven choices',
        text: 'Our algorithm-based platform compares multiple credit offers so you can pick the one that suits you best.',
    },
    {
        icon: ShieldCheck,
        title: 'Unbiased advice',
        text: 'Clear, transparent information on loans and credit cards, with no hidden surprises.',
    },
    {
        icon: Handshake,
        title: 'With you at every step',
        text: 'From application to disbursal of your loan or issuance of your credit card, we stay by your side.',
    },
];

// Journey timeline - update labels/years here as milestones are confirmed
const milestones = [
    {
        icon: Rocket,
        label: '2022',
        title: 'The beginning',
        text: 'CreditKlick was started by Incredible Management Services Pvt. Ltd. in Gurgaon, Haryana, to make finance easy, convenient and transparent.',
    },
    {
        icon: Gauge,
        label: 'Step 2',
        title: 'Free credit score',
        text: 'Launched free credit reports powered by CRIF High Mark, so anyone can know their score before applying for credit.',
    },
    {
        icon: Calculator,
        label: 'Step 3',
        title: 'Compare & calculate',
        text: 'Added credit card comparisons and value calculators for AU, IDFC FIRST, SBI and YES BANK cards, plus an EMI calculator.',
    },
    {
        icon: Smartphone,
        label: 'Step 4',
        title: 'CreditKlick app',
        text: 'Brought the full experience to Android with the CreditKlick app on Google Play.',
    },
    {
        icon: Sparkles,
        label: 'Today',
        title: 'Credit Refine & beyond',
        text: 'Helping users improve their credit health with Credit Refine and guiding them from application to disbursal.',
    },
];

function Hero() {
    return (
        <section className="ab-hero">
            <div className="ab-hero-dots" aria-hidden="true" />
            <div className="ab-wrap ab-hero-inner">
                <motion.div {...fadeUp} className="ab-hero-copy">
                    <span className="ab-pill">About Us</span>
                    <h1 className="ab-h1">The CreditKlick Story</h1>
                    <p className="ab-lead">We make finance easy, convenient &amp; transparent.</p>
                </motion.div>
            </div>
            <Wave fill="#ffffff" />
        </section>
    );
}

// Welcome flow - the four steps CreditKlick walks a user through
const flowSteps = [
    { id: 'score', icon: Gauge, title: 'Check your score', text: 'Free CRIF credit report in minutes' },
    { id: 'compare', icon: BarChart3, title: 'Compare offers', text: 'Multiple loan & card offers side by side' },
    { id: 'apply', icon: FileText, title: 'Apply with guidance', text: 'We help you at every step of the form' },
    { id: 'disburse', icon: BadgeCheck, title: 'Get disbursed', text: 'Loan disbursed or credit card issued' },
] as const;

type FlowId = (typeof flowSteps)[number]['id'];

function FlowPanel({ step }: { step: FlowId }) {
    if (step === 'score') {
        return (
            <div className="ab-fp-body">
                <p className="ab-fp-title">Your credit score</p>
                <div className="ab-fp-gauge">
                    <div className="ab-fp-gauge-ring" />
                    <div className="ab-fp-gauge-value">
                        <strong>780</strong>
                        <span>Excellent</span>
                    </div>
                </div>
                <div className="ab-fp-stats">
                    <div><span>Payment history</span><strong>Good</strong></div>
                    <div><span>Credit usage</span><strong>24%</strong></div>
                    <div><span>Report by</span><strong>CRIF</strong></div>
                </div>
            </div>
        );
    }
    if (step === 'compare') {
        return (
            <div className="ab-fp-body">
                <p className="ab-fp-title">Offers matched for you</p>
                {[
                    { name: 'Personal loan · Offer A', bar: 88, best: true },
                    { name: 'Personal loan · Offer B', bar: 64, best: false },
                    { name: 'Credit card · Offer C', bar: 46, best: false },
                ].map((o) => (
                    <div key={o.name} className={`ab-fp-offer${o.best ? ' is-best' : ''}`}>
                        <span className="ab-fp-offer-logo" />
                        <div className="ab-fp-offer-info">
                            <p>{o.name}</p>
                            <div className="ab-fp-meter"><span style={{ width: `${o.bar}%` }} /></div>
                        </div>
                        {o.best && <span className="ab-fp-badge">Best match</span>}
                    </div>
                ))}
            </div>
        );
    }
    if (step === 'apply') {
        return (
            <div className="ab-fp-body">
                <p className="ab-fp-title">Application</p>
                {[
                    { label: 'Personal details', done: true },
                    { label: 'Income & employment', done: true },
                    { label: 'KYC documents', done: true },
                    { label: 'Lender review', done: false },
                ].map((f) => (
                    <div key={f.label} className={`ab-fp-field${f.done ? ' is-done' : ''}`}>
                        <span className="ab-fp-check">{f.done ? <Check aria-hidden="true" /> : null}</span>
                        <p>{f.label}</p>
                        <span className="ab-fp-status">{f.done ? 'Done' : 'In progress'}</span>
                    </div>
                ))}
                <div className="ab-fp-meter ab-fp-meter-lg"><span style={{ width: '75%' }} /></div>
                <p className="ab-fp-caption">3 of 4 steps complete</p>
            </div>
        );
    }
    return (
        <div className="ab-fp-body ab-fp-done">
            <span className="ab-fp-done-icon"><Check aria-hidden="true" /></span>
            <p className="ab-fp-done-title">Loan disbursed</p>
            <p className="ab-fp-caption">or your credit card is issued &mdash; we stay with you till the end.</p>
            <ol className="ab-fp-timeline">
                <li>Score checked</li>
                <li>Offer chosen</li>
                <li>Application approved</li>
                <li>Disbursed</li>
            </ol>
        </div>
    );
}

function Welcome() {
    const [active, setActive] = useState<FlowId>('score');
    const activeIndex = flowSteps.findIndex((s) => s.id === active);

    return (
        <section className="ab-wrap ab-section">
            <div className="ab-split">
                <div className="ab-text">
                    <p className="ab-eyebrow">Who we are</p>
                    <h2 className="ab-h2">Welcome to CreditKlick</h2>
                    <p>
                        Using data and technology innovations, we help you choose the
                        most-suited financial products. Our algorithm-based technology
                        platform provides you with access to multiple personal credit
                        offers, ease of comparison of multiple offers available and
                        unbiased advice.
                    </p>
                    <p>
                        From application to disbursal, CreditKlick will accompany you at each
                        step, till the disbursal of loan or issuance of credit card.
                    </p>

                    {/* The flow: click a step to see it in the panel */}
                    <div className="ab-flow" role="tablist" aria-label="How CreditKlick works">
                        {flowSteps.map(({ id, icon: Icon, title, text }, i) => (
                            <button
                                key={id}
                                type="button"
                                role="tab"
                                id={`ab-flow-tab-${id}`}
                                aria-selected={active === id}
                                aria-controls="ab-flow-panel"
                                className={`ab-flow-step${active === id ? ' is-active' : ''}${i < activeIndex ? ' is-past' : ''}`}
                                onClick={() => setActive(id)}
                            >
                                <span className="ab-flow-num">
                                    <Icon aria-hidden="true" />
                                </span>
                                <span className="ab-flow-copy">
                                    <span className="ab-flow-label">Step {i + 1}</span>
                                    <span className="ab-flow-title">{title}</span>
                                    <span className="ab-flow-text">{text}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    id="ab-flow-panel"
                    role="tabpanel"
                    aria-labelledby={`ab-flow-tab-${active}`}
                    className="ab-fp"
                >
                    <div className="ab-fp-top">
                        <span /><span /><span />
                        <p>CreditKlick</p>
                    </div>
                    <div className="ab-fp-steps" aria-hidden="true">
                        {flowSteps.map((s, i) => (
                            <span key={s.id} className={i <= activeIndex ? 'is-on' : ''} />
                        ))}
                    </div>
                    <FlowPanel step={active} />
                </div>
            </div>
        </section>
    );
}

function Journey() {
    const trunkRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: trunkRef, offset: ['start 70%', 'end 70%'] });
    const grow = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <section className="ab-journey">
            <div className="ab-wrap ab-wrap-md">
                <motion.div {...fadeUp} className="ab-center">
                    <p className="ab-eyebrow">Our Journey</p>
                    <h2 className="ab-h2">Kab aur kaise shuru hua</h2>
                    <p className="ab-sub">
                        A small seed planted in 2022, growing branch by branch into a platform that helps
                        people across India make better credit decisions.
                    </p>
                </motion.div>

                {/* Crown of the tree */}
                <div className="ab-tree-top">
                    <TreeCrown className="ab-crown" />
                </div>

                <div ref={trunkRef} className="ab-trunk-wrap">
                    {/* Trunk track + scroll-filled trunk */}
                    <div className="ab-trunk" aria-hidden="true" />
                    <motion.div style={{ scaleY: grow }} className="ab-trunk-fill" aria-hidden="true" />

                    {/* Column headings: left = when, right = how */}
                    <div className="ab-cols">
                        <p>Kab &middot; When</p>
                        <span />
                        <p>Kaise &middot; How</p>
                    </div>

                    <ol>
                        {milestones.map(({ icon: Icon, label, title, text }, i) => (
                            <motion.li
                                key={title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="ab-step"
                            >
                                {/* Left branch: when it happened */}
                                <div className="ab-when">
                                    <p className="ab-when-label">{label}</p>
                                    <h3 className="ab-when-title">{title}</h3>
                                </div>

                                {/* Node on the trunk with branches to both sides */}
                                <div className="ab-node" aria-hidden="true">
                                    <span className="ab-branch ab-branch-l" />
                                    <span className="ab-branch ab-branch-r" />
                                    <span className="ab-node-dot">
                                        <Icon />
                                    </span>
                                </div>

                                {/* Right branch: how it happened */}
                                <p className="ab-how">{text}</p>
                            </motion.li>
                        ))}
                    </ol>
                </div>

                {/* Roots: where it all began */}
                <div className="ab-tree-bottom">
                    <TreeRoots className="ab-roots" />
                </div>
                <p className="ab-roots-note">
                    Rooted in Gurgaon, Haryana &middot; Incredible Management Services Pvt. Ltd.
                </p>
            </div>
        </section>
    );
}

function MissionVision() {
    const cards = [
        {
            Art: MissionArt,
            title: 'Our Mission',
            text: 'To make financial products like loans and credit cards accessible, transparent and easy to understand for everyone in India.',
        },
        {
            Art: VisionArt,
            title: 'Our Vision',
            text: 'A future where every Indian can make confident financial decisions, backed by clear information and the right credit offers.',
        },
    ];
    return (
        <section>
            <Wave />
            <div className="ab-mv-band">
                <div className="ab-mv-grid">
                    {cards.map(({ Art, title, text }, i) => (
                        <motion.div key={title} {...stagger(i, 0.1)} className="ab-mv-card">
                            <Art className="ab-mv-art" />
                            <div>
                                <h2>{title}</h2>
                                <p>{text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Wave flip />
        </section>
    );
}

function Values() {
    return (
        <section className="ab-wrap ab-section">
            <motion.div {...fadeUp} className="ab-center">
                <p className="ab-eyebrow">What we stand for</p>
                <h2 className="ab-h2">Why CreditKlick</h2>
            </motion.div>
            <div className="ab-values">
                {values.map(({ icon: Icon, title, text }, i) => (
                    <motion.div key={title} {...stagger(i, 0.1)} className="ab-value">
                        <div className="ab-value-blob" aria-hidden="true" />
                        <span className="ab-value-icon">
                            <Icon aria-hidden="true" />
                        </span>
                        <h3>{title}</h3>
                        <p>{text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default function AboutClient() {
    return (
        <div className="ab">
            <AboutIllustrationStyles />
            <Hero />
            <Welcome />
            <Journey />
            <MissionVision />
            <Values />
        </div>
    );
}
