"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Star, Gift, Percent, CreditCard } from 'lucide-react'
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
        name: 'ALTURA',
        image: '/assets/auimg/alt.png',
        features: [
            'Save Big. Upto 7% Cashback as an introductory offer',
            'Attractive Monthly Milestone Benefits',
            'Complimentary Railway Lounge access',
            'Complimentary Lost Card Liability cover',
            '₹ 2,000+ Yearly Benefits on just ₹ 10,000 monthly spends!'
        ]
    },
    {
        name: 'ALTURA PLUS',
        image: '/assets/auimg/plus.png',
        features: [
            'Double the Delight. Earn both Cashback & Reward Points.',
            'Attractive Welcome Benefit & Monthly Milestone Benefits',
            'Complimentary Railway Lounge access',
            'Complimentary Lost Card Liability cover',
            '₹ 25,000+ Yearly Benefits on just ₹ 35,000 monthly spends!'
        ]
    },
    {
        name: 'LIT CREDIT CARD',
        image: '/assets/auimg/lit.png',
        features: [
            'Get 5% cashback on grocery and travel spends',
            'Get additional 2%-5% cashback on all spends',
            'Fly comfortably with domestic airport lounge access',
            'Enjoy exciting memberships',
            'Get 5X-10X rewards on online and offline spends'
        ]
    },
    {
        name: 'ZENITH AU CREDIT CARD',
        image: '/assets/auimg/zenth.png',
        features: [
            '10,000 Bonus Reward Points on completing retail spends* worth INR 1 Lakh',
            'Complimentary Epicure Membership on minimum of INR 8 lakh retail spends in a card anniversary year.',
            'For 1st year fee waiver : INR 1,25,000 retail spends done within 90 days of card set up.',
            'For 2nd year onwards fee waiver : INR 5,00,000 retail spends done in previous card anniversary year.',
            'INR 1,000 vouchers on minimum INR 2 lakh retail spends done per calendar quarter.'
        ]
    },
    {
        name: 'VETTA AU CREDIT CARD',
        image: '/assets/auimg/vetta.png',
        features: [
            'Vouchers worth INR 2000 on minimum INR 30,000 retail spends done within 60 days of card setup.',
            'Earn up to 1,500 Bonus Reward Points in every calendar quarter with INR 1 lakh retail spends*.',
            '1% Fuel Surcharge Waiver for fuel transactions done between INR 400 and INR 5,000, across all fuel stations in the country',
            'Annual Card Membership fee Rs. 2,999 + applicable taxes',
            '4 Reward Points per INR 100 retail spends* done on Grocery & Departmental store and Utility bill payments.',
            '2 Reward Points per INR 100 retail spends* done across all other merchant categories.'
        ]
    }
]

const benefits = [
    { icon: Gift, title: 'Reward Points', desc: 'Earn points on every transaction' },
    { icon: Percent, title: 'Cashback', desc: 'Up to 5% cashback on categories' },
    { icon: Star, title: 'Welcome Bonus', desc: 'Get bonus points on joining' },
    { icon: CreditCard, title: 'Easy EMI', desc: 'Convert purchases to easy EMIs' }
]

export default function AUBankClient() {
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
                                className="flex justify-center p-2 md:p-5 order-1 md:order-1"
                            >
                                <img src="/assets/cards/aum.png" alt="AU Bank Cards" className="rounded-xl w-48 md:max-w-xs object-cover" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-3 md:p-8 order-2 md:order-2"
                            >
                                <h1 className="text-xl md:text-3xl font-semibold text-indigo-900 uppercase text-center mb-3 md:mb-4">
                                    AU BANK CREDIT CARDS
                                </h1>
                                <p className="text-sm md:text-base text-blue-900 p-1 md:p-2 leading-relaxed">
                                    AU Bank Credit Cards are designed to cater to the diverse
                                    spending habits and lifestyles of customers. With a range of
                                    credit cards to choose from, you can select the one that best
                                    suits your financial needs. AU Bank Credit Cards offer benefits
                                    such as rewards on dining, travel, and entertainment expenses,
                                    airport lounge access, travel insurance, and concierge services.
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
                                    <div className="flex justify-center mb-3 md:mb-4">
                                        <img
                                            src={card.image}
                                            alt={card.name}
                                            className="h-auto w-full max-w-[200px] md:max-w-xs rounded-lg shadow-lg object-cover"
                                        />
                                    </div>

                                    <h3 className="text-base md:text-xl font-bold text-teal-700 uppercase tracking-wide mb-2 md:mb-3">
                                        {card.name}
                                    </h3>

                                    <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4 flex-1">
                                        {card.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 p-0.5 md:p-1">
                                                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

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

            {/* How to Apply */}
            <section className="py-8 md:py-16">
                <div className="container mx-auto px-3 md:px-4 max-w-4xl">
                    <motion.h2
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-12"
                    >
                        How to Apply
                    </motion.h2>

                    <div className="space-y-4 md:space-y-6">
                        {[
                            { step: 1, title: 'Check Eligibility', desc: 'Enter your details to check if you\'re eligible for AU Bank credit cards' },
                            { step: 2, title: 'Choose Your Card', desc: 'Compare different cards and select the one that suits your needs' },
                            { step: 3, title: 'Submit Application', desc: 'Fill in the application form with required documents' },
                            { step: 4, title: 'Get Approved', desc: 'Receive instant approval and get your card delivered' }
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex gap-3 md:gap-6 items-start"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm md:text-base">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg mb-0.5 md:mb-1">{item.title}</h3>
                                    <p className="text-sm md:text-base text-gray-600">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mt-8 md:mt-12"
                    >
                        <Link href="/credit-score">
                            <Button variant="gradient" size="lg" className="w-full md:w-auto">
                                Apply for AU Bank Card
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
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
