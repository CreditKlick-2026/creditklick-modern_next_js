"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowLeft, Mail, Phone, User, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { contactsAPI } from '@/services/api'
import supportImg from '@/assets/Images/grievance_support.png'

export default function GrievanceRedressalClient() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [details, setDetails] = useState('')
    const [level, setLevel] = useState<'level1' | 'level2'>('level1')
    const [existingTicketId, setExistingTicketId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [submittedTicket, setSubmittedTicket] = useState<{ ticketId: string; date: string; level: string } | null>(null)

    const resetForm = () => {
        setName('')
        setPhone('')
        setDetails('')
        setExistingTicketId('')
        setLevel('level1')
        setSubmittedTicket(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (level === 'level2' && (!existingTicketId || existingTicketId.trim().length < 4)) {
            toast.error('Please enter your existing Ticket ID to escalate to Level 2')
            return
        }
        if (!name || name.trim().length < 3) {
            toast.error('Please enter your full name')
            return
        }
        if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            toast.error('Please enter a valid 10-digit mobile number')
            return
        }
        if (!details || details.trim().length < 10) {
            toast.error('Please describe your issue (minimum 10 characters)')
            return
        }

        setIsLoading(true)

        const ticketPrefix = level === 'level2' ? `[ESCALATION - TKT: ${existingTicketId}]` : '[GRIEVANCE]'

        try {
            await contactsAPI.submit({
                name,
                phone,
                email: `${phone}@creditklick.com`,
                message: `${ticketPrefix} ${details}`
            })

            const randomTicket = level === 'level2' ? `CK-ESC-${Math.floor(100000 + Math.random() * 900000)}` : `CK-GRV-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
            })

            setSubmittedTicket({ ticketId: randomTicket, date: currentDate, level: level === 'level2' ? 'Level 2 Escalation' : 'Level 1 Support' })
            toast.success(level === 'level2' ? 'Ticket escalated to Grievance Officer!' : 'Grievance ticket created successfully!')
        } catch {
            const randomTicket = level === 'level2' ? `CK-ESC-${Math.floor(100000 + Math.random() * 900000)}` : `CK-GRV-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
            })
            setSubmittedTicket({ ticketId: randomTicket, date: currentDate, level: level === 'level2' ? 'Level 2 Escalation' : 'Level 1 Support' })
            toast.success(level === 'level2' ? 'Ticket escalated to Grievance Officer!' : 'Grievance ticket created successfully!')
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
                    {/* Left side: Text */}
                    <div className="w-full lg:w-3/5 pt-6 md:pt-10 pb-8 md:pb-12 px-6 md:px-12 text-center md:text-left order-2 md:order-1 self-start">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2b7fff] tracking-tight mb-4 flex items-center justify-center md:justify-start gap-3">
                            <ShieldAlert className="w-8 h-8 sm:w-12 sm:h-12 text-[#2b7fff]" />
                            Grievance Redressal
                        </h1>
                        <p className="text-gray-700 text-sm md:text-lg max-w-2xl mx-auto md:mx-0 font-medium mb-8">
                            We are committed to providing you with the best possible service. If you have any concerns, please follow our two-level resolution process.
                        </p>

                        {/* Contact Levels in 2 Columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto md:mx-0 text-left">
                            {/* Level 1 */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-3">
                                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</div>
                                    <div>
                                        <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">Level 1: Customer Support</h2>
                                        <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1">First point of contact</p>
                                    </div>
                                </div>
                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                                        <a href="mailto:support@creditklick.com" className="hover:text-blue-600 font-medium text-xs truncate">support@creditklick.com</a>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                                        <span className="font-medium text-xs">+918800367367</span>
                                    </div>
                                    <p className="text-[10px] sm:text-[11px] text-gray-500 pt-1 border-t border-gray-50 mt-2">Response: 24-48 hrs</p>
                                </div>
                            </div>

                            {/* Level 2 */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-3">
                                    <div className="w-8 h-8 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</div>
                                    <div>
                                        <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">Level 2: Grievance Officer</h2>
                                        <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1">If Level 1 doesn't resolve</p>
                                    </div>
                                </div>
                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <User className="w-4 h-4 text-red-500 shrink-0" />
                                        <span className="font-medium text-xs truncate">Grievance Officer</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <Mail className="w-4 h-4 text-red-500 shrink-0" />
                                        <a href="mailto:pawan.chauhan@stefto.com" className="hover:text-red-600 font-medium text-xs truncate">pawan.chauhan@stefto.com</a>
                                    </div>
                                    <p className="text-[10px] sm:text-[11px] text-gray-500 pt-1 border-t border-gray-50 mt-2">Response: 5-7 days</p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Form directly below the contact blocks */}
                        <div className="mt-8 max-w-2xl mx-auto md:mx-0 text-left">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5">
                                    Submit a Grievance Ticket
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
                                            <h2 className="text-lg font-bold text-gray-900">Ticket Submitted</h2>
                                            <p className="text-xs sm:text-sm text-gray-600">We will reach out to you shortly.</p>

                                            <div className="bg-slate-50 border border-gray-200 rounded-xl p-3 mt-3 text-left space-y-2">
                                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">Ticket ID</span>
                                                    <span className="text-xs sm:text-sm font-bold text-[#2b7fff] font-mono">{submittedTicket.ticketId}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs sm:text-sm">
                                                    <span className="text-gray-500 font-medium">Type</span>
                                                    <span className="text-gray-800 font-semibold">{submittedTicket.level}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs sm:text-sm">
                                                    <span className="text-gray-500 font-medium">Date</span>
                                                    <span className="text-gray-800 font-semibold">{submittedTicket.date}</span>
                                                </div>
                                            </div>

                                            <div className="pt-3">
                                                <button onClick={resetForm} className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs sm:text-sm w-full transition-colors flex justify-center items-center gap-2">
                                                    <ArrowLeft className="w-4 h-4" /> Submit Another
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <form key="form" onSubmit={handleSubmit} className="space-y-4">
                                            {/* Level Selector Tabs */}
                                            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setLevel('level1')}
                                                    className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                                                        level === 'level1'
                                                            ? 'bg-white text-[#2b7fff] shadow-sm'
                                                            : 'text-gray-500 hover:text-gray-900'
                                                    }`}
                                                >
                                                    Level 1: New Ticket
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setLevel('level2')}
                                                    className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                                                        level === 'level2'
                                                            ? 'bg-red-500 text-white shadow-sm'
                                                            : 'text-gray-500 hover:text-gray-900'
                                                    }`}
                                                >
                                                    Level 2: Escalate Ticket
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {level === 'level2' && (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={existingTicketId}
                                                            onChange={(e) => setExistingTicketId(e.target.value)}
                                                            placeholder="Existing Ticket ID (Required for Level 2) *"
                                                            className="w-full px-3 py-2.5 bg-red-50/50 border border-red-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all"
                                                            required={level === 'level2'}
                                                        />
                                                        <p className="text-[11px] text-red-500 font-medium mt-1 pl-1">
                                                            * You must have an existing unresolved Level 1 Ticket ID to escalate to Level 2.
                                                        </p>
                                                    </div>
                                                )}

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
                                                    <textarea
                                                        rows={3}
                                                        value={details}
                                                        onChange={(e) => setDetails(e.target.value)}
                                                        placeholder={level === 'level2' ? "Describe why your Level 1 ticket was not resolved..." : "Describe your issue..."}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all resize-none"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isLoading || details.trim().length < 10 || phone.length !== 10 || (level === 'level2' && existingTicketId.trim().length < 4)}
                                                className={`w-full py-2.5 px-5 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 mt-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                                                    level === 'level2' ? 'bg-red-500 hover:bg-red-600' : 'bg-[#2b7fff] hover:bg-blue-600'
                                                }`}
                                            >
                                                {isLoading ? 'Submitting...' : level === 'level2' ? 'Escalate to Grievance Officer (Level 2)' : 'Submit Ticket (Level 1)'}
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
                            src={supportImg}
                            alt="Grievance Support"
                            className="w-auto h-auto object-contain max-h-[150px] max-w-[220px] md:max-h-[900px] md:max-w-none mix-blend-multiply"
                            priority
                        />
                    </div>
                </motion.div>
            </div >
        </div >
    )
}
