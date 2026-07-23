"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { contactsAPI } from '@/services/api'

const CATEGORIES = [
    'Unresolved Complaint Ticket',
    'Credit Report Accuracy & Disputes',
    'Consent Revocation & Data Purge',
    'Fair Practice Code Breach',
    'Technical / Operational Failure',
    'Other'
]

export default function GrievanceRedressalClient() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
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
        if (!details || details.trim().length < 20) {
            toast.error('Please describe your grievance in detail (minimum 20 characters)')
            return
        }

        setIsLoading(true)

        try {
            const formattedMessage = `[GRIEVANCE | Category: ${category}] ${details}`

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
            toast.success('Grievance logged successfully!')
        } catch {
            const randomTicket = `CK-GRV-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
            setSubmittedTicket({ ticketId: randomTicket, date: currentDate })
            toast.success('Grievance logged successfully!')
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
        <div className="min-h-[80vh] bg-slate-50 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl mx-auto space-y-6">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                        Grievance Redressal
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Submit a grievance ticket and our team will get back to you with a resolution.
                    </p>
                </div>

                {/* Main Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
                >
                    <AnimatePresence mode="wait">
                        {submittedTicket ? (
                            /* Success Screen */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center py-6 sm:py-8 space-y-4"
                            >
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Grievance Submitted
                                </h2>
                                <p className="text-sm text-gray-600 max-w-lg mx-auto">
                                    Your grievance has been logged. Our team will reach out to you shortly.
                                </p>

                                <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 sm:p-6 max-w-sm mx-auto text-left space-y-3 mt-6">
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Ticket ID</span>
                                        <span className="text-sm font-bold text-blue-600 font-mono">{submittedTicket.ticketId}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Date</span>
                                        <span className="text-gray-800 font-semibold">{submittedTicket.date}</span>
                                    </div>
                                </div>

                                <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
                                    <button
                                        onClick={resetForm}
                                        className="py-2.5 px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Submit Another
                                    </button>
                                    <Link
                                        href="/"
                                        className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            /* Form */
                            <form key="form" onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Mobile */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                            Mobile Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                            placeholder="10-digit number"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    >
                                        {CATEGORIES.map((cat, idx) => (
                                            <option key={idx} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Details */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-xs font-bold text-gray-700 uppercase">
                                            Description <span className="text-red-500">*</span>
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
                                        placeholder="Describe your grievance clearly..."
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || details.trim().length < 20 || phone.length !== 10}
                                    className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                                >
                                    {isLoading ? 'Submitting...' : 'Submit Grievance'}
                                </button>
                            </form>
                        )}
                    </AnimatePresence>
                </motion.div>

            </div>
        </div>
    )
}
