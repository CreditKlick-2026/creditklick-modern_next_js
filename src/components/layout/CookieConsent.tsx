'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import Cookies from 'js-cookie'

const COOKIE_CONSENT_KEY = 'cookie_consent'
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
            // Small delay before showing banner
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 1500)
            return () => clearTimeout(timer)
        }
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
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
                >
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                {/* Icon */}
                                <div className="flex-shrink-0 mt-0.5">
                                    <Cookie className="w-5 h-5 text-blue-600" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        We use cookies to enhance your experience.{' '}
                                        <Link
                                            href="/cookies-policy"
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            Learn more
                                        </Link>
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <button
                                            onClick={handleDecline}
                                            disabled={isLoading}
                                            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 font-medium rounded-md border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                        >
                                            Decline
                                        </button>
                                        <button
                                            onClick={handleAccept}
                                            disabled={isLoading}
                                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50 flex items-center gap-1.5"
                                        >
                                            {isLoading ? (
                                                <span className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                                            ) : (
                                                'Accept'
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Close button */}
                                <button
                                    onClick={handleDecline}
                                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
