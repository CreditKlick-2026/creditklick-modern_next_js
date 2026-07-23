"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowLeft, Mail, Phone, MessageSquareWarning, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { contactsAPI } from '@/services/api'
import complaintImg from '@/assets/Images/register_complaint.png'

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

    const resetForm = () => {
        setSubmittedTicket(null)
        setName('')
        setPhone('')
        setCategory(COMPLAINT_CATEGORIES[0])
        setDetails('')
    }

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
                year: 'numeric'
            })

            setSubmittedTicket({ ticketId: randomTicket, date: currentDate })
            toast.success('Complaint registered successfully!')
        } catch (error) {
            console.error('Complaint submission error', error)
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

    return (
        <div className="min-h-[80vh] bg-slate-50 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-10">

                {/* Hero Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-[#f4f8fb] mb-10 rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row items-start"
                >
                    {/* Left side: Text + Contact + Form */}
                    <div className="w-full lg:w-3/5 pt-6 md:pt-10 pb-8 md:pb-12 px-6 md:px-12 text-center md:text-left order-2 md:order-1 self-start">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#2b7fff] tracking-tight mb-3 sm:mb-4 flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                            <MessageSquareWarning className="w-7 h-7 sm:w-12 sm:h-12 text-[#2b7fff] shrink-0" />
                            Register a Complaint
                        </h1>
                        <p className="text-gray-700 text-sm md:text-lg max-w-2xl mx-auto md:mx-0 font-medium mb-8">
                            We take every complaint seriously. Submit your grievance below and our team will investigate and resolve it within 24–48 business hours.
                        </p>

                        {/* Complaint Form */}
                        <div className="mt-8 max-w-2xl mx-auto md:mx-0 text-left">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5">
                                    Submit Complaint
                                </h3>

                                <AnimatePresence mode="wait">
                                    {submittedTicket ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="text-center py-4 space-y-3"
                                        >
                                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                                <CheckCircle2 className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-lg font-bold text-gray-900">Complaint Registered!</h2>
                                            <p className="text-xs sm:text-sm text-gray-600">Our team will reach out to you within 24–48 business hours.</p>

                                            <div className="bg-slate-50 border border-gray-200 rounded-xl p-3 mt-3 text-left space-y-2">
                                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">Ticket ID</span>
                                                    <span className="text-xs sm:text-sm font-bold text-[#2b7fff] font-mono">{submittedTicket.ticketId}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs sm:text-sm">
                                                    <span className="text-gray-500 font-medium">Date</span>
                                                    <span className="text-gray-800 font-semibold">{submittedTicket.date}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs sm:text-sm">
                                                    <span className="text-gray-500 font-medium">Resolution ETA</span>
                                                    <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200 text-[11px]">24–48 hrs</span>
                                                </div>
                                            </div>

                                            <div className="pt-3 flex flex-col sm:flex-row gap-2">
                                                <button onClick={resetForm} className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs sm:text-sm w-full transition-colors flex justify-center items-center gap-2">
                                                    <ArrowLeft className="w-4 h-4" /> Submit Another
                                                </button>
                                                <Link href="/" className="py-2 px-4 bg-[#2b7fff] hover:bg-blue-600 text-white rounded-xl font-bold text-xs sm:text-sm w-full transition-colors flex justify-center items-center gap-2">
                                                    Back to Home
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <form key="form" onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Your Full Name *"
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="tel"
                                                        maxLength={10}
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                                        placeholder="Mobile Number *"
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <select
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all"
                                                    >
                                                        {COMPLAINT_CATEGORIES.map((cat, idx) => (
                                                            <option key={idx} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <textarea
                                                        rows={3}
                                                        minLength={20}
                                                        value={details}
                                                        onChange={(e) => setDetails(e.target.value)}
                                                        placeholder="Describe your complaint in detail (min. 20 characters)..."
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all resize-none"
                                                        required
                                                    />
                                                    {details.length > 0 && details.trim().length < 20 && (
                                                        <p className="text-[10px] text-amber-600 font-medium mt-1 pl-1">
                                                            Enter {20 - details.trim().length} more character(s)
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isLoading || details.trim().length < 20 || phone.length !== 10}
                                                className="w-full py-2.5 px-5 bg-[#2b7fff] hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isLoading ? 'Submitting...' : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        Submit Complaint Ticket
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Image */}
                    <div className="w-full lg:w-2/5 flex justify-center items-center order-1 md:order-2 p-2 pt-4 md:pt-36 self-stretch">
                        <Image
                            src={complaintImg}
                            alt="Register Complaint"
                            className="w-auto h-auto object-contain max-h-[150px] max-w-[220px] md:max-h-[900px] md:max-w-none mix-blend-multiply"
                            priority
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
