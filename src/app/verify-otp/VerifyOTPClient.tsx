"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Home, ArrowLeft, ShieldCheck, FileCheck, Phone, User, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function VerifyOTPClient() {
    const router = useRouter()
    const [pageState, setPageState] = useState<any>(null)

    useEffect(() => {
        const stored = sessionStorage.getItem('otpVerificationState')
        if (stored) {
            try {
                setPageState(JSON.parse(stored))
            } catch (e) {
                console.error('Error parsing OTP verification state:', e)
            }
        }
    }, [])

    const phone = pageState?.phone || pageState?.userDetails?.mobile || ''
    const userDetails = pageState?.userDetails || {}

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-slate-50 relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="w-full max-w-lg"
            >
                <Card className="p-8 md:p-10 text-center bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border border-emerald-100/80">
                    {/* Animated Checkmark Badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                        className="w-24 h-24 bg-emerald-50 border-4 border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
                    >
                        <CheckCircle2 className="h-14 w-14 text-emerald-600 stroke-[2.5]" />
                    </motion.div>

                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                        Form Submitted Successfully!
                    </h1>

                    <p className="text-slate-600 text-sm md:text-base mb-6 leading-relaxed">
                        Thank you for submitting your details. Your form has been received and is being processed by our team.
                    </p>

                    {/* Submitted Info Card */}
                    {(phone || userDetails.name || userDetails.email) && (
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 md:p-5 mb-8 text-left space-y-3 shadow-sm">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <FileCheck className="w-4 h-4 text-emerald-600" /> Submitted Details
                            </div>

                            {userDetails.name && (
                                <div className="flex items-center text-sm text-slate-700">
                                    <User className="w-4 h-4 mr-2.5 text-slate-400 shrink-0" />
                                    <span className="font-semibold text-slate-900">{userDetails.name}</span>
                                </div>
                            )}

                            {phone && (
                                <div className="flex items-center text-sm text-slate-700">
                                    <Phone className="w-4 h-4 mr-2.5 text-slate-400 shrink-0" />
                                    <span className="font-semibold text-slate-900">+91 {phone}</span>
                                </div>
                            )}

                            {userDetails.email && (
                                <div className="flex items-center text-sm text-slate-700">
                                    <Mail className="w-4 h-4 mr-2.5 text-slate-400 shrink-0" />
                                    <span className="font-semibold text-slate-900">{userDetails.email}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            onClick={() => router.push('/')}
                        >
                            <Home className="w-4 h-4" /> Go to Home
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                            onClick={() => router.push('/credit-score')}
                        >
                            <ArrowLeft className="w-4 h-4" /> Check Another Score
                        </Button>
                    </div>

                    {/* Security Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
                        <ShieldCheck className="w-4 h-4 text-blue-500" /> 256-Bit SSL Encrypted & Secure
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}

