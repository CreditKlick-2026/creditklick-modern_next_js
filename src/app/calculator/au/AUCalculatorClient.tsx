"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Smartphone, Film, Fuel, Train, Trophy, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

// Asset path
const vettaImg = '/assets/Images/auimg/vetta.png';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function AUCalculatorClient() {
    const [spending, setSpending] = useState('')

    // Scroll to top not strictly needed in Next.js as it handles it, but keeping logic.

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
            description: '4 Reward Point for every ₹100 spent in a cycle',
            points: merchantPoints,
            benefits: merchantBenefits
        },
        {
            icon: Smartphone,
            title: 'Online',
            description: '',
            points: 0,
            benefits: 0
        },
        {
            icon: Film,
            title: 'Movie',
            description: '',
            points: 0,
            benefits: 0
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
            title: 'Train',
            description: 'Railway Lounge access - 2 per quarter',
            points: '-',
            benefits: '-'
        },
        {
            icon: Trophy,
            title: 'Quarterly Milestone Benefits',
            description: '500 Bonus Reward Points on INR 50,000 retail spends* done per calendar quarter and get additional 1,000 Bonus Reward Points on reaching INR 1 lakh retail spends* per calendar quarter.',
            points: qmilestone * 4,
            benefits: quarterlyBenefits
        },
        {
            icon: Trophy,
            title: 'Annual Milestone Benefits',
            description: 'Get INR 1,000 worth vouchers on minimum INR 2.50 lakh retail spends done in a card anniversary year. Choose your vouchers from a bouquet of top brands.',
            points: amilestone,
            benefits: annualBenefits
        }
    ]

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Top Section - Input & Results */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Left - Input Section */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <Card className="p-8 bg-gradient-to-br from-blue-200 to-blue-300 h-full">
                            <h1 className="text-xl font-bold text-blue-900 mb-4">
                                AU BANK Credit Card - Value Calculator
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
                                        className="w-full text-center text-2xl font-bold p-4 border-b-2 border-teal-500 bg-transparent focus:outline-none focus:border-teal-700"
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
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-8 bg-gradient-to-br from-gray-100 to-blue-200 h-full flex flex-col items-center justify-center">
                            <p className="text-xl text-blue-900 text-center mb-4">
                                Your total annual benefits can be worth upto
                            </p>
                            <div className="text-4xl font-bold text-blue-900 mb-6">
                                ₹{totalBenefits.toLocaleString('en-IN')}
                            </div>
                            <img
                                src={vettaImg}
                                alt="AU Bank Vetta Card"
                                className="w-3/5 shadow-lg rounded-lg mb-6"
                            />
                            <p className="text-lg text-blue-900">
                                Click here to avail this card:{' '}
                                <Link href="/credit-card/au-bank" className="text-red-700 font-bold hover:underline">
                                    Apply Now
                                </Link>
                            </p>
                        </Card>
                    </motion.div>
                </div>

                {/* Bottom Section - Breakdown */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">
                        Here's how your spends on this Card are split and how the value you earn adds up
                    </h2>

                    <Card className="p-8 bg-gradient-to-br from-gray-100 to-blue-300">
                        <div className="grid md:grid-cols-2 gap-8">
                            {categories.map((category, index) => (
                                <div key={index} className="flex gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <category.icon className="w-8 h-8 text-blue-900" />
                                            <h3 className="text-xl font-bold text-blue-900">
                                                {category.title}
                                            </h3>
                                        </div>
                                        {category.description && (
                                            <p className="text-blue-800 text-sm">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center gap-2 min-w-[100px]">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500">Points</p>
                                            <p className="text-lg font-bold text-blue-900">
                                                {category.points}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500">Benefits</p>
                                            <p className="text-lg font-bold text-green-700">
                                                {typeof category.benefits === 'number'
                                                    ? `₹${category.benefits}`
                                                    : category.benefits}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* CTA Button */}
                    <div className="text-center mt-8">
                        <Link href="/credit-card/au-bank">
                            <Button variant="gradient" size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                                Apply for AU Bank Card
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
