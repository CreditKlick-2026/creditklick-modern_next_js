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
        name: 'SBI SIMPLY SAVE',
        image: '/assets/Images/sbiimg/save.png',
        features: [
            'Enjoy 10X reward points on dining, grocery & movie spends',
            '2,000 bonus reward points on spends of Rs.2000 in first 60 days',
            '1% fuel surcharge waiver across all petrol pumps',
            'Annual fees reversal on spends of Rs. 1,00,000 and above',
            'Earn 1 Reward Point on every Rs. 150 that you spend'
        ]
    },
    {
        name: 'SBI SIMPLY CLICK',
        image: '/assets/Images/sbiimg/click.png',
        features: [
            'Earn 10X rewards on online spends with exclusive partners',
            'Earn 5X rewards on all other online spends',
            'E-voucher worth Rs.2,00,000 each on annual online spends of Rs.1 Lakh',
            'Annual fee reversal on annual spends of Rs.1 lakh',
            '1% fuel surcharge waiver for each transaction between Rs 500 & Rs 3000'
        ]
    },
    {
        name: 'SBI PULSE',
        image: '/assets/Images/sbiimg/pulse.png',
        features: [
            'Enjoy 1 year complimentary FITPASS PRO Membership',
            'Enjoy 10 Reward Points per Rs. 100 spent on Pharmacy, Dining and Movies',
            'Avail Fraud Liability Insurance Cover of Rs. 1 lakh',
            'Complimentary Priority Pass Membership worth US Rs.8118',
            'Fast & convenient contactless payments'
        ]
    },
    {
        name: 'SBI PRIME',
        image: '/assets/Images/sbiimg/prime.png',
        features: [
            'Welcome gift worth Rs. 3,000',
            'Get 10 Reward Points per Rs.100 spent on Dining, Groceries and Movies',
            '8 complimentary visits per year to Domestic Lounges',
            '4 complimentary visits per year to International Priority Pass Lounges',
            'E-Gift Voucher worth Rs. 7,000 on Rs. 5 Lakhs annual spends'
        ]
    },
    {
        name: 'SBI ELITE',
        image: '/assets/Images/sbiimg/elite.png',
        features: [
            'Welcome e-Gift Voucher worth Rs. 5,000',
            'Enjoy 2 complimentary Domestic Airport Lounge visits every quarter',
            'Free Movie Tickets worth Rs. 6,000 every year',
            'Earn upto 50,000 Bonus Reward Points worth Rs. 12,500/year',
            'Get a 1% fuel surcharge waiver on every transaction'
        ]
    }
]

const benefits = [
    { icon: Gift, title: 'Reward Points', desc: 'Earn points on every transaction' },
    { icon: Percent, title: 'Cashback', desc: 'Up to 10X rewards on categories' },
    { icon: Star, title: 'Welcome Bonus', desc: 'Get bonus points on joining' },
    { icon: CreditCard, title: 'Lounge Access', desc: 'Complimentary airport lounges' }
]

export default function SBIBankClient() {
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
                                <img src="/assets/Images/cards/sbim.png" alt="SBI Cards" className="rounded-xl w-48 md:max-w-xs object-cover" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-3 md:p-8"
                            >
                                <h1 className="text-xl md:text-3xl font-semibold text-indigo-900 uppercase text-center mb-3 md:mb-4">
                                    SBI CREDIT CARDS
                                </h1>
                                <p className="text-sm md:text-base text-blue-900 p-1 md:p-2 leading-relaxed">
                                    SBI Credit Cards are a great option for individuals looking for
                                    financial products that offer convenience and rewards. SBI
                                    offers a wide range of credit cards designed for diverse
                                    spending habits and lifestyles with numerous benefits.
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
