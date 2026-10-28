"use client"

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { ShoppingCart, Smartphone, Film, Fuel, UtensilsCrossed, Trophy, ArrowRight } from 'lucide-react'
import '../value-calculator.css'

const APPLY_HREF = '/credit-card/yes-bank'
const CARD_BG = 'linear-gradient(135deg, #0ea5e9, #1d4ed8 55%, #172554)'
const QUICK_SPENDS = [10000, 25000, 50000, 100000]

const formatINR = (n: number) => n.toLocaleString('en-IN')

export default function YesCalculatorClient() {
    const [spending, setSpending] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, '')
        setSpending(value)
    }

    const monthlySpend = Number(spending) || 0

    // Fuel Surcharge Calculation
    let fuel = 0
    if (monthlySpend >= 400 && monthlySpend <= 5000) {
        fuel = monthlySpend * 0.01
    } else if (monthlySpend > 5000) {
        fuel = 50
    }

    // Annual Fee Reversal
    let annual = 0
    const spendingTotal = monthlySpend * 12
    if (spendingTotal > 150000) {
        annual = 999
    }

    // Calculate benefits
    const groceryPoints = Math.round((monthlySpend * 0.5 * 6) / 200)
    const groceryBenefits = Math.round(((monthlySpend * 0.5 * 6) / 200) * 12 * 0.25)
    const retailPoints = Math.round((monthlySpend * 0.5 * 3) / 200)
    const retailBenefits = Math.round(((monthlySpend * 0.5 * 3) / 200) * 12 * 0.25)
    const onlinePoints = Math.round((monthlySpend * 0.5 * 6) / 200)
    const onlineBenefits = Math.round(((monthlySpend * 0.5 * 6) / 200) * 12 * 0.25)
    const moviePoints = Math.round((monthlySpend / 2) * 0.25)
    const movieBenefits = Math.round((monthlySpend / 2) * 0.25) * 12
    const fuelBenefits = Math.round(fuel * 12)
    const diningPoints = Math.round((monthlySpend * 0.5 * 6) / 200)
    const diningBenefits = Math.round(((monthlySpend * 0.5 * 6) / 200) * 12 * 0.25)

    const totalBenefits = Math.round(
        groceryBenefits + retailBenefits + onlineBenefits + movieBenefits + fuelBenefits + diningBenefits + annual
    )

    const categories = [
        {
            icon: ShoppingCart,
            title: 'Grocery spends',
            description: '6 Reward Point for every ₹200 spent',
            points: groceryPoints,
            benefits: groceryBenefits
        },
        {
            icon: ShoppingCart,
            title: 'Other Retail spends',
            description: '3 Reward Point for every ₹200 spent',
            points: retailPoints,
            benefits: retailBenefits
        },
        {
            icon: Smartphone,
            title: 'Online Rewards',
            description: '6 Reward Point for every ₹200 spent',
            points: onlinePoints,
            benefits: onlineBenefits
        },
        {
            icon: Film,
            title: 'Movie',
            description: '25% off on movie tickets through BMS.',
            points: moviePoints,
            benefits: movieBenefits
        },
        {
            icon: Fuel,
            title: 'Fuel',
            description: '1% Fuel Surcharge waiver between ₹400 to ₹5,000 per month',
            points: Math.round(fuel),
            benefits: fuelBenefits
        },
        {
            icon: UtensilsCrossed,
            title: 'Dining',
            description: 'Get 6 reward points on every ₹200',
            points: diningPoints,
            benefits: diningBenefits
        },
        {
            icon: Trophy,
            title: 'Annual Fees Reversal Benefits',
            description: '₹999 plus tax waived if ₹1,50,000 is spent in previous year.',
            points: '-',
            benefits: annual
        }
    ]

    return (
        <div className="vc">
            <section className="vc-hero">
                <div className="vc-wrap">
                    <p className="vc-eyebrow">Value Calculator</p>
                    <h1>YES Bank Credit Card Value Calculator</h1>
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
                            <p className="vc-panel-sub">Know the potential of your Card - Enter your estimated spends below.</p>

                            <div className="vc-field">
                                <label htmlFor="vc-monthly">My Monthly Spends</label>
                                <div className="vc-money">
                                    <span aria-hidden="true">₹</span>
                                    <input
                                        id="vc-monthly"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="Enter monthly spending"
                                        value={spending}
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
                                <strong>₹{formatINR(spendingTotal)}</strong>
                            </div>
                        </div>

                        <div className="vc-result" aria-live="polite">
                            <p className="vc-result-label">Your total annual benefits can be worth upto</p>
                            <p className="vc-result-total">₹{formatINR(totalBenefits)}</p>
                            <p className="vc-result-note">Here&apos;s how your spends on this Card are split below</p>

                            <div className="vc-face" style={{ '--vc-card-bg': CARD_BG } as CSSProperties} aria-hidden="true">
                                <p className="vc-face-bank">YES BANK</p>
                                <p className="vc-face-name">Premia</p>
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
                            {categories.map(({ icon: Icon, title, description, points, benefits }) => (
                                <div key={title} className="vc-cat">
                                    <div className="vc-cat-head">
                                        <span className="vc-cat-icon"><Icon aria-hidden="true" /></span>
                                        <div>
                                            <h3>{title}</h3>
                                            <p>{description}</p>
                                        </div>
                                    </div>
                                    <div className="vc-cat-stats">
                                        <div>
                                            <span>Points</span>
                                            <strong>{typeof points === 'number' ? formatINR(points) : points}</strong>
                                        </div>
                                        <div>
                                            <span>Benefits</span>
                                            <strong className="vc-benefit">₹{formatINR(benefits)}</strong>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="vc-cta">
                        <Link href={APPLY_HREF} className="vc-btn vc-btn-primary">
                            Apply for YES Bank Card <ArrowRight aria-hidden="true" />
                        </Link>
                        <p className="vc-disclaimer">Values are estimates based on your entered spends and may vary.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
