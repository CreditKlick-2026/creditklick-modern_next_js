"use client"

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowRight, Calculator, CreditCard, Landmark, Search, Zap, BadgeIndianRupee,
    SlidersHorizontal, ShieldCheck, Gift, ShoppingBag, Percent, Wallet, ChevronDown, Sparkles,
} from 'lucide-react'
import { HomeEmiCalculator } from '@/components/home/calculator/HomeEmiCalculator'
import './calculators.css'

type Category = 'All' | 'Loans' | 'Credit Cards'

const calculators = [
    {
        title: 'EMI Calculator',
        link: '/emi',
        category: 'Loans' as const,
        description: 'Work out the monthly EMI, total interest and repayment schedule for any loan.',
        icon: Calculator,
        accent: 'cp-acc-blue',
        tag: 'Most used',
    },
    {
        title: 'AU Bank Card Value Calculator',
        link: '/calculator/au',
        category: 'Credit Cards' as const,
        description: 'See how much value your AU Bank credit card returns on your monthly spends.',
        icon: CreditCard,
        accent: 'cp-acc-orange',
    },
    {
        title: 'IDFC FIRST Card Value Calculator',
        link: '/calculator/idfc',
        category: 'Credit Cards' as const,
        description: 'Estimate the rewards and savings you earn with an IDFC FIRST credit card.',
        icon: Gift,
        accent: 'cp-acc-rose',
    },
    {
        title: 'SBI SimplySAVE Value Calculator',
        link: '/calculator/sbi-save',
        category: 'Credit Cards' as const,
        description: 'Calculate reward points on dining, groceries and movies with SBI SimplySAVE.',
        icon: Wallet,
        accent: 'cp-acc-indigo',
    },
    {
        title: 'SBI SimplyCLICK Value Calculator',
        link: '/calculator/sbi-click',
        category: 'Credit Cards' as const,
        description: 'Find out what your online shopping earns you with SBI SimplyCLICK.',
        icon: ShoppingBag,
        accent: 'cp-acc-cyan',
    },
    {
        title: 'YES Bank Card Value Calculator',
        link: '/calculator/yes',
        category: 'Credit Cards' as const,
        description: 'Measure the real value of your YES Bank credit card rewards.',
        icon: Percent,
        accent: 'cp-acc-violet',
    },
]

const categories: { name: Category; icon: typeof Calculator }[] = [
    { name: 'All', icon: Sparkles },
    { name: 'Loans', icon: Landmark },
    { name: 'Credit Cards', icon: CreditCard },
]

const benefits = [
    { icon: Zap, title: 'Instant Results', text: 'Answers update as you move the sliders. No forms, no waiting.' },
    { icon: BadgeIndianRupee, title: '100% Free', text: 'Every calculator is free to use, as often as you like.' },
    { icon: SlidersHorizontal, title: 'Easy to Use', text: 'Simple sliders and plain-language results.' },
    { icon: ShieldCheck, title: 'Private', text: 'No sign-up, and we never store what you type in.' },
]

const faqs = [
    {
        q: 'How is EMI calculated?',
        a: 'EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the tenure in months.',
    },
    {
        q: 'Are the results from these calculators final?',
        a: 'They are close estimates for planning. Your lender’s final figures can differ slightly because of processing fees, rounding and the exact disbursal date.',
    },
    {
        q: 'What does a credit card value calculator show?',
        a: 'It turns your monthly spending into the reward points, cashback and savings your card would earn, so you can see whether the card is worth its annual fee.',
    },
    {
        q: 'Does using a calculator affect my credit score?',
        a: 'No. Calculators don’t run any credit check, so you can use them as often as you like.',
    },
]

const formatINR = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

function QuickEmi() {
    const [amount, setAmount] = useState(500000)
    const [rate, setRate] = useState(11)
    const [years, setYears] = useState(3)

    const { emi, interest, total } = useMemo(() => {
        const r = rate / 12 / 100
        const n = years * 12
        const emi = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        const total = emi * n
        return { emi, interest: total - amount, total }
    }, [amount, rate, years])

    const sliders = [
        { label: 'Loan amount', value: amount, set: setAmount, min: 50000, max: 5000000, step: 10000, display: formatINR(amount) },
        { label: 'Interest rate (p.a.)', value: rate, set: setRate, min: 5, max: 30, step: 0.25, display: `${rate}%` },
        { label: 'Tenure', value: years, set: setYears, min: 1, max: 30, step: 1, display: `${years} yr${years > 1 ? 's' : ''}` },
    ]

    return (
        <div className="cp-emi">
            <div className="cp-emi-head">
                <h2>Quick EMI check</h2>
                <span className="cp-live">Live</span>
            </div>

            <div className="cp-sliders">
                {sliders.map((s) => (
                    <label key={s.label}>
                        <div className="cp-slider-row">
                            <span>{s.label}</span>
                            <b>{s.display}</b>
                        </div>
                        <input
                            type="range"
                            min={s.min}
                            max={s.max}
                            step={s.step}
                            value={s.value}
                            onChange={(e) => s.set(Number(e.target.value))}
                        />
                    </label>
                ))}
            </div>

            <div className="cp-result">
                <p className="cp-result-label">Monthly EMI</p>
                <p className="cp-result-value">{formatINR(emi)}</p>
                <div className="cp-bar">
                    <div style={{ width: `${(amount / total) * 100}%` }} />
                </div>
                <div className="cp-legend">
                    <div>
                        <span className="cp-dot" style={{ background: '#2563eb' }} />
                        Principal <b>{formatINR(amount)}</b>
                    </div>
                    <div>
                        <span className="cp-dot" style={{ background: '#93c5fd' }} />
                        Interest <b>{formatINR(interest)}</b>
                    </div>
                </div>
            </div>

            <Link href="/emi" className="cp-btn">
                See full breakdown <ArrowRight />
            </Link>
        </div>
    )
}

export default function CalculatorsClient() {
    const [category, setCategory] = useState<Category>('All')
    const [query, setQuery] = useState('')
    const [openFaq, setOpenFaq] = useState<number | null>(0)

    const filtered = calculators.filter(
        (c) =>
            (category === 'All' || c.category === category) &&
            (c.title + ' ' + c.description).toLowerCase().includes(query.trim().toLowerCase())
    )

    return (
        <div className="cp">
            {/* Hero */}
            <section className="cp-hero">
                <div className="cp-blob cp-blob--a" />
                <div className="cp-blob cp-blob--b" />

                <div className="cp-wrap cp-hero-grid">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="cp-eyebrow">
                            <Calculator size={14} /> Free finance tools
                        </span>
                        <h1 className="cp-title">
                            Finance Calculators <span>&amp; Tools</span>
                        </h1>
                        <p className="cp-lead">
                            Get the expert edge you need to reach your financial goals. Plan loan EMIs and find out what your credit card really earns you, in seconds.
                        </p>

                        <div className="cp-search">
                            <Search />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search calculators, e.g. EMI, SBI…"
                                aria-label="Search calculators"
                                onKeyDown={(e) => e.key === 'Enter' && document.getElementById('all-calculators')?.scrollIntoView({ behavior: 'smooth' })}
                            />
                        </div>

                        <dl className="cp-stats">
                            {[
                                ['6+', 'Calculators'],
                                ['0', 'Sign-ups needed'],
                                ['100%', 'Free'],
                            ].map(([v, l]) => (
                                <div key={l}>
                                    <dt>{v}</dt>
                                    <dd>{l}</dd>
                                </div>
                            ))}
                        </dl>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                        <QuickEmi />
                    </motion.div>
                </div>
            </section>

            {/* Calculators */}
            <section id="all-calculators" className="cp-list">
                <div className="cp-wrap">
                    <div className="cp-tabs" role="tablist">
                        {categories.map(({ name, icon: Icon }) => (
                            <button
                                key={name}
                                type="button"
                                role="tab"
                                aria-selected={category === name}
                                onClick={() => setCategory(name)}
                                className={`cp-tab ${category === name ? 'is-active' : ''}`}
                            >
                                {category === name && (
                                    <motion.span layoutId="cat-pill" className="cp-tab-pill" transition={{ type: 'spring', duration: 0.4 }} />
                                )}
                                <Icon />
                                <span>{name}</span>
                            </button>
                        ))}
                    </div>

                    <motion.div layout className="cp-grid">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((calc) => (
                                <motion.div
                                    key={calc.link}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <Link href={calc.link} className="cp-card">
                                        <div className={`cp-card-glow ${calc.accent}`} />
                                        <div className="cp-card-top">
                                            <div className={`cp-card-icon ${calc.accent}`}>
                                                <calc.icon />
                                            </div>
                                            {calc.tag && <span className="cp-tag">{calc.tag}</span>}
                                        </div>
                                        <p className="cp-card-cat">{calc.category}</p>
                                        <h2>{calc.title}</h2>
                                        <p className="cp-card-desc">{calc.description}</p>
                                        <span className="cp-card-link">
                                            Calculate now <ArrowRight />
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filtered.length === 0 && (
                        <div className="cp-empty">
                            No calculator matches “{query}”.{' '}
                            <button type="button" onClick={() => { setQuery(''); setCategory('All') }}>
                                Show all
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Interactive Loan EMI Calculator */}
            <section className="cp-section cp-section--white" id="interactive-loan-calculator">
                <div className="cp-wrap">
                    <div className="cp-head" style={{ marginBottom: '1.5rem' }}>
                        <h2 className="cp-h2">Multi-Loan EMI Calculator</h2>
                        <p>Calculate and plan your Personal, Home, and Car loan EMIs instantly with interactive sliders and visual breakdown.</p>
                    </div>
                    <HomeEmiCalculator />
                </div>
            </section>

            {/* Why use */}
            <section className="cp-section cp-section--white">
                <div className="cp-wrap">
                    <div className="cp-head">
                        <h2 className="cp-h2">Why use CreditKlick calculators?</h2>
                        <p>Know the numbers before you borrow or pick a card, so you can decide with confidence.</p>
                    </div>
                    <div className="cp-benefits">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={b.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="cp-benefit"
                            >
                                <div className="cp-benefit-icon">
                                    <b.icon />
                                </div>
                                <h3>{b.title}</h3>
                                <p>{b.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="cp-section">
                <div className="cp-wrap">
                    <h2 className="cp-h2">Frequently asked questions</h2>
                    <div className="cp-faq">
                        {faqs.map((f, i) => {
                            const open = openFaq === i
                            return (
                                <div key={f.q} className="cp-faq-item">
                                    <button
                                        type="button"
                                        aria-expanded={open}
                                        onClick={() => setOpenFaq(open ? null : i)}
                                        className="cp-faq-q"
                                    >
                                        {f.q}
                                        <ChevronDown className={open ? 'is-open' : ''} />
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {open && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <p className="cp-faq-a">{f.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ paddingBottom: 80 }}>
                <div className="cp-wrap">
                    <div className="cp-cta">
                        <h2>A better credit score means lower EMIs</h2>
                        <p>Check your credit score for free and see the loan and card offers you’re likely to get.</p>
                        <Link href="/credit-score">
                            Get your FREE Credit Score <ArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
