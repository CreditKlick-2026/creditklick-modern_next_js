"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ShieldAlert, Trash2, X, Loader2, CheckCircle2, AlertTriangle, LogIn } from 'lucide-react'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { userAPI } from '@/services/api'

interface RevokeConsentModalProps {
    isOpen: boolean
    onClose: () => void
}

export function RevokeConsentModal({ isOpen, onClose }: RevokeConsentModalProps) {
    const [reason, setReason] = useState('no_longer_needed')
    const [isLoading, setIsLoading] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [referenceId, setReferenceId] = useState<string | null>(null)

    useEffect(() => {
        if (isOpen) {
            setIsDone(false)
            setError(null)
            setReferenceId(null)
            // Withdrawal acts on the logged-in account only (the server identifies the user from the token)
            setIsLoggedIn(!!(Cookies.get('accessToken') || Cookies.get('token')))
        }
    }, [isOpen])

    const handleRevokeSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        try {
            const res = await userAPI.revokeConsent({ reason })
            const body = res?.data
            if (!body?.success) throw new Error(body?.message || 'Withdrawal could not be completed')

            // Remove cached credit data from this browser too
            Cookies.remove('cibil', { path: '/' })
            if (typeof window !== 'undefined') {
                try {
                    Object.keys(localStorage).filter((k) => /report|cibil|credit/i.test(k)).forEach((k) => localStorage.removeItem(k))
                } catch { /* ignore */ }
            }

            setReferenceId(body?.details?.referenceId || null)
            setIsDone(true)
            toast.success('Consent withdrawn. Your credit information has been deleted.')
        } catch (err: unknown) {
            const status = (err as { response?: { status?: number } })?.response?.status
            const msg = status === 401
                ? 'Your session has expired. Please log in again to withdraw consent.'
                : ((err as { response?: { data?: { message?: string } } })?.response?.data?.message
                    || (err as Error)?.message || 'Withdrawal failed. Please try again.')
            setError(msg)
            toast.error(msg)
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
                                            Withdrawing consent <strong>permanently deletes your credit information</strong> (credit score, report, accounts, enquiries and your credit video) from CreditKlick within minutes. As required by law, a record of your consent and its withdrawal is kept for 2 years — it contains no credit information.
                                        </p>
                                    </div>

                                    {!isLoggedIn && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-3">
                                            <LogIn className="w-5 h-5 shrink-0 mt-0.5" />
                                            <p>
                                                Please <Link href="/login" className="font-bold underline" onClick={onClose}>log in</Link> with your registered mobile number to withdraw consent.
                                                If you cannot log in, raise a request on our <Link href="/grievance-redressal" className="font-bold underline" onClick={onClose}>grievance page</Link>.
                                            </p>
                                        </div>
                                    )}

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

                                    {error && (
                                        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2.5">{error}</p>
                                    )}

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
                                            disabled={isLoading || !isLoggedIn}
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
                                        <h4 className="text-lg font-bold text-gray-900">Consent Withdrawn</h4>
                                        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                                            Your credit information has been deleted from CreditKlick&apos;s systems.
                                            {referenceId && <> Reference ID: <span className="font-mono">{referenceId}</span></>}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleFinish}
                                        className="w-full py-2.5 px-4 bg-brand hover:bg-brand-dark text-white rounded-xl font-semibold text-sm transition-colors shadow-md"
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
