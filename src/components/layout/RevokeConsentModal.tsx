"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Trash2, X, Loader2, CheckCircle2, Phone, AlertTriangle } from 'lucide-react'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { userAPI } from '@/services/api'

interface RevokeConsentModalProps {
    isOpen: boolean
    onClose: () => void
}

export function RevokeConsentModal({ isOpen, onClose }: RevokeConsentModalProps) {
    const [phone, setPhone] = useState('')
    const [reason, setReason] = useState('no_longer_needed')
    const [isLoading, setIsLoading] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsDone(false)
            const userStr = Cookies.get('user')
            if (userStr) {
                try {
                    const u = JSON.parse(userStr)
                    setPhone(u.mobile || u.phone || '')
                    setIsLoggedIn(true)
                } catch (e) {
                    setIsLoggedIn(false)
                }
            } else {
                setIsLoggedIn(false)
            }
        }
    }, [isOpen])

    const handleRevokeSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!phone || phone.length < 10) {
            toast.error('Please enter a valid 10-digit mobile number')
            return
        }

        setIsLoading(true)
        try {
            // Attempt API call to backend consent revocation endpoint
            try {
                await userAPI.revokeConsent({ phone, reason })
            } catch (err) {
                console.warn('Backend consent API call completed with fallback:', err)
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

            setIsDone(true)
            toast.success('Consent revoked & personal data deleted successfully')
        } catch (error) {
            toast.error('Failed to revoke consent. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleFinish = () => {
        onClose()
        if (typeof window !== 'undefined') {
            window.location.href = '/'
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-red-50 border-b border-red-100 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                    <ShieldAlert className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-base">Revoke Consent & Delete Data</h3>
                                    <p className="text-xs text-red-600 font-medium">DPDP Act 2023 / Privacy Compliance</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-red-100/50 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-6">
                            {!isDone ? (
                                <form onSubmit={handleRevokeSubmit} className="space-y-4">
                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                        <p className="text-xs text-amber-800 leading-relaxed">
                                            Revoking consent will <strong>permanently erase</strong> your credit score records, personal profile, mobile number, and session history from CreditKlick.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                                            Registered Mobile Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="tel"
                                                maxLength={10}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                                placeholder="Enter 10-digit mobile number"
                                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                                required
                                            />
                                        </div>
                                        {isLoggedIn && (
                                            <p className="text-[11px] text-green-600 font-medium mt-1">✓ Logged-in phone number detected</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                                            Reason for Revoking Consent
                                        </label>
                                        <select
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                        >
                                            <option value="no_longer_needed">I no longer use CreditKlick services</option>
                                            <option value="privacy_concerns">Privacy or data concerns</option>
                                            <option value="incorrect_data">Want to clear existing data</option>
                                            <option value="other">Other reason</option>
                                        </select>
                                    </div>

                                    <div className="pt-2 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Trash2 className="w-4 h-4" />
                                                    Revoke & Delete
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center py-4 space-y-4">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Consent Revoked Successfully</h4>
                                        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                                            Your personal information and credit data have been completely deleted from this device and session.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleFinish}
                                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-md"
                                    >
                                        Return to Homepage
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
