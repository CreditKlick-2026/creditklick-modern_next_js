"use client"

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, TooltipItem, LegendItem } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

// Loan Types Configuration
const loanTypes = [
    { id: 'home', name: 'Home Loan', minAmount: 100000, maxAmount: 20000000, defaultAmount: 5000000, defaultRate: 9, minTenure: 1, maxTenure: 30, defaultTenure: 20 },
    { id: 'personal', name: 'Personal Loan', minAmount: 50000, maxAmount: 5000000, defaultAmount: 500000, defaultRate: 12, minTenure: 1, maxTenure: 7, defaultTenure: 5 },
    { id: 'business', name: 'Business Loan', minAmount: 100000, maxAmount: 10000000, defaultAmount: 1000000, defaultRate: 14, minTenure: 1, maxTenure: 10, defaultTenure: 5 },
    { id: 'car', name: 'Car Loan', minAmount: 100000, maxAmount: 5000000, defaultAmount: 800000, defaultRate: 9, minTenure: 1, maxTenure: 7, defaultTenure: 5 }
]

export default function EMIClient() {
    const [activeLoanType, setActiveLoanType] = useState('home')
    const [loanAmount, setLoanAmount] = useState(5000000)
    const [interestRate, setInterestRate] = useState(9)
    const [tenureYears, setTenureYears] = useState(20)

    const currentLoanConfig = loanTypes.find(l => l.id === activeLoanType)

    // Update defaults when loan type changes
    useEffect(() => {
        if (currentLoanConfig) {
            setLoanAmount(currentLoanConfig.defaultAmount)
            setInterestRate(currentLoanConfig.defaultRate)
            setTenureYears(currentLoanConfig.defaultTenure)
        }
    }, [activeLoanType, currentLoanConfig])

    // Calculate EMI and Amortization
    const calculations = useMemo(() => {
        const principal = parseFloat(loanAmount.toString())
        const monthlyRate = parseFloat(interestRate.toString()) / 100 / 12
        const months = parseFloat(tenureYears.toString()) * 12

        if (monthlyRate === 0 || months === 0) {
            return { emi: 0, totalInterest: 0, totalAmount: 0, amortization: [], yearlyData: [] }
        }

        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1)

        const totalAmount = emi * months
        const totalInterest = totalAmount - principal

        // Generate yearly amortization schedule
        let balance = principal
        const amortization = []
        const yearlyData = []
        const currentYear = new Date().getFullYear()

        let yearPrincipal = 0
        let yearInterest = 0
        let cumulativePaid = 0

        for (let month = 1; month <= months; month++) {
            const interestPayment = balance * monthlyRate
            const principalPayment = emi - interestPayment
            balance -= principalPayment

            yearPrincipal += principalPayment
            yearInterest += interestPayment

            // At end of each year or last month
            if (month % 12 === 0 || month === months) {
                const year = currentYear + Math.ceil(month / 12) - 1
                cumulativePaid += yearPrincipal
                const percentPaid = (cumulativePaid / principal) * 100

                amortization.push({
                    year,
                    principal: Math.round(yearPrincipal),
                    interest: Math.round(yearInterest),
                    total: Math.round(yearPrincipal + yearInterest),
                    balance: Math.max(0, Math.round(balance)),
                    percentPaid: percentPaid.toFixed(2)
                })

                yearlyData.push({
                    year,
                    principal: Math.round(yearPrincipal),
                    interest: Math.round(yearInterest),
                    balance: Math.max(0, Math.round(balance))
                })

                yearPrincipal = 0
                yearInterest = 0
            }
        }

        return {
            emi: Math.round(emi),
            totalInterest: Math.round(totalInterest),
            totalAmount: Math.round(totalAmount),
            amortization,
            yearlyData
        }
    }, [loanAmount, interestRate, tenureYears])

    // Pie Chart Data
    const pieData = {
        labels: ['Principal Loan Amount', 'Total Interest'],
        datasets: [{
            data: [loanAmount, calculations.totalInterest],
            backgroundColor: ['#3B82F6', '#93C5FD'],
            borderColor: ['#2563EB', '#60A5FA'],
            borderWidth: 2,
        }],
    }

    const pieOptions: any = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: { size: 12 }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<"doughnut">) => `₹${Number(context.parsed).toLocaleString('en-IN')}`
                }
            }
        },
        cutout: '60%'
    }

    // Bar Chart Data
    const barData = {
        labels: calculations.yearlyData.map(d => d.year),
        datasets: [
            {
                label: 'Principal',
                data: calculations.yearlyData.map(d => d.principal),
                backgroundColor: '#3B82F6',
            },
            {
                label: 'Interest',
                data: calculations.yearlyData.map(d => d.interest),
                backgroundColor: '#93C5FD',
            },
            {
                label: 'Balance',
                data: calculations.yearlyData.map(d => d.balance),
                backgroundColor: '#E5E7EB',
            }
        ],
    }

    const barOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'EMI Payment / Year'
            }
        },
        scales: {
            x: { stacked: false },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: number) => '₹' + (value / 100000).toFixed(0) + 'L'
                }
            }
        }
    }

    const formatCurrency = (value: number) => '₹' + Number(value).toLocaleString('en-IN')

    // Generate tick values for sliders
    const getAmountTicks = () => {
        const max = currentLoanConfig?.maxAmount || 20000000
        const step = max / 8
        return Array.from({ length: 9 }, (_, i) => {
            const val = i * step
            if (val >= 10000000) return (val / 10000000).toFixed(1).replace('.0', '') + 'Cr'
            if (val >= 100000) return (val / 100000).toFixed(0) + 'L'
            return val
        })
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8">
                <div className="container mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            EMI Calculator
                        </h1>
                        <p className="text-blue-100">
                            Calculate your EMI For Personal Loan, Business Loan & Car Loan
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Loan Type Tabs */}
            <section className="bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center">
                        {loanTypes.map((loan) => (
                            <button
                                key={loan.id}
                                onClick={() => setActiveLoanType(loan.id)}
                                className={`px-6 py-4 font-medium transition-all border-b-2 ${activeLoanType === loan.id
                                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                                    : 'border-transparent text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                {loan.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left - Sliders */}
                        <Card className="p-6">
                            {/* Loan Amount */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-2">
                                    <label className="font-semibold text-gray-700">{currentLoanConfig?.name} Amount</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                            className="w-32 text-right font-bold text-blue-600 border rounded px-2 py-1"
                                        />
                                        <span className="text-gray-500">₹</span>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min={currentLoanConfig?.minAmount || 100000}
                                    max={currentLoanConfig?.maxAmount || 20000000}
                                    step={10000}
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    {getAmountTicks().map((tick, i) => (
                                        <span key={i}>{tick}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-2">
                                    <label className="font-semibold text-gray-700">Interest Rate</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-20 text-right font-bold text-blue-600 border rounded px-2 py-1"
                                            step="0.1"
                                        />
                                        <span className="text-gray-500">%</span>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min={5}
                                    max={20}
                                    step={0.1}
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    {[5, 7.5, 10, 12.5, 15, 17.5, 20].map((val) => (
                                        <span key={val}>{val}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Loan Tenure */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-2">
                                    <label className="font-semibold text-gray-700">Loan Tenure</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={tenureYears}
                                            onChange={(e) => setTenureYears(Number(e.target.value))}
                                            className="w-20 text-right font-bold text-blue-600 border rounded px-2 py-1"
                                        />
                                        <span className="text-gray-500">Years</span>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min={currentLoanConfig?.minTenure || 1}
                                    max={currentLoanConfig?.maxTenure || 30}
                                    step={1}
                                    value={tenureYears}
                                    onChange={(e) => setTenureYears(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    {Array.from({ length: 7 }, (_, i) => {
                                        const max = currentLoanConfig?.maxTenure || 30
                                        return Math.round((max / 6) * i)
                                    }).map((val) => (
                                        <span key={val}>{val}</span>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Right - Results & Pie Chart */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Break-up of Total Payment</h3>

                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* Pie Chart */}
                                <div className="w-64 h-64">
                                    <Doughnut data={pieData} options={pieOptions} />
                                </div>

                                {/* EMI Results */}
                                <div className="flex-1 space-y-4">
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600">Loan EMI</p>
                                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(calculations.emi)}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600">Total Interest Payable</p>
                                        <p className="text-xl font-bold text-gray-800">{formatCurrency(calculations.totalInterest)}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600">Total (Principal + Interest)</p>
                                        <p className="text-xl font-bold text-gray-800">{formatCurrency(calculations.totalAmount)}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Bar Chart */}
                    <Card className="p-6 mt-8">
                        <div className="h-80">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </Card>

                    {/* Amortization Table */}
                    <Card className="p-6 mt-8 overflow-x-auto">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Year-wise Amortization Schedule</h3>
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="bg-blue-50">
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Year</th>
                                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Principal (A)</th>
                                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Interest (B)</th>
                                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Total Payment (A+B)</th>
                                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Balance</th>
                                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Loan Paid To Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculations.amortization.map((row, index) => (
                                    <tr key={row.year} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-3 font-medium">{row.year}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(row.principal)}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(row.interest)}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(row.total)}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(row.balance)}</td>
                                        <td className="px-4 py-3 text-right">
                                            <span className="text-blue-600">{row.percentPaid}%</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>

                    {/* Apply Button */}
                    <div className="text-center mt-8">
                        <Link href="/credit-score">
                            <Button variant="gradient" size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                                Apply for {currentLoanConfig?.name}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
