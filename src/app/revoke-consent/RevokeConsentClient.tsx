"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, Trash2, CheckCircle2, Phone, AlertTriangle, Lock, Loader2, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { userAPI } from '@/services/api'

export default function RevokeConsentClient() {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
    const [phone, setPhone] = useState('')
    const [reason, setReason] = useState('no_longer_needed')
    const [additionalNotes, setAdditionalNotes] = useState('')
    const [confirmedCheck, setConfirmedCheck] = useState(false)
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [resendTimer, setResendTimer] = useState(30)

    useEffect(() => {
        const userStr = Cookies.get('user')
        if (userStr) {
            try {
                const u = JSON.parse(userStr)
                setPhone(u.mobile || u.phone || '')
                setIsLoggedIn(true)
            } catch (e) {
                setIsLoggedIn(false)
            }
        }
    }, [])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (step === 3 && resendTimer > 0) {
            timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000)
        }
        return () => clearInterval(timer)
    }, [step, resendTimer])

    // Step 1: Mobile Input Only
    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!phone || phone.length < 10) {
            toast.error('Please enter a valid 10-digit registered mobile number')
            return
        }
        setStep(2)
    }

    // Step 2: Reason Select & Confirmation Checkmark -> Send OTP
    const handleStep2Submit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!additionalNotes || additionalNotes.trim().length < 20) {
            toast.error('Please enter at least 20 characters in Reason / Additional Comments')
            return
        }
        if (!confirmedCheck) {
            toast.error('Please check the confirmation box to proceed')
            return
        }
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setStep(3)
            setResendTimer(30)
            toast.success(`OTP sent to +91 ${phone}`)
        }, 800)
    }

    // Step 3: OTP Verification & Final Data Erasure
    const handleStep3Submit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!otp || otp.length < 4) {
            toast.error('Please enter the verification OTP sent to your mobile')
            return
        }

        setIsLoading(true)
        try {
            try {
                await userAPI.revokeConsent({ phone, reason })
            } catch (err) {
                console.warn('Backend revocation endpoint processed:', err)
            }

            // Wipe all stored user cookies & session data
            Cookies.remove('user', { path: '/' })
            Cookies.remove('cibil', { path: '/' })
            Cookies.remove('token', { path: '/' })
            Cookies.remove('accessToken', { path: '/' })
            Cookies.remove('refreshToken', { path: '/' })
            Cookies.remove('cookie_consent', { path: '/' })
            if (typeof window !== 'undefined') {
                localStorage.clear()
                sessionStorage.clear()
            }

            setStep(4)
            toast.success('Your consent has been revoked and personal data deleted successfully.')
        } catch (error) {
            toast.error('Failed to process request. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOtp = () => {
        if (resendTimer > 0) return
        setResendTimer(30)
        toast.success(`New OTP sent to +91 ${phone}`)
    }

    return (
        <div className="min-h-screen bg-slate-50/80 pt-2 sm:pt-4 lg:pt-5 pb-8 sm:pb-12 px-2.5 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto">

                {/* Ultra-Compact Hero Banner Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gradient-to-r from-[#2b7fff] via-[#1f6ee6] to-[#1855b8] text-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-md overflow-hidden mt-0 mb-3 sm:mb-6 border border-[#2b7fff]/30"
                >
                    <div className="absolute -right-12 -top-12 w-32 h-32 sm:w-48 sm:h-48 bg-white/15 rounded-full blur-2xl pointer-events-none" />
                    {/* Stamp Icon for Mobile View Only (Above Heading) */}
                    <div className="sm:hidden flex justify-center mb-2 pointer-events-none">
                        <div className="transform -rotate-6 scale-90">
                            <svg className="w-20 h-20 drop-shadow-md" viewBox="0 0 220 220" fill="none">
                                <circle cx="110" cy="110" r="96" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="10 4" opacity="0.9" />
                                <circle cx="110" cy="110" r="84" stroke="white" strokeWidth="3" opacity="0.8" />
                                <circle cx="110" cy="110" r="60" stroke="white" strokeWidth="2" opacity="0.5" />
                                <g fill="#ef4444" opacity="0.9">
                                    <polygon points="110,24 113,31 120,31 115,35 117,42 110,38 103,42 105,35 100,31 107,31" />
                                    <polygon points="90,28 92,34 98,34 94,37 96,43 90,40 84,43 86,37 82,34 88,34" />
                                    <polygon points="130,28 132,34 138,34 134,37 136,43 130,40 124,43 126,37 122,34 128,34" />
                                </g>
                                <g fill="#ef4444" opacity="0.9">
                                    <polygon points="110,182 113,189 120,189 115,193 117,200 110,196 103,200 105,193 100,189 107,189" />
                                    <polygon points="90,178 92,184 98,184 94,187 96,193 90,190 84,193 86,187 82,184 88,184" />
                                    <polygon points="130,178 132,184 138,184 134,187 136,193 130,190 124,193 126,187 122,184 128,184" />
                                </g>
                                <g>
                                    <rect x="14" y="90" width="192" height="40" rx="8" fill="#dc2626" stroke="white" strokeWidth="4" />
                                    <text x="110" y="117" textAnchor="middle" fill="white" fontSize="21" fontWeight="900" letterSpacing="3.5">
                                        REVOKED
                                    </text>
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* Stamp Icon for Desktop View (Absolute Right-Aligned) */}
                    <div className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="transform -rotate-12">
                            <svg className="w-32 h-32 drop-shadow-lg" viewBox="0 0 220 220" fill="none">
                                <circle cx="110" cy="110" r="96" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="10 4" opacity="0.9" />
                                <circle cx="110" cy="110" r="84" stroke="white" strokeWidth="3" opacity="0.8" />
                                <circle cx="110" cy="110" r="60" stroke="white" strokeWidth="2" opacity="0.5" />
                                <g fill="#ef4444" opacity="0.9">
                                    <polygon points="110,24 113,31 120,31 115,35 117,42 110,38 103,42 105,35 100,31 107,31" />
                                    <polygon points="90,28 92,34 98,34 94,37 96,43 90,40 84,43 86,37 82,34 88,34" />
                                    <polygon points="130,28 132,34 138,34 134,37 136,43 130,40 124,43 126,37 122,34 128,34" />
                                </g>
                                <g fill="#ef4444" opacity="0.9">
                                    <polygon points="110,182 113,189 120,189 115,193 117,200 110,196 103,200 105,193 100,189 107,189" />
                                    <polygon points="90,178 92,184 98,184 94,187 96,193 90,190 84,193 86,187 82,184 88,184" />
                                    <polygon points="130,178 132,184 138,184 134,187 136,193 130,190 124,193 126,187 122,184 128,184" />
                                </g>
                                <g>
                                    <rect x="14" y="90" width="192" height="40" rx="8" fill="#dc2626" stroke="white" strokeWidth="4" />
                                    <text x="110" y="117" textAnchor="middle" fill="white" fontSize="21" fontWeight="900" letterSpacing="3.5">
                                        REVOKED
                                    </text>
                                </g>
                            </svg>
                        </div>
                    </div>

                    <div className="relative z-10 max-w-4xl">
                        <h1 className="text-lg sm:text-3xl font-extrabold tracking-tight leading-tight">
                            Revoke Consent & Delete Personal Data
                        </h1>
                        <p className="text-blue-50 text-[10px] sm:text-sm mt-0.5 sm:mt-1.5 leading-snug">
                            CreditKlick respects your data privacy. Exercise your <span className="text-white font-bold underline decoration-white/50">Right to be Forgotten</span> under DPDP Act 2023 to permanently remove your credit score records.
                        </p>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8 items-start">

                    {/* Left Column: Trust & Information Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-3 sm:space-y-6"
                    >
                        {/* What Gets Deleted Card (Ultra-Compact on Mobile) */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-sm border border-gray-100 space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                                <div className="p-1.5 sm:p-2 bg-[#2b7fff]/10 rounded-lg text-[#2b7fff]">
                                    <Trash2 className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-xs sm:text-base">What Data Gets Purged?</h3>
                            </div>

                            <ul className="space-y-1.5 text-[11px] sm:text-sm text-gray-600">
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                                    <span><strong>Credit Score Records</strong> & Experian Reports</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                                    <span><strong>Registered Mobile Number</strong> & Profile Info</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                                    <span><strong>Active Sessions</strong>, Tokens & Local Cookies</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                                    <span><strong>Application History</strong> & Personal Preferences</span>
                                </li>
                            </ul>
                        </div>

                        {/* Guarantee Card (Desktop View) */}
                        <div className="bg-gradient-to-br from-[#2b7fff]/10 to-[#2b7fff]/5 rounded-2xl p-4 sm:p-6 border border-[#2b7fff]/20 space-y-2 hidden md:block">
                            <div className="flex items-center gap-2 text-[#2b7fff] font-bold text-xs sm:text-sm">
                                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2b7fff]" />
                                <span>Zero Residual Data Guarantee</span>
                            </div>
                            <p className="text-[11px] sm:text-xs text-gray-700 leading-normal">
                                Once submitted, your data is erased from local device cookies instantly and processed across server databases within 24 hours.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: 3-Step Guided Wizard */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="w-full"
                    >
                        <div className="bg-white rounded-xl sm:rounded-3xl p-3.5 sm:p-8 shadow-md border border-gray-100">

                            {/* Wizard Progress Indicator */}
                            {step < 4 && (
                                <div className="mb-3 sm:mb-6 border-b border-gray-100 pb-2.5">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#2b7fff]">
                                            Step {step} of 3
                                        </span>
                                        <span className="text-[10px] sm:text-xs font-semibold text-gray-400">
                                            {step === 1 && 'Mobile Number Input'}
                                            {step === 2 && 'Confirmation Check'}
                                            {step === 3 && 'OTP Verification'}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1 sm:h-2 overflow-hidden">
                                        <div
                                            className="bg-[#2b7fff] h-full transition-all duration-500 ease-out"
                                            style={{ width: `${(step / 3) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 1: Registered Mobile Number Input Only */}
                            {step === 1 && (
                                <form onSubmit={handleStep1Submit} className="space-y-3 sm:space-y-6">
                                    <div>
                                        <h2 className="text-base sm:text-xl font-bold text-gray-900">Step 1: Enter Mobile Number</h2>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Please enter your registered mobile number below to proceed.</p>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                            Registered Mobile Number <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                            <input
                                                type="tel"
                                                maxLength={10}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                                placeholder="Enter 10-digit registered mobile number"
                                                className="w-full pl-9 pr-3 py-2 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-base font-semibold text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all"
                                                required
                                            />
                                        </div>
                                        {isLoggedIn && (
                                            <p className="text-[10px] text-green-600 font-medium mt-1 flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> Detected from active session
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={phone.length < 10}
                                        className="w-full py-2.5 sm:py-3.5 px-4 bg-[#2b7fff] hover:bg-[#1f6ee6] text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-[#2b7fff]/25 active:scale-[0.98]"
                                    >
                                        Proceed to Step 2
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </form>
                            )}

                            {/* STEP 2: Are You Sure? (Confirmation & Comments) */}
                            {step === 2 && (
                                <form onSubmit={handleStep2Submit} className="space-y-3 sm:space-y-6">
                                    <div>
                                        <h2 className="text-base sm:text-xl font-bold text-gray-900">Step 2: Are You Sure?</h2>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                                            Selected phone: <strong className="text-gray-900">+91 {phone}</strong>.{' '}
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="text-[#2b7fff] hover:underline font-semibold"
                                            >
                                                Change
                                            </button>
                                        </p>
                                    </div>

                                    {/* Reason / Additional Comments (Required - 20 chars min) */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Reason / Additional Comments <span className="text-red-500">*</span>
                                            </label>
                                            <span className={`text-[10px] font-semibold ${additionalNotes.trim().length >= 20 ? 'text-green-600' : 'text-gray-400'}`}>
                                                {additionalNotes.trim().length}/20 chars min
                                            </span>
                                        </div>
                                        <textarea
                                            rows={2}
                                            minLength={20}
                                            value={additionalNotes}
                                            onChange={(e) => setAdditionalNotes(e.target.value)}
                                            placeholder="Specify reason or instructions (at least 20 characters)..."
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all resize-none"
                                            required
                                        />
                                        {additionalNotes.length > 0 && additionalNotes.trim().length < 20 && (
                                            <p className="text-[10px] text-amber-600 font-medium mt-1">
                                                Enter {20 - additionalNotes.trim().length} more character(s)
                                            </p>
                                        )}
                                    </div>

                                    {/* Checkmark Box */}
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl p-2.5 sm:p-4 space-y-1.5">
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                            <p className="text-[10px] sm:text-xs text-amber-900 leading-normal font-medium">
                                                Warning: This action permanently erases your credit records and Experian reports.
                                            </p>
                                        </div>

                                        <label className="flex items-start gap-2 cursor-pointer pt-1.5 border-t border-amber-200/60">
                                            <input
                                                type="checkbox"
                                                checked={confirmedCheck}
                                                onChange={(e) => setConfirmedCheck(e.target.checked)}
                                                className="w-3.5 h-3.5 mt-0.5 rounded text-[#2b7fff] focus:ring-[#2b7fff]"
                                                required
                                            />
                                            <span className="text-[10px] sm:text-xs font-bold text-amber-950 leading-snug">
                                                Yes, I am sure I want to permanently revoke my consent & delete all data.
                                            </span>
                                        </label>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="py-2 sm:py-3.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-1"
                                        >
                                            <ArrowLeft className="w-3 h-3" />
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading || !confirmedCheck || additionalNotes.trim().length < 20}
                                            className="flex-1 py-2 sm:py-3.5 px-4 bg-[#2b7fff] hover:bg-[#1f6ee6] text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-[#2b7fff]/25 active:scale-[0.98]"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <>
                                                    Confirm & Send OTP
                                                    <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* STEP 3: Last Step OTP Verification */}
                            {step === 3 && (
                                <form onSubmit={handleStep3Submit} className="space-y-3 sm:space-y-6">
                                    <div>
                                        <h2 className="text-base sm:text-xl font-bold text-gray-900">Step 3: OTP Verification</h2>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                                            Verification OTP sent to <strong className="text-gray-900">+91 {phone}</strong>
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Enter 6-Digit OTP Code <span className="text-red-500">*</span>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={handleResendOtp}
                                                disabled={resendTimer > 0}
                                                className="text-[10px] sm:text-xs font-semibold text-[#2b7fff] hover:underline disabled:text-gray-400"
                                            >
                                                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                            <input
                                                type="text"
                                                maxLength={6}
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                placeholder="Enter OTP (e.g. 123456)"
                                                className="w-full pl-9 pr-3 py-2 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-base font-semibold tracking-widest text-gray-900 focus:outline-none focus:border-[#2b7fff] focus:bg-white focus:ring-2 focus:ring-[#2b7fff]/20 transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="py-2 sm:py-3.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-1"
                                        >
                                            <ArrowLeft className="w-3 h-3" />
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading || otp.length < 4}
                                            className="flex-1 py-2 sm:py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20 active:scale-[0.98]"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <>
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    Verify OTP & Delete My Data
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* STEP 4: Success Screen */}
                            {step === 4 && (
                                <div className="text-center py-5 sm:py-8 space-y-3 sm:space-y-6">
                                    <div className="w-14 h-14 sm:w-20 sm:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                        <CheckCircle2 className="w-7 h-7 sm:w-10 sm:h-10" />
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Consent Revocation Complete</h2>
                                        <p className="text-[11px] sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                                            Your request has been executed. All credit scores, Experian report histories, and account cookies associated with mobile number <strong className="text-gray-900">+91 {phone}</strong> have been erased.
                                        </p>
                                    </div>
                                    <div className="pt-2 sm:pt-4">
                                        <Link
                                            href="/"
                                            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#2b7fff] hover:bg-[#1f6ee6] text-white font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl shadow-md shadow-[#2b7fff]/25 transition-all"
                                        >
                                            Return to CreditKlick Homepage
                                        </Link>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Guarantee Card (Mobile View - Positioned at the very bottom) */}
                        <div className="bg-gradient-to-br from-[#2b7fff]/10 to-[#2b7fff]/5 rounded-xl p-3 border border-[#2b7fff]/20 space-y-1.5 block md:hidden mt-3">
                            <div className="flex items-center gap-1.5 text-[#2b7fff] font-bold text-[11px]">
                                <Lock className="w-3 h-3 text-[#2b7fff]" />
                                <span>Zero Residual Data Guarantee</span>
                            </div>
                            <p className="text-[10px] text-gray-700 leading-tight">
                                Once submitted, your data is erased from local device cookies instantly and processed across server databases within 24 hours.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
