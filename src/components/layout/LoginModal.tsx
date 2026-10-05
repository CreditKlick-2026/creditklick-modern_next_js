"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'
import toast from 'react-hot-toast'
import { verificationAPI } from '@/services/api'
import Cookies from 'js-cookie'

interface LoginModalProps {
    showLoginModal: boolean
    setShowLoginModal: (show: boolean) => void
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

export function LoginModal({ showLoginModal, setShowLoginModal, setIsLoggedIn }: LoginModalProps) {
    const router = useRouter()
    const [mobileNumber, setMobileNumber] = useState('')
    const [mobileError, setMobileError] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowLoginModal(false)
        }
        if (showLoginModal) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [showLoginModal, setShowLoginModal])

    if (!showLoginModal) return null

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10)
        setMobileNumber(value)
        if (value.length === 10) setMobileError('')
    }

    const handleSendOTP = async () => {
        if (!mobileNumber || mobileNumber.length !== 10) {
            setMobileError('Please enter a valid 10-digit mobile number')
            return
        }
        setMobileError('')
        setIsLoading(true)

        try {
            const response = await verificationAPI.init({ mobile: mobileNumber, isLogin: true })
            const data = response.data

            if (data.requireSignup) {
                toast.error("User not found. Please Sign Up.")
            } else if (data.success) {
                setOtpSent(true)
                toast.success("OTP Sent Successfully")
            } else {
                setMobileError(data.error || "Failed to send OTP")
            }
        } catch (error: unknown) {
            console.error('Login Init Error:', error)
            const err = error as { response?: { data?: { error?: string } } }
            setMobileError(err.response?.data?.error || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setMobileError('Please enter valid 6-digit OTP')
            return
        }
        setIsLoading(true)
        try {
            const response = await verificationAPI.submit({ mobile: mobileNumber, otp: otp, flow: 'MTALKZ' })
            const data = response.data

            if (data.success) {
                Cookies.set('user', JSON.stringify(data.user), { expires: 7 })
                if (data.token) Cookies.set('accessToken', data.token, { expires: 7 })
                if (data.report) Cookies.set('cibil', JSON.stringify(data.report), { expires: 7 })

                toast.success('Login Successful!')
                setIsLoggedIn(true)
                setShowLoginModal(false)
                router.push('/report-analysis')
            } else {
                setMobileError(data.error || "Invalid OTP")
            }
        } catch (error: unknown) {
            console.error('OTP Verify Error:', error)
            const err = error as { response?: { data?: { error?: string } } }
            setMobileError(err.response?.data?.error || "Verification failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" 
                onClick={(e) => e.target === e.currentTarget && setShowLoginModal(false)}
            >
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 15 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95, y: 15 }} 
                    className="bg-white rounded-none shadow-2xl max-w-md md:max-w-3xl lg:max-w-4xl w-full overflow-hidden border border-gray-200"
                >
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-blue-100/60 flex flex-col items-center justify-center p-8 hidden md:flex border-r border-blue-100/60">
                            <div className="relative w-full max-w-xs aspect-square flex items-center justify-center">
                                <Image 
                                    src="/assets/credit_login_3d.png" 
                                    alt="CreditKlick Secure Login" 
                                    width={380} 
                                    height={380} 
                                    className="object-contain w-full h-full drop-shadow-xl hover:scale-105 transition-transform duration-500" 
                                    priority 
                                />
                            </div>
                            <p className="text-xs font-medium text-slate-500 mt-3 text-center">
                                🔒 256-Bit Bank Grade Secure & Encrypted Login
                            </p>
                        </div>
                        <div className="md:w-1/2 p-6 sm:p-10 relative w-full flex flex-col justify-center">
                            <button 
                                onClick={() => setShowLoginModal(false)} 
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                            <div className="w-full">
                                {!otpSent ? (
                                    <>
                                        <div className="text-center mb-6">
                                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Login to CreditKlick</h2>
                                            <p className="text-xs text-slate-500 mt-1">Enter your 10-digit mobile number to continue</p>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-700">Mobile Number</label>
                                            <input 
                                                type="tel" 
                                                value={mobileNumber} 
                                                onChange={handleMobileChange} 
                                                placeholder="Enter 10 digit Mobile Number" 
                                                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-none focus:border-[#155dfc] focus:outline-none focus:ring-2 focus:ring-[#155dfc]/20 text-slate-900 placeholder:text-slate-400 transition" 
                                                maxLength={10} 
                                            />
                                            {mobileError && <p className="mt-1.5 text-xs text-red-500 font-medium">{mobileError}</p>}
                                        </div>
                                        <p className="text-sm text-center mb-5 text-slate-600">
                                            New user? <Link href="/credit-score" onClick={() => setShowLoginModal(false)} className="text-[#155dfc] font-semibold hover:underline">Sign Up</Link>
                                        </p>
                                        <Button 
                                            onClick={handleSendOTP} 
                                            disabled={isLoading} 
                                            className="w-full py-2.5 rounded-none bg-[#155dfc] hover:bg-[#104ac7] text-white font-semibold shadow-sm transition"
                                        >
                                            {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}Send OTP
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-center mb-6">
                                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Verify OTP</h2>
                                            <p className="text-xs text-slate-500 mt-1">Enter 6-digit OTP sent to <span className="font-semibold text-slate-800">+91 {mobileNumber}</span></p>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-700">Enter OTP</label>
                                            <input 
                                                type="text" 
                                                value={otp} 
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                                                placeholder="Enter 6 digit OTP" 
                                                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-none focus:border-[#155dfc] focus:outline-none focus:ring-2 focus:ring-[#155dfc]/20 tracking-widest text-center text-lg font-semibold text-slate-900 transition" 
                                                maxLength={6} 
                                            />
                                            {mobileError && <p className="mt-1.5 text-xs text-red-500 font-medium">{mobileError}</p>}
                                        </div>
                                        <Button 
                                            onClick={handleVerifyOTP} 
                                            disabled={isLoading} 
                                            className="w-full py-2.5 rounded-none bg-green-600 hover:bg-green-700 text-white font-semibold shadow-sm transition"
                                        >
                                            {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}Verify OTP
                                        </Button>
                                        <button 
                                            onClick={() => { setOtpSent(false); setOtp(''); }} 
                                            className="w-full text-xs text-slate-500 hover:text-[#155dfc] underline mt-4 transition font-medium"
                                        >
                                            Change Mobile Number
                                        </button>
                                    </>
                                )}
                                <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                                    <p className="text-xs text-slate-500">
                                        Need help? <a href="https://wa.me/9318427221?text=Need%20help%20with%20CreditKlick%20login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold ml-1"><MessageCircle className="h-4 w-4 mr-1 text-green-600" />WhatsApp</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
