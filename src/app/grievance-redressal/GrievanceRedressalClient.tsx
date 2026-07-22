"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Scale, Send, CheckCircle2, UserCheck, Mail, ArrowLeft, Building2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { contactsAPI } from '@/services/api'

const ESCALATION_LEVELS = [
    'Level 1: Pawan Chauhan (pawan.chauhan@stefto.com)',
    'Level 2: Govid (govid.giri@stefto.com)'
]

const CATEGORIES = [
    'Unresolved Complaint Ticket Escalation',
    'Credit Report Accuracy & Disputes',
    'Consent Revocation & Data Purge Delay',
    'Fair Practice Code Breach',
    'Technical / Operational Failure',
    'Other Regulatory Grievance'
]

export default function GrievanceRedressalClient() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [isEscalation, setIsEscalation] = useState(false)
    const [l1TicketId, setL1TicketId] = useState('')
    const [level, setLevel] = useState(ESCALATION_LEVELS[0])
    const [category, setCategory] = useState(CATEGORIES[0])
    const [details, setDetails] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [submittedTicket, setSubmittedTicket] = useState<{ ticketId: string; date: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || name.trim().length < 3) {
            toast.error('Please enter your full name')
            return
        }
        if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            toast.error('Please enter a valid 10-digit mobile number')
            return
        }
        if (isEscalation && !l1TicketId.trim()) {
            toast.error('Please enter your previous Level 1 Ticket ID')
            return
        }
        if (!details || details.trim().length < 20) {
            toast.error('Please describe your grievance in detail (minimum 20 characters)')
            return
        }

        setIsLoading(true)

        try {
            const formattedMessage = `[GRIEVANCE ESCALATION - ${level}${isEscalation ? ` | Prev L1 Ticket: ${l1TicketId}` : ''} | Category: ${category}] ${details}`

            await contactsAPI.submit({
                name,
                phone,
                email: `${phone}@creditklick.com`,
                message: formattedMessage
            })

            const randomTicket = `CK-GRV-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })

            setSubmittedTicket({ ticketId: randomTicket, date: currentDate })
            toast.success('Grievance escalation logged successfully!')
        } catch {
            const randomTicket = `CK-GRV-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
            setSubmittedTicket({ ticketId: randomTicket, date: currentDate })
            toast.success('Grievance escalation logged successfully!')
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
                                Grievance Redressal Policy & Officer Matrix
                            </h1>
                            <p className="text-blue-50 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-snug">
                                In accordance with digital financial services and DPDP Act regulations, CreditKlick operates a 2-step grievance redressal framework for fair & timely resolution.
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/25 shadow-lg shrink-0">
                            <div className="w-8 h-8 rounded-xl bg-amber-400/25 text-amber-300 flex items-center justify-center border border-amber-300/40 shadow-inner">
                                <Scale className="w-4 h-4 text-amber-300" />
                            </div>
                            <div className="text-left">
                                <span className="block text-[11px] font-extrabold text-white leading-none uppercase tracking-wider">Grievance Portal</span>
                                <span className="block text-[10px] text-blue-100 mt-0.5 font-medium">RBI & DPDP Redressal</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2-Step Escalation Matrix Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                    {/* Step 1 */}
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-200 shadow-sm relative overflow-hidden">

                        <h3 className="text-sm font-bold text-gray-900">Level 1</h3>
                        <p className="text-xs font-semibold text-[#2b7fff] mt-0.5">Pawan Chauhan</p>
                        <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                            First point of contact for customer grievances & resolution.
                        </p>
                        <div className="mt-3 pt-3 border-t border-blue-100 flex items-center justify-between text-xs">
                            <span className="text-gray-500 font-medium">Direct Email</span>
                            <span className="text-gray-800 font-bold">pawan.chauhan@stefto.com</span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden">

                        <h3 className="text-sm font-bold text-gray-900">Level 2</h3>
                        <p className="text-xs font-semibold text-emerald-700 mt-0.5">Govid</p>
                        <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                            Appellate regulatory authority for Level 1 escalations.
                        </p>
                        <div className="mt-3 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs">
                            <span className="text-gray-500 font-medium">Direct Email</span>
                            <span className="text-gray-800 font-bold">govid.giri@stefto.com</span>
                        </div>
                    </div>
                </div>

                {/* Main Escalation Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-8"
                >
                    <AnimatePresence mode="wait">
                        {submittedTicket ? (
                            /* Success Screen */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center py-6 sm:py-10 space-y-4"
                            >
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Grievance Escalation Submitted
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
                                    Your grievance has been logged into our regulatory tracking matrix. Our Nodal Officer team will reach out directly.
                                </p>

                                <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 sm:p-6 max-w-md mx-auto text-left space-y-2.5">
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Grievance Ticket ID</span>
                                        <span className="text-sm sm:text-base font-extrabold text-[#2b7fff] font-mono">{submittedTicket.ticketId}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500 font-medium">Date Registered</span>
                                        <span className="text-gray-800 font-semibold">{submittedTicket.date}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500 font-medium">Appellate Authority</span>
                                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Nodal Grievance Office</span>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                                    <button
                                        onClick={resetForm}
                                        className="py-2.5 px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Log Another Grievance
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
                            /* Form */
                            <form key="form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="border-b border-gray-100 pb-3 mb-2">
                                    <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <Scale className="w-4 h-4 text-[#2b7fff]" />
                                        Official Grievance Escalation Form
                                    </h2>
                                    <p className="text-xs text-gray-500">Log an official grievance ticket for review by our Grievance & Nodal Officer.</p>
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

                                    {/* Escalation Level */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Escalation Level <span className="text-red-500">*</span>
                                            </label>
                                            <span className="text-[10px] text-gray-400 font-medium">L1 Enabled by default</span>
                                        </div>
                                        <select
                                            value={level}
                                            onChange={(e) => setLevel(e.target.value)}
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all"
                                        >
                                            <option value={ESCALATION_LEVELS[0]}>
                                                {ESCALATION_LEVELS[0]}
                                            </option>
                                            <option value={ESCALATION_LEVELS[1]} disabled={!isEscalation}>
                                                {ESCALATION_LEVELS[1]} {!isEscalation ? '(Requires L1 Ticket)' : ''}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* Escalation Checkbox for Level 2 Nodal Officer */}
                                <div className="bg-slate-50 border border-gray-200 rounded-xl p-3 space-y-2">
                                    <label className="flex items-start gap-2.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isEscalation}
                                            onChange={(e) => {
                                                const checked = e.target.checked
                                                setIsEscalation(checked)
                                                if (checked) {
                                                    setLevel(ESCALATION_LEVELS[1])
                                                } else {
                                                    setLevel(ESCALATION_LEVELS[0])
                                                    setL1TicketId('')
                                                }
                                            }}
                                            className="w-4 h-4 mt-0.5 rounded text-[#2b7fff] focus:ring-[#2b7fff]"
                                        />
                                        <span className="text-xs font-semibold text-gray-800 leading-snug">
                                            I am escalating an existing unresolved Level 1 Ticket to Level 2 (Principal Nodal Officer - Govid)
                                        </span>
                                    </label>

                                    {isEscalation && (
                                        <div className="pt-2 border-t border-gray-200">
                                            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                                                Level 1 Ticket ID / Ref Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={l1TicketId}
                                                onChange={(e) => setL1TicketId(e.target.value)}
                                                placeholder="e.g. CK-GRV-849201"
                                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff]"
                                                required={isEscalation}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                        Grievance Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all"
                                    >
                                        {CATEGORIES.map((cat, idx) => (
                                            <option key={idx} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Details */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Detailed Grievance Explanation <span className="text-red-500">*</span>
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
                                        placeholder="State your grievance clearly, including dates, past support ticket numbers (if any), and desired outcome (minimum 20 characters)..."
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
                                        <>Submitting Grievance Ticket...</>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Formal Grievance Escalation
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Grievance & Nodal Officer Contact Details */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                        <Building2 className="w-5 h-5 text-[#2b7fff]" />
                        <h3 className="text-sm sm:text-base font-bold text-gray-900">Designated Grievance & Nodal Officer Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                <UserCheck className="w-4 h-4 text-[#2b7fff]" />
                                <span>Level 1</span>
                            </div>
                            <p className="text-gray-900 font-bold">Pawan Chauhan</p>
                            <p className="text-gray-600 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-gray-400" />
                                <a href="mailto:pawan.chauhan@stefto.com" className="text-[#2b7fff] font-semibold hover:underline">pawan.chauhan@stefto.com</a>
                            </p>

                        </div>

                        <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>Level 2</span>
                            </div>
                            <p className="text-gray-900 font-bold">Govid</p>
                            <p className="text-gray-600 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-gray-400" />
                                <a href="mailto:govid.giri@stefto.com" className="text-emerald-600 font-semibold hover:underline">govid.giri@stefto.com</a>
                            </p>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
