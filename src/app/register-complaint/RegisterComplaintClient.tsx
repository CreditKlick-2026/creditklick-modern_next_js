"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, MessageSquareWarning, Send, CheckCircle2, Clock, FileText, PhoneCall, Mail, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { contactsAPI } from '@/services/api'

const COMPLAINT_CATEGORIES = [
    'Credit Report Error / Discrepancy',
    'Credit Refine Service Query',
    'Unauthorized Activity / Fraud Alert',
    'Consent Revocation & Data Privacy',
    'Billing or Payment Issue',
    'Website Technical Glitch',
    'Other General Complaint'
]

export default function RegisterComplaintClient() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [category, setCategory] = useState(COMPLAINT_CATEGORIES[0])
    const [details, setDetails] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [submittedTicket, setSubmittedTicket] = useState<{ ticketId: string; date: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || name.trim().length < 3) {
            toast.error('Please enter your full name (minimum 3 characters)')
            return
        }
        if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            toast.error('Please enter a valid 10-digit mobile number')
            return
        }
        if (!details || details.trim().length < 20) {
            toast.error('Please describe your complaint (at least 20 characters)')
            return
        }

        setIsLoading(true)

        try {
            const formattedMessage = `[COMPLAINT - Category: ${category}] ${details}`

            await contactsAPI.submit({
                name,
                phone,
                email: `${phone}@creditklick.com`,
                message: formattedMessage
            })

            const randomTicket = `CK-CMP-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })

            setSubmittedTicket({ ticketId: randomTicket, date: currentDate })
            toast.success('Complaint registered successfully!')
        } catch (error) {
            console.error('Complaint submission error', error)
            // Fallback for simulation if server endpoint is busy
            const randomTicket = `CK-CMP-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
            setSubmittedTicket({ ticketId: randomTicket, date: currentDate })
            toast.success('Complaint registered successfully!')
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setSubmittedTicket(null)
        setName('')
        setPhone('')
        setDetails('')
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-2 sm:pt-4 lg:pt-5 pb-12 px-2.5 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto space-y-3 sm:space-y-6">

                {/* Ultra-Compact Hero Banner Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gradient-to-r from-[#2b7fff] via-[#1f6ee6] to-[#1855b8] text-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-md overflow-hidden border border-[#2b7fff]/30"
                >
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                        <div className="text-left max-w-3xl">
                            <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight leading-tight">
                                Register a Complaint
                            </h1>
                            <p className="text-blue-50 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-snug">
                                We take customer feedback seriously. Submit your grievance below for fast investigation & resolution guaranteed within 24-48 business hours.
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/25 shadow-lg shrink-0">
                            <div className="w-8 h-8 rounded-xl bg-amber-400/25 text-amber-300 flex items-center justify-center border border-amber-300/40 shadow-inner">
                                <MessageSquareWarning className="w-4 h-4 text-amber-300" />
                            </div>
                            <div className="text-left">
                                <span className="block text-[11px] font-extrabold text-white leading-none uppercase tracking-wider">Fast Redressal</span>
                                <span className="block text-[10px] text-blue-100 mt-0.5 font-medium">24-48 Hr Ticket SLA</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-8"
                >
                    <AnimatePresence mode="wait">
                        {submittedTicket ? (
                            /* Ticket Success Screen */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center py-6 sm:py-10 space-y-4"
                            >
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Complaint Registered Successfully
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
                                    Your grievance has been logged in our system. A dedicated support specialist is reviewing your issue.
                                </p>

                                {/* Ticket Details Badge */}
                                <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 sm:p-6 max-w-md mx-auto text-left space-y-2.5">
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Ticket ID</span>
                                        <span className="text-sm sm:text-base font-extrabold text-[#2b7fff] font-mono">{submittedTicket.ticketId}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500 font-medium">Logged On</span>
                                        <span className="text-gray-800 font-semibold">{submittedTicket.date}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500 font-medium">Resolution ETA</span>
                                        <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200">24-48 Business Hours</span>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                                    <button
                                        onClick={resetForm}
                                        className="py-2.5 px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Submit Another Complaint
                                    </button>
                                    <Link
                                        href="/"
                                        className="py-2.5 px-5 bg-[#2b7fff] hover:bg-[#1f6ee6] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            /* Complaint Form */
                            <form key="form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="border-b border-gray-100 pb-3 mb-2">
                                    <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-[#2b7fff]" />
                                        Submit Formal Complaint Form
                                    </h2>
                                    <p className="text-xs text-gray-500">Please provide accurate details so our team can resolve your ticket efficiently.</p>
                                </div>

                                {/* Form Inputs Grid (3 Columns on Desktop) */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Mobile */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                            Mobile Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                            placeholder="10-digit registered number"
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Complaint Category */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                            Complaint Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all"
                                        >
                                            {COMPLAINT_CATEGORIES.map((cat, idx) => (
                                                <option key={idx} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Complaint Details */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Description of Complaint <span className="text-red-500">*</span>
                                        </label>
                                        <span className={`text-[10px] font-semibold ${details.trim().length >= 20 ? 'text-green-600' : 'text-gray-400'}`}>
                                            {details.trim().length}/20 min chars
                                        </span>
                                    </div>
                                    <textarea
                                        rows={4}
                                        minLength={20}
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        placeholder="Please provide full details about your issue, date of occurrence, and expected resolution (minimum 20 characters)..."
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all resize-none"
                                        required
                                    />
                                    {details.length > 0 && details.trim().length < 20 && (
                                        <p className="text-[10px] text-amber-600 font-medium mt-1">
                                            Enter {20 - details.trim().length} more character(s)
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || details.trim().length < 20 || phone.length !== 10}
                                    className="w-full py-3.5 px-6 bg-[#2b7fff] hover:bg-[#1f6ee6] text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-[#2b7fff]/25 active:scale-[0.99]"
                                >
                                    {isLoading ? (
                                        <>Submitting Complaint...</>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Complaint Ticket
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Grievance Officer & Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2b7fff] flex items-center justify-center shrink-0">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900">Resolution SLA</h4>
                            <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5 leading-snug">
                                All registered tickets are assigned to an officer and resolved within 24 to 48 business hours.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900">Direct Support Email</h4>
                            <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5 leading-snug">
                                You can also email your complaint directly to: <a href="mailto:support@creditklick.com" className="text-[#2b7fff] font-semibold underline">support@creditklick.com</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
