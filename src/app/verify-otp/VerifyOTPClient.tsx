"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Phone, RefreshCw, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { verificationAPI } from '@/services/api'

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function VerifyOTPClient() {
    const router = useRouter()
    const [pageState, setPageState] = useState<any>(null)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [isVerifying, setIsVerifying] = useState(false)
    const [countdown, setCountdown] = useState(30)
    const [canResend, setCanResend] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        const stored = sessionStorage.getItem('otpVerificationState')
        if (!stored) {
            router.push('/credit-score')
            return
        }
        const parsed = JSON.parse(stored)
        setPageState(parsed)

        // Auto-focus first input
        setTimeout(() => inputRefs.current[0]?.focus(), 100)
    }, [router])

    const phone = pageState?.phone || pageState?.mobile || ''

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [countdown])

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.slice(-1)
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 6)
        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('').concat(['', '', '', '', '', '']).slice(0, 6)
            setOtp(newOtp)
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
        }
    }

    const handleVerify = async () => {
        const otpValue = otp.join('')
        if (otpValue.length !== 6) {
            toast.error('Please enter complete OTP')
            return
        }

        setIsVerifying(true)
        try {
            const flow = pageState?.flow || 'MTALKZ'
            const stageOneId = pageState?.stageOneId
            const stageTwoId = pageState?.stageTwoId
            const userDetails = pageState?.userDetails

            const response = await verificationAPI.submit({
                mobile: phone,
                otp: otpValue,
                flow,
                stageOneId,
                stageTwoId,
                userDetails
            })
            const data = response.data

            if (!data.success && !data.token && !data.report) { // Basic success check
                // Some APIs might return errors in 'data' even with 200 OK
                if (data.error) throw new Error(data.error)
            }

            // Successful verification - Store user data
            Cookies.set('user', JSON.stringify(data.user || { phone }), { expires: 7 })
            if (data.token) {
                Cookies.set('token', data.token, { expires: 7 })
                Cookies.set('accessToken', data.token, { expires: 7 })
            }

            // Store credit report if available
            if (data.report) {
                Cookies.set('cibil', JSON.stringify({
                    data: JSON.stringify(data.report),
                    date: new Date().toISOString()
                }), { expires: 7 })
            }

            toast.success('OTP verified successfully!')

            // Clean up session storage
            sessionStorage.removeItem('otpVerificationState')

            router.push('/report-analysis')
        } catch (error: any) {
            console.error('Verification Error:', error)
            const msg = error.response?.data?.error || error.message || 'Invalid OTP. Please try again.'
            toast.error(msg)
        } finally {
            setIsVerifying(false)
        }
    }

    const handleResend = async () => {
        setCanResend(false)
        setCountdown(30)

        try {
            const userDetails = pageState?.userDetails || {}

            const response = await verificationAPI.init({
                mobile: phone,
                fName: userDetails.name || userDetails.fName, // Handle deviation in name field
                email: userDetails.email,
                pCode: userDetails.pin || userDetails.pCode, // Handle deviation in pin field
                Pan: userDetails.pan || userDetails.Pan,
                dob: userDetails.dob,
                profession: userDetails.profession || userDetails.status, // Handle deviation
                gender: userDetails.gender
            })
            const data = response.data

            if (data.success) {
                // Update state with new stage IDs if using Experian
                if (data.flow === 'EXPERIAN') {
                    setPageState((prev: any) => ({
                        ...prev,
                        stageOneId: data.stageOneId,
                        stageTwoId: data.stageTwoId
                    }))
                }
                toast.success('OTP sent successfully!')
            } else {
                toast.error(data.error || 'Failed to resend OTP')
            }
        } catch (error) {
            console.error('Resend OTP Error:', error)
            toast.error('Failed to resend OTP')
        }
    }

    if (!pageState) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gray-50">
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                <Card className="p-8 text-center bg-white shadow-xl rounded-2xl">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Phone className="h-10 w-10 text-blue-600" />
                    </div>

                    <h1 className="text-2xl font-bold mb-2 text-gray-800">Verify Your Mobile</h1>
                    <p className="text-gray-600 mb-6">
                        We&apos;ve sent a 6-digit OTP to <br />
                        <span className="font-semibold text-gray-900">+91 {phone.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
                    </p>

                    {/* OTP Inputs */}
                    <div className="flex justify-center gap-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el }}
                                type="text"
                                inputMode="numeric"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-10 h-12 md:w-12 md:h-14 text-center text-xl md:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                maxLength={1}
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <Button
                        className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-transform transform active:scale-95"
                        onClick={handleVerify}
                        disabled={isVerifying || otp.join('').length !== 6}
                    >
                        {isVerifying ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Verifying...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Verify OTP
                            </span>
                        )}
                    </Button>

                    {/* Resend */}
                    <div className="text-sm text-gray-600">
                        {canResend ? (
                            <button
                                onClick={handleResend}
                                className="text-blue-600 hover:underline font-medium flex items-center justify-center gap-2 mx-auto"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Resend OTP
                            </button>
                        ) : (
                            <p>
                                Resend OTP in <span className="font-semibold text-blue-600">{countdown}s</span>
                            </p>
                        )}
                    </div>

                    {/* Help */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Didn&apos;t receive the OTP?{' '}
                            <a
                                href="https://wa.me/8800367367?text=I'm%20facing%20an%20issue%20with%20OTP"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:underline"
                            >
                                Contact Support
                            </a>
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
