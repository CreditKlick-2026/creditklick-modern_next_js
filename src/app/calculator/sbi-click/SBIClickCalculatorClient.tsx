"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Smartphone, Fuel, Train, Plane, UtensilsCrossed, Trophy, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

// Asset path
const clickImg = '/assets/sbiimg/click.png';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

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
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Top Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Left - Input Section */}
                    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                        <Card className="p-8 bg-gradient-to-br from-blue-200 to-blue-300 h-full">
                            <h1 className="text-xl font-bold text-blue-900 mb-4">
                                SimplyCLICK Credit Card - Value Calculator
                            </h1>
                            <p className="text-blue-800 mb-8">
                                Know the potential of your Card - Enter your estimated spends below:
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-lg font-medium text-blue-900 block text-center mb-2">
                                        My Monthly Spends
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter monthly spending"
                                        value={spending}
                                        onChange={handleChange}
                                        className="w-full text-center text-2xl font-bold p-4 border-b-2 border-teal-500 bg-transparent focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-lg font-medium text-blue-900 block text-center mb-2">
                                        My Annual Spends
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={monthlySpend * 12 || ''}
                                        placeholder="Annual spending"
                                        className="w-full text-center text-2xl font-bold p-4 border-b-2 border-teal-500 bg-transparent focus:outline-none"
                                    />
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Right - Results Section */}
                    <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                        <Card className="p-8 bg-gradient-to-br from-gray-100 to-blue-200 h-full flex flex-col items-center justify-center">
                            <p className="text-xl text-blue-900 text-center mb-4">
                                Your total annual benefits can be worth upto
                            </p>
                            <div className="text-4xl font-bold text-blue-900 mb-6">
                                ₹{totalBenefits.toLocaleString('en-IN')}
                            </div>
                            <img src={clickImg} alt="SBI SimplyCLICK Card" className="w-3/5 shadow-lg rounded-lg mb-6" />
                            <p className="text-lg text-blue-900">
                                Click here to avail this card:{' '}
                                <Link href="/credit-card/sbi-bank" className="text-red-700 font-bold hover:underline">
                                    Apply Now
                                </Link>
                            </p>
                            <p className="text-blue-800 text-sm mt-4 text-center">
                                Here's how your spends on this Card are split and how the value you earn adds up
                            </p>
                        </Card>
                    </motion.div>
                </div>

                {/* Bottom Section - Breakdown */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <Card className="p-8 bg-gradient-to-br from-gray-100 to-blue-300">
                        <div className="grid md:grid-cols-2 gap-8">
                            {categories.map((category, index) => (
                                <div key={index} className="flex gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <category.icon className="w-8 h-8 text-blue-900" />
                                            {category.hasPlane && <Plane className="w-8 h-8 text-blue-900" />}
                                            <div>
                                                <h3 className="text-xl font-bold text-blue-900">{category.title}</h3>
                                                {category.subtitle && (
                                                    <p className="text-sm text-blue-700">{category.subtitle}</p>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-blue-800 text-sm">{category.description}</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 min-w-[100px]">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500">Points</p>
                                            <p className="text-lg font-bold text-blue-900">{category.points}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500">Benefits</p>
                                            <p className="text-lg font-bold text-green-700">₹{category.benefits}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="text-center mt-8">
                        <Link href="/credit-card/sbi-bank">
                            <Button variant="gradient" size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                                Apply for SBI SimplyCLICK Card
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
