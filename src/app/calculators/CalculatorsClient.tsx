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
            {/* Header & Filter Controls */}
            <div className="cp-wrap" style={{ paddingTop: '44px', paddingBottom: '28px', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 800,
                    color: 'var(--cp-blue-900)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                }}>
                    Finance Calculators &amp; Tools
                </h1>
                <p style={{
                    fontSize: '15px',
                    color: 'var(--cp-slate-600)',
                    marginTop: '8px',
                    marginBottom: '24px',
                    maxWidth: '560px',
                    marginInline: 'auto',
                }}>
                    Plan loan EMIs, calculate credit card reward savings, and make informed financial decisions.
                </p>

                {/* Search Bar & Tabs Container */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    maxWidth: '520px',
                    margin: '0 auto',
                }}>
                    {/* Search Bar */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                    }}>
                        <Search style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '16px',
                            height: '16px',
                            color: '#64748b',
                            pointerEvents: 'none',
                        }} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search calculators (e.g. EMI, AU, SBI)..."
                            aria-label="Search calculators"
                            style={{
                                width: '100%',
                                padding: '11px 16px 11px 42px',
                                fontSize: '14px',
                                border: '1px solid #cbd5e1',
                                borderRadius: '0px',
                                outline: 'none',
                                backgroundColor: '#fff',
                                color: '#0f172a',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                            }}
                        />
                    </div>

                    {/* Category Tabs */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                        width: '100%',
                    }}>
                        {categories.map(({ name, icon: Icon }) => {
                            const isActive = category === name;
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => setCategory(name)}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 16px',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        borderRadius: '0px',
                                        border: isActive ? '1px solid #155dfc' : '1px solid #cbd5e1',
                                        backgroundColor: isActive ? '#155dfc' : '#ffffff',
                                        color: isActive ? '#ffffff' : '#475569',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        boxShadow: isActive ? '0 2px 6px rgba(21, 93, 252, 0.2)' : 'none',
                                    }}
                                >
                                    <Icon style={{ width: '14px', height: '14px' }} />
                                    <span>{name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Calculators */}
            <section id="all-calculators" className="cp-list">
                <div className="cp-wrap">
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
        </div>
    )
}
