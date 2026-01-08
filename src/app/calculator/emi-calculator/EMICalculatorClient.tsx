"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, IndianRupee, TrendingUp, Wallet } from 'lucide-react'
import { Card } from '@/components/ui'

export default function EMICalculatorClient() {
    const [loanAmount, setLoanAmount] = useState(1000000)
    const [interestRate, setInterestRate] = useState(10)
    const [tenure, setTenure] = useState(24)
    const [emi, setEmi] = useState(0)
    const [totalInterest, setTotalInterest] = useState(0)
    const [totalPayment, setTotalPayment] = useState(0)

    useEffect(() => {
        calculateEMI()
    }, [loanAmount, interestRate, tenure])

    const calculateEMI = () => {
        const principal = loanAmount
        const rate = interestRate / 12 / 100
        const time = tenure

        if (rate === 0) {
            const monthlyEmi = principal / time
            setEmi(Math.round(monthlyEmi))
            setTotalPayment(principal)
            setTotalInterest(0)
        } else {
            const monthlyEmi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1)
            const totalPay = monthlyEmi * time
            const totalInt = totalPay - principal

            setEmi(Math.round(monthlyEmi))
            setTotalPayment(Math.round(totalPay))
            setTotalInterest(Math.round(totalInt))
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Calculator className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        EMI Calculator
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Calculate your Equated Monthly Installment (EMI) for any loan.
                        Plan your finances better with our easy-to-use calculator.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Calculator Inputs */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Loan Details</h2>

                            {/* Loan Amount */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-2">
                                    <label className="font-medium text-gray-700">Loan Amount</label>
                                    <span className="text-blue-600 font-bold">{formatCurrency(loanAmount)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="50000"
                                    max="10000000"
                                    step="50000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>₹50K</span>
                                    <span>₹1 Cr</span>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-2">
                                    <label className="font-medium text-gray-700">Interest Rate (% p.a.)</label>
                                    <span className="text-blue-600 font-bold">{interestRate}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="30"
                                    step="0.5"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>5%</span>
                                    <span>30%</span>
                                </div>
                            </div>

                            {/* Tenure */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-2">
                                    <label className="font-medium text-gray-700">Loan Tenure (Months)</label>
                                    <span className="text-blue-600 font-bold">{tenure} months</span>
                                </div>
                                <input
                                    type="range"
                                    min="6"
                                    max="360"
                                    step="6"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>6 months</span>
                                    <span>30 years</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                            <h2 className="text-xl font-bold mb-6">EMI Breakdown</h2>

                            <div className="text-center mb-8">
                                <p className="text-blue-100 mb-2">Monthly EMI</p>
                                <p className="text-5xl font-bold">{formatCurrency(emi)}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <IndianRupee className="w-5 h-5" />
                                        <span className="text-blue-100 text-sm">Principal</span>
                                    </div>
                                    <p className="text-xl font-bold">{formatCurrency(loanAmount)}</p>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-5 h-5" />
                                        <span className="text-blue-100 text-sm">Total Interest</span>
                                    </div>
                                    <p className="text-xl font-bold">{formatCurrency(totalInterest)}</p>
                                </div>
                            </div>

                            <div className="mt-6 bg-white/10 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Wallet className="w-5 h-5" />
                                    <span className="text-blue-100 text-sm">Total Payment</span>
                                </div>
                                <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Principal</span>
                                    <span>Interest</span>
                                </div>
                                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white transition-all duration-500"
                                        style={{ width: `${(loanAmount / totalPayment) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Amortization Summary */}
                        <Card className="p-6 mt-6">
                            <h3 className="font-bold text-gray-900 mb-4">Quick Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total No. of EMIs</span>
                                    <span className="font-medium">{tenure}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Interest Rate</span>
                                    <span className="font-medium">{interestRate}% p.a.</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Interest Payable</span>
                                    <span className="font-medium text-red-600">{formatCurrency(totalInterest)}</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
