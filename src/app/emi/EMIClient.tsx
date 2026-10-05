"use client"

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, TooltipItem, LegendItem } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import './emi.css'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

// Brand palette shared by both charts
const COLORS = {
    principal: '#2563eb',
    principalBorder: '#1d4ed8',
    interest: '#dbe8fd',
    interestBorder: '#93c5fd',
    balance: '#1c398e',
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
            backgroundColor: [COLORS.principal, COLORS.interest],
            borderColor: [COLORS.principalBorder, COLORS.interestBorder],
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
                backgroundColor: COLORS.principal,
                borderRadius: 4,
            },
            {
                label: 'Interest',
                data: calculations.yearlyData.map(d => d.interest),
                backgroundColor: COLORS.interest,
                borderColor: COLORS.interestBorder,
                borderWidth: 1,
                borderRadius: 4,
            },
            {
                label: 'Balance',
                data: calculations.yearlyData.map(d => d.balance),
                backgroundColor: COLORS.balance,
                borderRadius: 4,
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
                text: 'EMI Payment / Year',
                color: '#1c398e',
                font: { size: 15, weight: '700' }
            }
        },
        scales: {
            x: { stacked: false, grid: { display: false } },
            y: {
                beginAtZero: true,
                grid: { color: '#eef2f8' },
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
        <div className="emi">
            {/* Hero */}
            <section className="emi-hero">
                <div className="emi-wrap">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="emi-eyebrow">Free tool</span>
                        <h1 className="emi-title">EMI Calculator</h1>
                        <p className="emi-lead">
                            Calculate your EMI for Home Loan, Personal Loan, Business Loan &amp; Car Loan
                        </p>
                    </motion.div>

                    {/* Loan Type Tabs */}
                    <div className="emi-tabs" role="tablist">
                        {loanTypes.map((loan) => (
                            <button
                                key={loan.id}
                                type="button"
                                role="tab"
                                aria-selected={activeLoanType === loan.id}
                                onClick={() => setActiveLoanType(loan.id)}
                                className={`emi-tab ${activeLoanType === loan.id ? 'is-active' : ''}`}
                            >
                                {loan.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="emi-main">
                <div className="emi-wrap">
                    <div className="emi-grid">
                        {/* Left - Sliders */}
                        <div className="emi-card">
                            {/* Loan Amount */}
                            <div className="emi-field">
                                <div className="emi-field-head">
                                    <label htmlFor="emi-amount">{currentLoanConfig?.name} Amount</label>
                                    <div className="emi-input">
                                        <span>₹</span>
                                        <input
                                            id="emi-amount"
                                            type="number"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    aria-label="Loan amount"
                                    min={currentLoanConfig?.minAmount || 100000}
                                    max={currentLoanConfig?.maxAmount || 20000000}
                                    step={10000}
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="emi-range"
                                />
                                <div className="emi-ticks">
                                    {getAmountTicks().map((tick, i) => (
                                        <span key={i}>{tick}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div className="emi-field">
                                <div className="emi-field-head">
                                    <label htmlFor="emi-rate">Interest Rate</label>
                                    <div className="emi-input">
                                        <input
                                            id="emi-rate"
                                            type="number"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="is-short"
                                            step="0.1"
                                        />
                                        <span>%</span>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    aria-label="Interest rate"
                                    min={5}
                                    max={20}
                                    step={0.1}
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="emi-range"
                                />
                                <div className="emi-ticks">
                                    {[5, 7.5, 10, 12.5, 15, 17.5, 20].map((val) => (
                                        <span key={val}>{val}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Loan Tenure */}
                            <div className="emi-field">
                                <div className="emi-field-head">
                                    <label htmlFor="emi-tenure">Loan Tenure</label>
                                    <div className="emi-input">
                                        <input
                                            id="emi-tenure"
                                            type="number"
                                            value={tenureYears}
                                            onChange={(e) => setTenureYears(Number(e.target.value))}
                                            className="is-short"
                                        />
                                        <span>Years</span>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    aria-label="Loan tenure"
                                    min={currentLoanConfig?.minTenure || 1}
                                    max={currentLoanConfig?.maxTenure || 30}
                                    step={1}
                                    value={tenureYears}
                                    onChange={(e) => setTenureYears(Number(e.target.value))}
                                    className="emi-range"
                                />
                                <div className="emi-ticks">
                                    {Array.from({ length: 7 }, (_, i) => {
                                        const max = currentLoanConfig?.maxTenure || 30
                                        return Math.round((max / 6) * i)
                                    }).map((val) => (
                                        <span key={val}>{val}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right - Results & Pie Chart */}
                        <div className="emi-card">
                            <h3 className="emi-card-title">Break-up of Total Payment</h3>

                            <div className="emi-breakup">
                                <div className="emi-donut">
                                    <Doughnut data={pieData} options={pieOptions} />
                                </div>

                                <div className="emi-stats">
                                    <div className="emi-stat emi-stat--main">
                                        <p className="emi-stat-label">Loan EMI</p>
                                        <p className="emi-stat-value">{formatCurrency(calculations.emi)}</p>
                                    </div>
                                    <div className="emi-stat">
                                        <p className="emi-stat-label">Total Interest Payable</p>
                                        <p className="emi-stat-value">{formatCurrency(calculations.totalInterest)}</p>
                                    </div>
                                    <div className="emi-stat">
                                        <p className="emi-stat-label">Total (Principal + Interest)</p>
                                        <p className="emi-stat-value">{formatCurrency(calculations.totalAmount)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="emi-card emi-card--spaced">
                        <div className="emi-chart">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>

                    {/* Amortization Table */}
                    <div className="emi-card emi-card--spaced">
                        <h3 className="emi-card-title">Year-wise Amortization Schedule</h3>
                        <div className="emi-table-wrap">
                            <table className="emi-table">
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>Principal (A)</th>
                                        <th>Interest (B)</th>
                                        <th>Total Payment (A+B)</th>
                                        <th>Balance</th>
                                        <th>Loan Paid To Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calculations.amortization.map((row) => (
                                        <tr key={row.year}>
                                            <td>{row.year}</td>
                                            <td>{formatCurrency(row.principal)}</td>
                                            <td>{formatCurrency(row.interest)}</td>
                                            <td>{formatCurrency(row.total)}</td>
                                            <td>{formatCurrency(row.balance)}</td>
                                            <td><span className="emi-paid">{row.percentPaid}%</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="emi-cta">
                        <Link href="/credit-score">
                            Apply for {currentLoanConfig?.name}
                            <ArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
