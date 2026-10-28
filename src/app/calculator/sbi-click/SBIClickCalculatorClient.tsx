"use client"

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { Smartphone, Fuel, Train, Plane, UtensilsCrossed, Trophy, ArrowRight } from 'lucide-react'
import '../value-calculator.css'

const APPLY_HREF = '/credit-card/sbi-bank'
const CARD_BG = 'linear-gradient(135deg, #3b82f6, #1e40af 60%, #1e1b4b)'
const QUICK_SPENDS = [10000, 25000, 50000, 100000]

const formatINR = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 })

export default function SBIClickCalculatorClient() {
    const [spending, setSpending] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, '')
        setSpending(value)
    }

    const monthlySpend = Number(spending) || 0

    // Online Others Calculation
    let onlineOthers = 0
    if (monthlySpend <= 10000) {
        onlineOthers = Math.round(monthlySpend / 20)
    } else if (monthlySpend > 10000) {
        onlineOthers = Math.round(monthlySpend / 100)
    }

    // Fuel Surcharge Calculation
    let fuel = 0
    if (monthlySpend >= 500 && monthlySpend <= 3000) {
        fuel = monthlySpend * 0.01
    } else if (monthlySpend > 3000) {
        fuel = 3000 * 0.01
    }

    // Travel Calculation
    let travel = 0
    if (monthlySpend >= 5000) {
        travel = Math.round(monthlySpend * 0.12)
    } else if (monthlySpend > 16667) {
        travel = 2000
    }

    // Milestone Benefits
    let milestone = 0
    if ((monthlySpend * 12) >= 100000) {
        milestone = 500
    }

    // Calculate benefits
    const onlinePartnerPoints = monthlySpend / 10
    const onlinePartnerBenefits = (monthlySpend / 10) * 12 * 0.25
    const onlineOtherBenefits = onlineOthers * 12 * 0.25
    const fuelBenefits = fuel * 12
    const travelBenefits = travel * 12
    const diningPoints = Math.round(monthlySpend * 0.15)
    const diningBenefits = Math.round(monthlySpend * 0.15 * 12)

    const totalBenefits = Math.round(
        onlinePartnerBenefits + onlineOtherBenefits + fuelBenefits + travelBenefits + diningBenefits + milestone
    )

    const categories = [
        {
            icon: Smartphone,
            title: 'Online Rewards for exclusive partners',
            subtitle: 'Apollo24X7, BookMyShow, Cleartrip, Eazydiner & Netmeds',
            description: '10 Reward Points for every ₹100 spent',
            points: onlinePartnerPoints,
            benefits: onlinePartnerBenefits
        },
        {
            icon: Smartphone,
            title: 'Online Rewards for other online spends',
            description: '5 Reward Points for every ₹100 spent till 10,000 points. After that, 1 point for every ₹100',
            points: onlineOthers,
            benefits: onlineOtherBenefits
        },
        {
            icon: Fuel,
            title: 'Fuel',
            description: '1% Fuel Surcharge waiver between ₹500 to ₹3,000 per month',
            points: fuel,
            benefits: fuelBenefits
        },
        {
            icon: Train,
            title: 'Travel',
            description: 'Maximum discount upto 12% on minimum spend of ₹5,000',
            points: travel,
            benefits: travelBenefits,
            hasPlane: true
        },
        {
            icon: UtensilsCrossed,
            title: 'Dining',
            description: 'Get minimum 15% discount on selected restaurants.',
            points: diningPoints,
            benefits: diningBenefits
        },
        {
            icon: Trophy,
            title: 'Annual Fees Reversal Benefits',
            description: 'Fee reversal on spending ₹1,00,000 or more on your SimplyCLICK SBI Card in the previous year',
            points: '-',
            benefits: milestone
        }
    ]

    return (
        <div className="vc">
            <section className="vc-hero">
                <div className="vc-wrap">
                    <p className="vc-eyebrow">Value Calculator</p>
                    <h1>SBI SimplyCLICK Credit Card Value Calculator</h1>
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
                                <strong>₹{formatINR(monthlySpend * 12)}</strong>
                            </div>
                        </div>

                        <div className="vc-result" aria-live="polite">
                            <p className="vc-result-label">Your total annual benefits can be worth upto</p>
                            <p className="vc-result-total">₹{formatINR(totalBenefits)}</p>
                            <p className="vc-result-note">Here&apos;s how your spends on this Card are split below</p>

                            <div className="vc-face" style={{ '--vc-card-bg': CARD_BG } as CSSProperties} aria-hidden="true">
                                <p className="vc-face-bank">SBI CARD</p>
                                <p className="vc-face-name">SimplyCLICK</p>
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
                            {categories.map(({ icon: Icon, title, subtitle, description, points, benefits, hasPlane }) => (
                                <div key={title} className="vc-cat">
                                    <div className="vc-cat-head">
                                        <span className="vc-cat-icon"><Icon aria-hidden="true" />{hasPlane && <Plane aria-hidden="true" />}</span>
                                        <div>
                                            <h3>{title}</h3>
                                            {subtitle && <p className="vc-cat-sub">{subtitle}</p>}
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
                            Apply for SBI SimplyCLICK Card <ArrowRight aria-hidden="true" />
                        </Link>
                        <p className="vc-disclaimer">Values are estimates based on your entered spends and may vary.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
