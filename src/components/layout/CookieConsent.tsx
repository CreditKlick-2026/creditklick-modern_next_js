'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import Cookies from 'js-cookie'

const COOKIE_CONSENT_KEY = 'cookie_consent_v3'
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
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="fixed bottom-0 left-0 right-0 z-[9990] bg-white border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] rounded-none"
                >
                    <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4 md:flex-nowrap">

                        {/* Cookie Icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-50 border border-amber-200/80 flex items-center justify-center">
                            <Cookie className="w-5 h-5 text-amber-600" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">We value your privacy</p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                                <Link href="/cookies-policy" className="text-blue-600 hover:underline font-semibold">
                                    Learn more
                                </Link>
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button
                                onClick={handleDecline}
                                disabled={isLoading}
                                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 whitespace-nowrap"
                            >
                                Reject All
                            </button>
                            <button
                                onClick={handleAccept}
                                disabled={isLoading}
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                                ) : null}
                                Accept All
                            </button>
                        </div>

                        {/* Close */}
                        <button
                            onClick={handleDecline}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0 md:ml-2"
                            aria-label="Dismiss"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

