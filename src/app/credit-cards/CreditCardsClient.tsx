"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button, Card } from '@/components/ui'

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

interface CreditCard {
    name: string
    image: string
    href: string
}

interface CreditTableItem {
    card: string
    category: string
}

interface FeesChargesItem {
    rate: string
    charge: string
}

interface CreditCardsClientProps {
    creditCards: CreditCard[]
    creditTable: CreditTableItem[]
    feesCharges: FeesChargesItem[]
}

export default function CreditCardsClient({ creditCards, creditTable, feesCharges }: CreditCardsClientProps) {
    return (
        <div>
            {/* Hero */}
            <section className="bg-gray-100 py-6">
                <div className="container-custom">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-semibold text-blue-900 text-center uppercase"
                    >
                        Credit Card
                    </motion.h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-900 uppercase">
                                Compare & Apply Credit Cards Online
                            </h2>
                            <p className="text-blue-900">
                                At CreditKlick, you can search applications online for credit cards and choose the perfect one.
                                By your eligibility, you can review pre-approved offers from top companies like YES Bank,
                                IDFC Bank, AU Bank as well as others. You can also get immediate approval.
                            </p>
                            <p className="text-blue-900">
                                Credit cards provide benefits in many categories, including fuel, shopping, and travel,
                                with the help of rewards points, cashback and discounts. We&apos;ve covered essential details
                                on credit card options on this webpage, you can also compare different benefits by various cards.
                            </p>
                            <Link href="/credit-score">
                                <Button variant="gradient" size="lg" className="group">
                                    Apply Now
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex justify-center"
                        >
                            <div className="relative w-full max-w-lg aspect-square">
                                <Image
                                    src="/assets/HeroImages/ccgifw.webp"
                                    alt="Credit Cards Animation"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Credit Card Options */}
            <section className="py-16 bg-gray-100">
                <div className="container-custom">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {creditCards.map((card) => (
                            <motion.div key={card.name} variants={fadeInUp}>
                                <Link href={card.href}>
                                    <Card className="text-center p-6 h-full hover:border-blue-500 hover:shadow-xl transition-all group">
                                        <div className="relative h-40 w-full mb-6 group-hover:scale-105 transition-transform">
                                            <Image
                                                src={card.image}
                                                alt={card.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <h3 className="text-lg font-bold text-blue-900 mb-4 uppercase">{card.name}</h3>
                                        <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
                                            Check Now
                                        </Button>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Credit Card Table */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-semibold text-blue-900 mb-8 text-center">
                            Available Credit Cards
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-blue-100">
                                        <th className="px-6 py-4 text-left font-semibold text-blue-900">Credit Card</th>
                                        <th className="px-6 py-4 text-left font-semibold text-blue-900">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {creditTable.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="px-6 py-4">{item.card}</td>
                                            <td className="px-6 py-4">{item.category}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="text-center mt-8">
                            <Link href="/credit-score">
                                <Button variant="gradient">
                                    Apply for Credit Card
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Fees & Charges */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-semibold text-teal-800 mb-8">
                            Interest Rates and Charges
                        </h2>
                        <div className="space-y-6">
                            {feesCharges.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow">
                                    <h3 className="font-semibold text-gray-800 uppercase mb-2">{item.rate}</h3>
                                    <p className="text-gray-600">{item.charge}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
