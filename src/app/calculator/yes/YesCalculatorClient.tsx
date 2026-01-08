"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Smartphone, Film, Fuel, UtensilsCrossed, Trophy, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

// Asset path
const premiaImg = '/assets/Images/cards/premia.png';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

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
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Top Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Left - Input Section */}
                    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                        <Card className="p-8 bg-gradient-to-br from-blue-200 to-blue-300 h-full">
                            <h1 className="text-xl font-bold text-blue-900 mb-4">
                                YES Bank Credit Card - Value Calculator
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
                            <img src={premiaImg} alt="YES Bank Premia Card" className="w-3/5 shadow-lg rounded-lg mb-6" />
                            <p className="text-lg text-blue-900">
                                Click here to avail this card:{' '}
                                <Link href="/credit-card/yes-bank" className="text-red-700 font-bold hover:underline">
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
                                            <h3 className="text-xl font-bold text-blue-900">{category.title}</h3>
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
                        <Link href="/credit-card/yes-bank">
                            <Button variant="gradient" size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                                Apply for YES Bank Card
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
