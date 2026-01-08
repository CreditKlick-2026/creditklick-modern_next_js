"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Percent, CheckCircle, Zap, Lock, TrendingUp, Award, BadgeCheck, Phone, Sparkles, Star, Gift } from 'lucide-react'
import Image from 'next/image'

// Import images
import GoldLoanHero from '@/assets/Images/goldloan/gold_loan_hero.png'

const features = [
    {
        icon: TrendingUp,
        title: '₹50 Lakhs',
        subtitle: 'Max Loan Amount',
        color: 'bg-blue-500',
        lightColor: 'bg-blue-50',
        textColor: 'text-blue-600'
    },
    {
        icon: Zap,
        title: '30 Min',
        subtitle: 'Quick Approval',
        color: 'bg-green-500',
        lightColor: 'bg-green-50',
        textColor: 'text-green-600'
    },
    {
        icon: Percent,
        title: '0.75%',
        subtitle: 'Per Month',
        color: 'bg-amber-500',
        lightColor: 'bg-amber-50',
        textColor: 'text-amber-600'
    },
    {
        icon: Shield,
        title: '100%',
        subtitle: 'Secure & Insured',
        color: 'bg-purple-500',
        lightColor: 'bg-purple-50',
        textColor: 'text-purple-600'
    }
]

const benefits = [
    { icon: BadgeCheck, text: 'No Income Proof' },
    { icon: Shield, text: 'No Credit Check' },
    { icon: Zap, text: 'Same Day Disbursal' },
    { icon: Gift, text: 'Doorstep Service' },
    { icon: Award, text: 'Part Prepayment' },
    { icon: Lock, text: 'Zero Foreclosure' }
]

export default function GoldLoanSection() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    return (
        <section className="py-16 bg-white relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-50 rounded-full blur-3xl opacity-60" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Compact Header */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-full text-amber-700 text-xs font-bold mb-3">
                            <Sparkles className="w-3 h-3" />
                            Powered by Creditklick
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Gold&apos;s</span> Value
                        </h2>
                        <p className="text-gray-500 max-w-md">
                            Get instant cash against your gold with lowest rates & 100% secure storage
                        </p>
                    </motion.div>

                    {/* Quick Stats - Desktop: Grid, Mobile: Auto-scrolling marquee */}
                    {/* Desktop Version */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden md:flex gap-3"
                    >
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    onHoverStart={() => setHoveredCard(index)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                    className={`relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${hoveredCard === index
                                        ? `${feature.lightColor} border-current ${feature.textColor} shadow-lg`
                                        : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                                        }`}
                                >
                                    <div className={`w-10 h-10 ${feature.color} rounded-xl flex items-center justify-center mb-2 mx-auto`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-gray-900">{feature.title}</p>
                                        <p className="text-xs text-gray-500">{feature.subtitle}</p>
                                    </div>

                                    {/* Animated ring on hover */}
                                    {hoveredCard === index && (
                                        <motion.div
                                            layoutId="hoverRing"
                                            className="absolute inset-0 border-2 border-current rounded-2xl"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Mobile Version - Auto-scrolling marquee */}
                    <div className="md:hidden w-full overflow-hidden">
                        <motion.div
                            className="flex gap-4 whitespace-nowrap"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                        >
                            {[...features, ...features].map((feature, index) => {
                                const Icon = feature.icon
                                return (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-28 p-3 rounded-xl border border-gray-100 bg-white shadow-sm"
                                    >
                                        <div className={`w-8 h-8 ${feature.color} rounded-lg flex items-center justify-center mb-2 mx-auto`}>
                                            <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-gray-900">{feature.title}</p>
                                            <p className="text-[10px] text-gray-500">{feature.subtitle}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* Main Content - Compact Layout */}
                <div className="grid lg:grid-cols-5 gap-6 items-center">
                    {/* Left - Image (smaller) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 relative"
                    >
                        <div className="relative max-w-xs mx-auto">
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image
                                    src={GoldLoanHero}
                                    alt="Gold Loan"
                                    className="w-full rounded-2xl shadow-xl"
                                />
                            </motion.div>

                            {/* Floating badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                                        <Percent className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400">Interest</p>
                                        <p className="text-sm font-bold text-gray-900">0.75%<span className="text-[10px] font-normal">/mo</span></p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Trust badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, type: "spring" }}
                                className="absolute -top-3 -left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-3 py-1.5 shadow-lg"
                            >
                                <div className="flex items-center gap-1.5">
                                    <Shield className="w-3 h-3" />
                                    <span className="text-xs font-bold">100% Insured</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right - Benefits & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        {/* Benefits Grid - Compact */}
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
                            {benefits.map((benefit, index) => {
                                const Icon = benefit.icon
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-gray-50 hover:bg-blue-50 rounded-xl p-3 text-center transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200"
                                    >
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto mb-1.5 shadow-sm group-hover:shadow group-hover:bg-blue-100 transition-all">
                                            <Icon className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <p className="text-[10px] font-medium text-gray-600 group-hover:text-blue-700 leading-tight">{benefit.text}</p>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* CTA Card - Compact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-6 relative overflow-hidden"
                        >
                            {/* Background pattern */}
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '24px 24px'
                            }} />

                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="text-center md:text-left">
                                    <div className="inline-flex items-center gap-1.5 bg-white/20 text-white/90 px-2.5 py-1 rounded-full text-[10px] font-bold mb-2">
                                        <CheckCircle className="w-3 h-3" />
                                        Instant Approval
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                                        Get Your Gold Loan Now!
                                    </h3>
                                    <p className="text-blue-100 text-sm">
                                        Apply in 2 minutes • Approval in 30 min
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link
                                            href="/loan/gold-loan"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg text-sm group"
                                        >
                                            Apply Now
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <a
                                            href="tel:+919876543210"
                                            className="inline-flex items-center gap-2 px-4 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all text-sm border border-white/30"
                                        >
                                            <Phone className="w-4 h-4" />
                                            Call
                                        </a>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Trust indicators */}
                        <div className="flex items-center justify-center md:justify-start gap-6 mt-4">
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <div className="flex -space-x-1">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center">
                                            <Star className="w-2.5 h-2.5 text-white fill-white" />
                                        </div>
                                    ))}
                                </div>
                                <span className="font-medium">4.8/5 Rating</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>50,000+ Happy Customers</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
