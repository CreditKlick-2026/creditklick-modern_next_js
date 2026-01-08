"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Clock, CheckCircle, TrendingUp, ChevronDown, ArrowRight,
    Shield, Zap,
    Star,
    Phone,
    Sparkles,
    MapPin,
    Coins,
    Calculator,
    ShieldCheck, Wallet, Landmark,
    BadgeCheck, Award
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
// Card is used in legacy, but mostly raw UI elements styled with Tailwind are used in the page structure. 
// However, there is: import { Button, Card } from '@/components/ui'
// It seems Card isn't explicitly used in the main JSX flow for containers other than generic divs, 
// OR it might be used inside components I didn't verify closely.
// Looking at legacy: <CreditKlickCard> uses div, <ProcessCard> uses motion.div, <BenefitCard> uses motion.div.
// <Card> is imported but search "Card" in legacy content:
// Line 11: import { Button, Card } from '@/components/ui'
// Line 102: const CreditKlickCard ... (custom component)
// Line 126: const ProcessCard ... (custom component)
// Line 82: const BenefitCard ... (custom component)
// It seems `Card` from ui is NOT used in the simplified view I saw or I missed it.
// Checking line usage... it seems it might be unused or used in parts I glanced over?
// Ah, `Card` is NOT used in the provided code snippet except the import.
// Wait, I should double check. Search "Card" in the content I read.
// "import { Button, Card } ...", "CreditKlickCard", "ProcessCard", "BenefitCard".
// No usage of `<Card ...>`. So I can ignore it or import it just in case. I will ignore it if unused.

import { IconApply, IconValuation, IconApproval, IconDisbursal } from './_components/GoldProcessIcons'

// Import images
const GoldLoanHero = '/assets/Images/goldloan/gold_loan_hero.png'

// --- Components ---

const Ticker = () => (
    <div className="bg-blue-900 text-white py-3 border-b border-blue-800 font-medium text-sm tracking-wide">
        {/* @ts-ignore */}
        <marquee behavior="scroll" direction="left" scrollamount="10">
            <div className="flex items-center gap-16 inline-flex">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-6">
                        {/* 22K Section */}
                        <span className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-amber-400" />
                            <span className="text-gray-300">GOLD RATE TODAY (22K):</span>
                            <span className="text-amber-300 font-bold">₹6,250/gm</span>
                            <span className="text-green-400 flex items-center text-[10px] bg-green-400/10 px-1 rounded">▲ +₹15</span>
                        </span>

                        <span className="text-blue-700 opacity-50">|</span>

                        {/* 24K Section */}
                        <span className="flex items-center gap-2">
                            <span className="text-gray-300">GOLD RATE TODAY (24K):</span>
                            <span className="text-amber-300 font-bold">₹6,820/gm</span>
                            <span className="text-green-400 flex items-center text-[10px] bg-green-400/10 px-1 rounded">▲ +₹18</span>
                        </span>
                    </div>
                ))}
            </div>
            {/* @ts-ignore */}
        </marquee>
    </div>
)

interface CalculatorSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    unit: string;
    onChange: (val: number) => void;
    step?: number;
}

const CalculatorSlider = ({ label, value, min, max, unit, onChange, step = 1 }: CalculatorSliderProps) => (
    <div className="mb-6">
        <div className="flex justify-between mb-2">
            <span className="text-gray-700 font-semibold text-sm">{label}</span>
            <span className="text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 min-w-[80px] text-center shadow-sm">
                {value} <span className="text-xs font-normal text-gray-500">{unit}</span>
            </span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
            <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                style={{ width: `${((value - min) / (max - min)) * 100}%` }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md pointer-events-none transition-all hover:scale-110"
                style={{ left: `${((value - min) / (max - min)) * 100}%`, transform: 'translate(-50%, -50%)' }}
            />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wider">
            <span>{min} {unit}</span>
            <span>{max} {unit}</span>
        </div>
    </div>
)

const BenefitCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="group relative bg-white rounded-2xl p-6 shadow-sm border border-blue-50 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform" />

        <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-600 transition-colors duration-300">
                <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[90%]">{desc}</p>
        </div>
    </motion.div>
)

const CreditKlickCard = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
    <div className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden ${className}`}>
        {/* Abstract Pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 opacity-10 rounded-full blur-2xl -ml-10 -mb-10" />

        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold text-xl tracking-wide w-2/3">{title}</h3>
                <Shield className="w-6 h-6 text-blue-200 opacity-80" />
            </div>
            {children}

            <div className="mt-6 flex justify-between items-end">
                <div className="text-xs text-blue-200 font-medium tracking-wider">CREDITKLICK</div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-white opacity-50" />
                    <div className="w-2 h-2 rounded-full bg-white opacity-20" />
                </div>
            </div>
        </div>
    </div>
)

const ProcessCard = ({ item, index, delay }: { item: any, index: number, delay: number }) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setActive(true), delay * 1000)
        return () => clearTimeout(timer)
    }, [delay])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative group bg-white p-4 pt-8 md:p-6 md:pt-12 rounded-2xl shadow-sm border transition-all duration-500 overflow-hidden z-10
                ${active ? 'border-amber-400 shadow-xl' : 'border-gray-200 hover:border-blue-200'}`}
        >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-amber-400 transform origin-left transition-transform duration-700 ${active ? 'scale-x-100' : 'scale-x-0'}`} />

            <div className={`w-20 h-20 md:w-28 md:h-28 mx-auto rounded-full flex items-center justify-center mb-4 md:mb-6 transition-all duration-500 z-10 relative
                ${active ? 'scale-110 bg-white border-4 border-amber-50 shadow-xl' : 'bg-gray-50 border-2 border-gray-100'}`}>

                {/* Icon rendering */}
                <div className="relative w-full h-full p-2">
                    <item.component active={active} />
                </div>

                {/* Step Number Badge */}
                <div className={`absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold border-2 border-white z-20
                    ${active ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                    {index + 1}
                </div>
            </div>

            <h3 className={`text-sm md:text-xl font-bold mb-1 md:mb-2 transition-colors duration-300 ${active ? 'text-slate-900' : 'text-gray-400'}`}>
                {item.title}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm">{item.desc}</p>
        </motion.div>
    )
}

// --- Main Page Component ---
export default function GoldLoanClient() {
    // Calculator State
    const [goldWeight, setGoldWeight] = useState(50)
    const [goldPurity, setGoldPurity] = useState(22)
    const [tenure, setTenure] = useState(12)

    const ratePerGram24k = 6800
    const ratePerGram22k = 6200
    const appliedRate = goldPurity >= 24 ? ratePerGram24k : ratePerGram22k
    const maxLTV = 0.75
    const loanAmount = Math.floor(goldWeight * appliedRate * maxLTV)
    const monthlyRate = 0.75
    const monthlyInterest = Math.floor(loanAmount * (monthlyRate / 100))
    const totalRepayment = loanAmount + (monthlyInterest * tenure)

    const [activeFaq, setActiveFaq] = useState<number | null>(null)

    return (
        <div className="bg-slate-50 min-h-screen font-sans lg:pt-4">

            <Ticker />

            {/* Hero Section */}
            <section className="relative pt-12 pb-24 overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-blue-50 to-transparent skew-x-12 opacity-50" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-blue-200 flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4" />
                                    RBI Registered Partners
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1]">
                                <span className="text-blue-600">CreditKlick</span> Gold Loan
                                <br />
                                <span className="text-4xl md:text-5xl text-gray-500 font-bold">Safe. Instant. Digital.</span>
                            </h1>

                            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                                Get funds instantly against your gold at just <span className="bg-amber-100 text-amber-800 font-bold px-1 rounded">0.75% interest</span>.
                                Secure storage, minimal paperwork, and doorstep service available.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/credit-score">
                                    <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                                        Check Eligibility
                                        <ArrowRight className="w-5 h-5 text-blue-200" />
                                    </button>
                                </Link>
                                <a href="tel:+919876543210" className="flex items-center gap-3 px-6 py-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors">
                                    <Phone className="w-5 h-5 text-blue-600" />
                                    <span className="font-bold text-slate-700">Call Support</span>
                                </a>
                            </div>

                            <div className="mt-12 flex gap-8 border-t border-slate-100 pt-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">30 Mins</p>
                                        <p className="text-xs text-slate-500">Disbursal Time</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">100% Insured</p>
                                        <p className="text-xs text-slate-500">Bank Locker Storage</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* CreditKlick Branding Cards Showcase */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="relative grid grid-cols-2 gap-4">
                                <CreditKlickCard title="Instant Valuation" className="col-span-2 transform rotate-2 hover:rotate-0 transition-transform duration-500 z-10">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-blue-100 text-sm">
                                            <span>Gold Rate (22K)</span>
                                            <span className="text-white font-bold">₹ 6,250/g</span>
                                        </div>
                                        <div className="h-1 bg-blue-500 rounded-full overflow-hidden">
                                            <div className="h-full w-3/4 bg-amber-400" />
                                        </div>
                                        <div className="flex items-center gap-2 text-white font-bold text-lg">
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                                <TrendingUp className="w-4 h-4" />
                                            </div>
                                            Highest LTV in Market
                                        </div>
                                    </div>
                                </CreditKlickCard>

                                <div className="col-span-1 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform -rotate-3 hover:rotate-0 transition-transform duration-500 mt-4 relative z-0">
                                    <div className="text-center">
                                        <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                                            <Zap className="w-6 h-6 text-green-600" />
                                        </div>
                                        <p className="font-bold text-gray-900">Super Fast</p>
                                        <p className="text-xs text-gray-500">Money in bank within 30 mins</p>
                                    </div>
                                </div>

                                <div className="col-span-1 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform rotate-6 hover:rotate-0 transition-transform duration-500 mt-8 relative z-0">
                                    <div className="text-center">
                                        <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-3">
                                            <Shield className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <p className="font-bold text-gray-900">Secure</p>
                                        <p className="text-xs text-gray-500">Free Insurance for your Gold</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-20 bg-blue-50/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100 flex flex-col lg:flex-row">
                        {/* Left Control Panel */}
                        <div className="lg:w-7/12 p-8 md:p-12">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <Calculator className="w-6 h-6 text-blue-600" />
                                Gold Loan Calculator
                            </h2>
                            <p className="text-slate-500 mb-10 text-sm">Calculate your eligible loan amount instantly based on current rates.</p>

                            <CalculatorSlider
                                label="Gold Weight (in grams)"
                                value={goldWeight}
                                min={1} max={500}
                                unit="g"
                                onChange={setGoldWeight}
                            />

                            <CalculatorSlider
                                label="Purity"
                                value={goldPurity}
                                min={18} max={24}
                                step={1}
                                unit="K"
                                onChange={(val) => setGoldPurity(val)}
                            />

                            <CalculatorSlider
                                label="Tenure (Months)"
                                value={tenure}
                                min={3} max={36}
                                unit="Mo"
                                onChange={setTenure}
                            />

                            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <p className="text-sm text-blue-800">
                                    <span className="font-bold">CreditKlick Promise:</span> We offer the highest per-gram rate in the market with 0 hidden charges.
                                </p>
                            </div>
                        </div>

                        {/* Right Result Panel */}
                        <div className="lg:w-5/12 bg-blue-600 p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-blue-700 opacity-50 skew-y-12 transform origin-bottom-right" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl" />

                            <div className="relative z-10 space-y-8">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-1">Eligible Loan Amount</p>
                                    <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                        ₹{loanAmount.toLocaleString('en-IN')}
                                    </h3>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-blue-500/50">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-blue-100">Rate per gram ({goldPurity}K)</span>
                                        <span className="font-medium">₹{appliedRate.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-blue-100">Monthly Interest (@ 0.75%)</span>
                                        <span className="font-medium text-amber-300">₹{monthlyInterest.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-blue-100">Total Repayment</span>
                                        <span className="font-medium">₹{totalRepayment.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <Link href="/credit-score" className="block">
                                    <button className="w-full py-4 bg-white text-blue-700 rounded-xl font-bold shadow-lg shadow-black/10 hover:bg-blue-50 hover:shadow-black/20 transition-all flex justify-center items-center gap-2">
                                        Apply for ₹{loanAmount.toLocaleString('en-IN')}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why CreditKlick Cards */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">Premium Benefits</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">The CreditKlick Advantage</h2>
                        <p className="text-slate-500">Designed for the modern Indian family. Security, speed, and trust in one package.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <BenefitCard
                            icon={Landmark}
                            title="Highest Per Gram Rate"
                            desc="We value your gold higher than anyone else, ensuring you get the maximum possible loan amount."
                            delay={0.1}
                        />
                        <BenefitCard
                            icon={ShieldCheck}
                            title="Trusted Bank Lockers"
                            desc="Your ornaments are stored in fire-proof, biometrically secured bank vaults. 100% free insurance included."
                            delay={0.2}
                        />
                        <BenefitCard
                            icon={Wallet}
                            title="Zero Prepayment Fee"
                            desc="Close your loan whenever you want. We charge ₹0 penalty for early foreclosure or part payments."
                            delay={0.3}
                        />
                        <BenefitCard
                            icon={MapPin}
                            title="Doorstep Service"
                            desc="Our secure van comes to your home. Valuation and money transfer happens in your living room."
                            delay={0.4}
                        />
                        <BenefitCard
                            icon={Coins}
                            title="Pay Interest Only"
                            desc="Choose to pay only interest monthly and principal at the end. Ease your monthly cash flow."
                            delay={0.5}
                        />
                        <BenefitCard
                            icon={Award}
                            title="Easy Release"
                            desc="Get your gold back instantly upon repayment. No waiting periods, no hassle."
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>

            {/* Application Process Vertical Timeline */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-3xl font-black text-slate-900 mb-20"
                    >
                        From Gold to Cash in 30 Mins
                    </motion.h2>

                    <div className="relative max-w-6xl mx-auto">
                        {/* Connecting Line Container (Desktop) */}
                        <div className="hidden md:block absolute top-[100px] left-0 w-full h-2 bg-slate-100 rounded-full -z-10">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 4, ease: "linear" }}
                                className="h-full bg-gradient-to-r from-blue-600 to-amber-500 rounded-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            {/* Process Steps Data with Animated SVGs */}
                            {[
                                {
                                    title: "Apply",
                                    desc: "Fill form or call us",
                                    component: IconApply
                                },
                                {
                                    title: "Valuation",
                                    desc: "Doorstep or Branch",
                                    component: IconValuation
                                },
                                {
                                    title: "Approval",
                                    desc: "Instant KYC Check",
                                    component: IconApproval
                                },
                                {
                                    title: "Disbursal",
                                    desc: "Cash in Account",
                                    component: IconDisbursal
                                }
                            ].map((item, idx) => {
                                // Calculate delay based on the line animation duration (4s total)
                                // Each step triggers roughly when the line reaches it
                                const stepDelay = idx * 1.0;

                                return (
                                    <ProcessCard
                                        key={idx}
                                        item={item}
                                        index={idx}
                                        delay={stepDelay}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className="mt-20">
                        <Link href="/credit-score">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl shadow-xl shadow-blue-600/30 text-lg font-bold">
                                Start Your Application
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-black text-slate-900 text-center mb-12">Common Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "What is the minimum gold purity required?", a: "We accept gold jewellery of purity 18 Karat and above. Gold coins and bars should be 24 Karat purity." },
                            { q: "How quickly will I get the money?", a: "Once your gold is valued and KYC is complete, the amount is transferred to your bank account instantly via IMPS/NEFT." },
                            { q: "Is there an application fee?", a: "No, CreditKlick does not charge any application fee. Valuation fees may apply depending on the loan amount, which will be communicated upfront." },
                            { q: "Can I release a part of my gold?", a: "Yes, you can release part of your pledged gold by paying the proportionate loan amount." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left"
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                >
                                    <span className="font-bold text-slate-800">{item.q}</span>
                                    <div className={`w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                                        <ChevronDown className="w-5 h-5 text-blue-600" />
                                    </div>
                                </button>
                                {activeFaq === idx && (
                                    <div className="p-6 pt-0 text-slate-600 border-t border-slate-100">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
