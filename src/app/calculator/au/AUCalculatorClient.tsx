"use client"

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { ShoppingCart, Fuel, Train, Trophy, ArrowRight, Info, Sparkles } from 'lucide-react'
import '../value-calculator.css'

const APPLY_HREF = '/credit-card/au-bank'
const CARD_BG = 'linear-gradient(135deg, #f59e0b, #b45309 60%, #7c2d12)'
const QUICK_SPENDS = [10000, 25000, 50000, 100000]
// Monthly spend needed for each milestone tier used in the calculation below
const MILESTONES = [
    { monthly: 16667, label: 'quarterly milestone bonus' },
    { monthly: 20834, label: 'annual milestone vouchers' },
    { monthly: 33334, label: 'higher quarterly milestone bonus' },
]

const formatINR = (n: number) => n.toLocaleString('en-IN')

export default function AUCalculatorClient() {
    const [spending, setSpending] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, '')
        setSpending(value)
    }

    const monthlySpend = Number(spending) || 0

    // Fuel Surcharge Calculation
    let fuel = 0
    if (monthlySpend >= 400 && monthlySpend <= 5000) {
        fuel = Math.round(monthlySpend / 100)
    } else if (monthlySpend > 5000) {
        fuel = Math.round(5000 / 100)
    }

    // Quarterly Milestone Calculation
    let qmilestone = 0
    if (monthlySpend >= 16667 && monthlySpend < 33334) {
        qmilestone = 500
    } else if (monthlySpend >= 33334) {
        qmilestone = 1500
    }

    // Annual Milestone Calculation
    let amilestone = 0
    if (monthlySpend >= 20834) {
        amilestone = 1000
    }

    // Calculate total benefits
    const merchantPoints = Math.round(monthlySpend / 25)
    const merchantBenefits = Math.round((monthlySpend / 25) * 12 * 0.2)
    const fuelBenefits = Math.round(fuel * 12 * 0.2)
    const quarterlyBenefits = qmilestone * 4 * 0.2
    const annualBenefits = amilestone * 0.2

    const totalBenefits = Math.round(
        merchantBenefits + fuelBenefits + quarterlyBenefits + annualBenefits
    )

    const categories = [
        {
            icon: ShoppingCart,
            title: 'At Merchant Outlets',
            description: '4 Reward Points for every ₹100 spent in a statement cycle',
            points: merchantPoints,
            benefits: merchantBenefits
        },
        {
            icon: Fuel,
            title: 'Fuel',
            description: '1% Fuel Surcharge Waiver for fuel transactions done between INR 400 and INR 5,000, across all fuel stations in the country (Maximum INR 250 per statement cycle).',
            points: fuel,
            benefits: fuelBenefits
        },
        {
            icon: Train,
            title: 'Railway Lounge',
            description: 'Complimentary railway lounge access - 2 per quarter',
            points: '-',
            benefits: '-'
        },
        {
            icon: Trophy,
            title: 'Quarterly Milestone Benefits',
            description: '500 Bonus Reward Points on INR 50,000 retail spends* done per calendar quarter and get additional 1,000 Bonus Reward Points on reaching INR 1 lakh retail spends* per calendar quarter.',
            points: qmilestone * 4,
            benefits: quarterlyBenefits,
            wide: true
        },
        {
            icon: Trophy,
            title: 'Annual Milestone Benefits',
            description: 'Get INR 1,000 worth vouchers on minimum INR 2.50 lakh retail spends done in a card anniversary year. Choose your vouchers from a bouquet of top brands.',
            points: amilestone,
            benefits: annualBenefits,
            wide: true
        }
    ]

    // Next monthly-spend threshold that unlocks a milestone (same limits as above)
    const nextMilestone = MILESTONES.find((m) => monthlySpend < m.monthly)

    return (
        <div className="vc">
            <section className="vc-hero">
                <div className="vc-wrap">
                    <p className="vc-eyebrow">Value Calculator</p>
                    <h1>AU Bank Credit Card Value Calculator</h1>
                    <p className="vc-hero-sub">
                        Know the potential of your card. Enter your estimated monthly spends to see the rewards and savings you could earn in a year.
                    </p>
                </div>
            </section>

            <div className="vc-body">
                <div className="vc-wrap">
                    <div className="vc-top">
                        <div className="vc-panel">
                            <h2 className="vc-panel-title">Enter your spends</h2>
                            <p className="vc-panel-sub">Results update instantly as you type.</p>

                            <div className="vc-field">
                                <label htmlFor="vc-monthly">My Monthly Spends</label>
                                <div className="vc-money">
                                    <span aria-hidden="true">₹</span>
                                    <input
                                        id="vc-monthly"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="Enter monthly spending"
                                        value={spending ? formatINR(monthlySpend) : ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="vc-chips" aria-label="Quick select">
                                    {QUICK_SPENDS.map((amount) => (
                                        <button
                                            key={amount}
                                            type="button"
                                            className="vc-chip"
                                            aria-pressed={monthlySpend === amount}
                                            onClick={() => setSpending(String(amount))}
                                        >
                                            ₹{formatINR(amount)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="vc-annual">
                                <span>My Annual Spends</span>
                                <strong>₹{formatINR(monthlySpend * 12)}</strong>
                            </div>

                            <ul className="vc-notes">
                                <li><Info aria-hidden="true" /> 1 Reward Point = ₹0.20</li>
                                <li><Info aria-hidden="true" /> Benefits are calculated for 12 months of spends</li>
                                <li><Info aria-hidden="true" /> Railway lounge access is not counted in the total</li>
                            </ul>
                        </div>

                        <div className="vc-result" aria-live="polite">
                            <p className="vc-result-label">Your total annual benefits can be worth upto</p>
                            <p className="vc-result-total">₹{formatINR(totalBenefits)}</p>
                            <p className="vc-result-note">Here&apos;s how your spends on this Card are split below</p>
                            {nextMilestone && (
                                <p className="vc-hint">
                                    <Sparkles aria-hidden="true" />
                                    Spend ₹{formatINR(nextMilestone.monthly - monthlySpend)} more a month to unlock the {nextMilestone.label}
                                </p>
                            )}

                            <div className="vc-face" style={{ '--vc-card-bg': CARD_BG } as CSSProperties} aria-hidden="true">
                                <p className="vc-face-bank">AU BANK</p>
                                <p className="vc-face-name">Vetta</p>
                                <div className="vc-face-chip" />
                                <p className="vc-face-number">•••• •••• 4321</p>
                            </div>

                            <Link href={APPLY_HREF} className="vc-btn vc-btn-light">
                                Apply Now <ArrowRight aria-hidden="true" />
                            </Link>
                        </div>
                    </div>

                    <section className="vc-breakdown">
                        <div className="vc-breakdown-head">
                            <h2>Your benefits breakdown</h2>
                            <p>How the value you earn adds up across categories.</p>
                        </div>

                        <div className="vc-cats">
                            {categories.map(({ icon: Icon, title, description, points, benefits, wide }) => (
                                <div key={title} className={`vc-cat${wide ? ' is-wide' : ''}`}>
                                    <div className="vc-cat-head">
                                        <span className="vc-cat-icon"><Icon aria-hidden="true" /></span>
                                        <div>
                                            <h3>{title}</h3>
                                            {description && <p>{description}</p>}
                                        </div>
                                    </div>
                                    <div className="vc-cat-stats">
                                        <div>
                                            <span>Points</span>
                                            <strong>{typeof points === 'number' ? formatINR(points) : points}</strong>
                                        </div>
                                        <div>
                                            <span>Benefits</span>
                                            <strong className="vc-benefit">{typeof benefits === 'number' ? `₹${formatINR(benefits)}` : benefits}</strong>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="vc-cta">
                        <Link href={APPLY_HREF} className="vc-btn vc-btn-primary">
                            Apply for AU Bank Card <ArrowRight aria-hidden="true" />
                        </Link>
                        <p className="vc-disclaimer">Values are estimates based on your entered spends and may vary.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
