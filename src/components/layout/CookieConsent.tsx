'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import Cookies from 'js-cookie'

const COOKIE_CONSENT_KEY = 'cookie_consent_v2'
const COOKIE_CONSENT_EXPIRY = 365 // days

interface CookieConsentProps {
    onAccept?: () => void
    onDecline?: () => void
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // Check if user has already given consent
        const consent = Cookies.get(COOKIE_CONSENT_KEY)
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 600)
            return () => clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        const handleOpenConsent = () => {
            Cookies.remove(COOKIE_CONSENT_KEY)
            setIsVisible(true)
        }
        window.addEventListener('open_cookie_consent', handleOpenConsent)
        return () => window.removeEventListener('open_cookie_consent', handleOpenConsent)
    }, [])

    const saveConsentToBackend = async (accepted: boolean) => {
        try {
            const isClient = typeof window !== 'undefined';
            const API_URL = isClient ? '/api/v1' : (process.env.NEXT_PUBLIC_API_URL || 'https://betaversion-creditklickapp.onrender.com/api/v1');
            await fetch(`${API_URL}/cookies/consent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accepted,
                    timestamp: new Date().toISOString(),
                    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
                }),
            })
        } catch (error) {
            console.error('Failed to save cookie consent:', error)
        }
    }

    const handleAccept = async () => {
        setIsLoading(true)
        Cookies.set(COOKIE_CONSENT_KEY, 'accepted', { expires: COOKIE_CONSENT_EXPIRY })
        await saveConsentToBackend(true)
        setIsVisible(false)
        setIsLoading(false)
        onAccept?.()
    }

    const handleDecline = async () => {
        setIsLoading(true)
        Cookies.set(COOKIE_CONSENT_KEY, 'declined', { expires: COOKIE_CONSENT_EXPIRY })
        await saveConsentToBackend(false)
        setIsVisible(false)
        setIsLoading(false)
        onDecline?.()
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.96 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="fixed bottom-6 left-4 md:left-6 right-4 md:right-auto md:max-w-[390px] z-[9990]"
                >
                    <div className="cookie-glass-card p-5">
                        <div className="flex items-start gap-3.5">
                            {/* Clean Cookie Icon Badge */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center">
                                <Cookie className="w-5 h-5 text-amber-600" />
                            </div>

                            {/* Content Body */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="text-sm font-semibold text-gray-900">
                                        We value your privacy
                                    </h4>
                                    <button
                                        onClick={handleDecline}
                                        className="p-1 -mr-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        aria-label="Dismiss cookie notice"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <p className="text-xs text-gray-600 leading-relaxed">
                                    We use cookies to personalize your experience and enhance site features.{' '}
                                    <Link
                                        href="/cookies-policy"
                                        className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2"
                                    >
                                        Learn more
                                    </Link>
                                </p>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2.5 mt-3.5">
                                    <button
                                        onClick={handleDecline}
                                        disabled={isLoading}
                                        className="flex-1 py-2 px-3 text-xs cookie-btn-secondary disabled:opacity-50"
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        disabled={isLoading}
                                        className="flex-1 py-2 px-4 text-xs cookie-btn-primary disabled:opacity-50 flex items-center justify-center gap-1.5"
                                    >
                                        {isLoading ? (
                                            <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                                        ) : (
                                            'Accept All'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
