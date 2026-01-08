"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const calculators = [
    {
        id: 1,
        title: 'EMI Calculators',
        image: '/assets/Images/calci/EMIcalc.png',
        link: '/emi',
        description: 'Calculate your monthly EMI for any loan'
    },
    {
        id: 2,
        title: 'AU Value Calculator',
        image: '/assets/Images/calci/AUcalc.png',
        link: '/calculator/au',
        description: 'AU Bank credit card value calculator'
    },
    {
        id: 3,
        title: 'IDFC First Value Calculator',
        image: '/assets/Images/calci/IBcalc.png',
        link: '/calculator/idfc',
        description: 'IDFC First credit card value calculator'
    },
    {
        id: 4,
        title: 'SBI Simply Save Value Calculator',
        image: '/assets/Images/calci/SScalc.png',
        link: '/calculator/sbi-save',
        description: 'SBI Simply Save credit card calculator'
    },
    {
        id: 5,
        title: 'SBI Simply Click Value Calculator',
        image: '/assets/Images/calci/SCLcalc.png',
        link: '/calculator/sbi-click',
        description: 'SBI Simply Click credit card calculator'
    },
    {
        id: 6,
        title: 'YES Bank Value Calculator',
        image: '/assets/Images/calci/YBcalc.png',
        link: '/calculator/yes',
        description: 'Yes Bank credit card value calculator'
    }
]

export default function CalculatorsClient() {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-3xl lg:text-4xl font-bold text-blue-900 uppercase tracking-wide">
                            Finance Calculators
                        </h1>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Use our free financial calculators to calculate EMI, credit card rewards,
                            and make informed financial decisions.
                        </p>
                    </motion.div>

                    {/* Calculator Grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {calculators.map((calc) => (
                            <motion.div key={calc.id} variants={fadeInUp}>
                                <Link href={calc.link}>
                                    <Card className="bg-white hover:shadow-xl transition-all duration-300 p-6 rounded-lg h-full flex flex-col group">
                                        <div className="mb-4">
                                            <img
                                                src={calc.image}
                                                alt={calc.title}
                                                className="w-36 h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-800 uppercase mb-3">
                                            {calc.title}
                                        </h2>
                                        <p className="text-gray-500 text-sm mb-4 flex-1">
                                            {calc.description}
                                        </p>
                                        <div className="flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                                            <span>Calculate Now</span>
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <Calculator className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">
                            Why Use Our Calculators?
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Our financial calculators help you make informed decisions about loans and credit cards.
                            Calculate your EMI, understand the true value of credit card rewards, and plan your
                            finances better with accurate calculations.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="p-6">
                                <h3 className="font-semibold text-lg mb-2">Instant Results</h3>
                                <p className="text-gray-500 text-sm">Get accurate calculations in seconds</p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="font-semibold text-lg mb-2">100% Free</h3>
                                <p className="text-gray-500 text-sm">All calculators are completely free to use</p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="font-semibold text-lg mb-2">Easy to Use</h3>
                                <p className="text-gray-500 text-sm">Simple sliders and intuitive interface</p>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
