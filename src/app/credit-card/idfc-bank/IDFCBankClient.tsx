"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Star, Gift, Percent, CreditCard, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const cardTypes = [
    {
        name: 'IDFC FIRST CLASSIC CARD',
        image: '/assets/Images/idfcimg/idfcclassic.png',
        features: [
            '10x Reward Points on incremental spends above ₹20,000 per month and spends done on your birthday',
            'Welcome voucher worth ₹500 on spending ₹15,000 or more within 90 days of card generation',
            '25% discount on movie tickets up to ₹100 on Paytm mobile app (valid once per month)',
            '300+ Merchant offers, all year long! | Upto 20% discount at 1500+ restaurants',
            'Free cash withdrawals on Domestic and International ATMs for upto 48 days'
        ]
    },
    {
        name: 'IDFC FIRST SELECT CARD',
        image: '/assets/Images/idfcimg/idfcselect.png',
        features: [
            'Unlimited Reward points that never expires',
            '5% cashback (upto ₹1,000) on the transaction value of first EMI done within 90 days of card generation',
            '4 complimentary Railway lounge visits per quarter',
            'Personal Accident Cover of ₹2,00,000* and Lost Card Liability Cover of ₹25,000',
            '6x & 3x Reward points on online/offline purchases respectively for spends upto ₹20,000/month',
            'Lower Interest rates starting at 9% per annum i.e. 0.75% per month'
        ]
    },
    {
        name: 'IDFC FIRST WEALTH CARD',
        image: '/assets/Images/idfcimg/idfcwealth.png',
        features: [
            '10x Reward points on incremental spends above ₹30,000 per month and spends done on your birthday',
            'Get access to International and Domestic Airport lounges and spas',
            "'Buy one, get one' offer on movie tickets upto ₹500 on Paytm mobile app (valid twice per month)",
            'Complimentary Roadside Assistance worth ₹1,399 and Accident Cover of ₹10,00,000*',
            '5% cashback (up to ₹1000) on the transaction value of first EMI done within 90 days of card generation'
        ]
    },
    {
        name: 'IDFC FIRST MILLENNIA CARD',
        image: '/assets/Images/idfcimg/idfcmillenia.png',
        features: [
            '6X & 3X Reward Points on online & offline purchases respectively for spends up to ₹20,000 per month',
            '5% cashback (up to ₹1000) on the transaction value of first EMI done within 90 days of card generation',
            '4 complimentary Railway lounge visits per quarter',
            'Personal Accident Cover of ₹2,00,000* and Lost Card Liability Cover of ₹25,000',
            '100% cashback on available purchase items',
            'Lower Interest rates starting at 9% per annum i.e. 0.75% per month'
        ]
    }
]

const benefits = [
    { icon: Zap, title: 'Never Expiring Rewards', desc: 'Your reward points never expire' },
    { icon: Percent, title: 'Low Interest Rate', desc: 'One of the lowest interest rates' },
    { icon: Star, title: 'No Hidden Fees', desc: 'Transparent fee structure' },
    { icon: CreditCard, title: 'Instant Approval', desc: 'Get approved in minutes' }
]

export default function IDFCBankClient() {
    return (
        <div className="pt-4 md:pt-8">
            {/* Hero */}
            <section className="container mx-auto py-4 md:py-8 px-3 md:px-4">
                <div className="bg-blue-100 rounded-2xl md:rounded-3xl shadow-lg">
                    <div className="bg-gradient-to-l from-gray-300 rounded-2xl md:rounded-3xl border border-gray-100 p-3 md:p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-center p-2 md:p-5"
                            >
                                <img src="/assets/Images/cards/idfcm.png" alt="IDFC FIRST Cards" className="rounded-xl w-48 md:max-w-xs object-cover" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-3 md:p-8"
                            >
                                <h1 className="text-xl md:text-3xl font-semibold text-indigo-900 uppercase text-center mb-3 md:mb-4">
                                    IDFC BANK CREDIT CARDS
                                </h1>
                                <p className="text-sm md:text-base text-blue-900 p-1 md:p-2 leading-relaxed">
                                    IDFC FIRST Bank offers a range of credit cards designed to cater
                                    to the diverse needs and requirements of their customers. They
                                    have four credit cards across various categories, including
                                    lifestyle and rewards. One of the primary features is their
                                    extensive rewards points program.
                                </p>
                                <div className="mt-4 md:mt-6 text-center md:text-left">
                                    <Link href="/credit-score">
                                        <Button size="lg" className="w-full md:w-auto">
                                            Apply Now
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-8 md:py-16">
                <div className="container mx-auto px-3 md:px-4">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
                    >
                        {benefits.map((benefit, index) => (
                            <motion.div key={benefit.title} variants={fadeInUp}>
                                <Card className="text-center p-3 md:p-6 h-full">
                                    <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-100 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-4">
                                        <benefit.icon className="h-5 w-5 md:h-7 md:w-7 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-xs md:text-base mb-1 md:mb-2">{benefit.title}</h3>
                                    <p className="text-[10px] md:text-sm text-gray-600">{benefit.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Card Types */}
            <section className="py-8 md:py-16 bg-gray-50">
                <div className="container mx-auto px-3 md:px-4">
                    <motion.h2
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-12"
                    >
                        Choose Your Card
                    </motion.h2>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                    >
                        {cardTypes.map((card, index) => (
                            <motion.div key={card.name} variants={fadeInUp}>
                                <Card className="p-3 md:p-4 h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                                    {/* Card Image */}
                                    <div className="flex justify-center mb-3 md:mb-4">
                                        <img
                                            src={card.image}
                                            alt={card.name}
                                            className="h-auto w-full max-w-[200px] md:max-w-xs rounded-lg shadow-lg object-cover"
                                        />
                                    </div>

                                    {/* Card Name */}
                                    <h3 className="text-base md:text-xl font-bold text-teal-700 uppercase tracking-wide mb-2 md:mb-3">
                                        {card.name}
                                    </h3>

                                    {/* Features List - All features shown */}
                                    <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4 flex-1">
                                        {card.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 p-0.5 md:p-1">
                                                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 mt-auto">
                                        <Link href="/credit-score" className="flex-1">
                                            <Button variant="gradient" className="w-full text-xs md:text-sm py-2 md:py-2.5">
                                                Apply Now
                                            </Button>
                                        </Link>
                                        <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs md:text-sm px-2 md:px-4">
                                            More
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-8 md:py-12 bg-white">
                <div className="container mx-auto px-3 md:px-4">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4"
                    >
                        {[
                            { icon: '/assets/heroimages/credscore2.webp', label: 'CREDIT SCORE', path: '/credit-score' },
                            { icon: '/assets/heroimages/ccgifw.webp', label: 'CARDS', path: '/credit-cards' },
                            { icon: '/assets/heroimages/persloan2.webp', label: 'PERSONAL LOANS', path: '/loan/personal-loan' },
                            { icon: '/assets/heroimages/busiloan2.webp', label: 'BUSINESS LOAN', path: '/loan/business-loan' },
                            { icon: '/assets/heroimages/refine2.webp', label: 'CREDIT REFINE', path: '/refine' },
                            { icon: '/assets/heroimages/calc2.webp', label: 'CALCULATORS', path: '/calculators' }
                        ].map((product, index) => (
                            <motion.div key={product.label} variants={fadeInUp}>
                                <Link href={product.path}>
                                    <Card className="p-2 md:p-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                                        <img
                                            src={product.icon}
                                            alt={product.label}
                                            className="w-8 h-8 md:w-14 md:h-14 mx-auto mb-1 md:mb-3 object-contain hover:scale-110 transition-transform duration-300"
                                        />
                                        <p className="text-[8px] md:text-sm font-semibold text-gray-700 tracking-wide leading-tight">
                                            {product.label}
                                        </p>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
