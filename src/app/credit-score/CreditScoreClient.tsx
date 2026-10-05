"use client"
// CreditKlick - Credit Score Client Component (Fully Responsive Mobile & Desktop)

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
    Star,
    StarHalf,
    Loader2,
    CheckCircle2,
    ShieldCheck,
    Lock,
    Sparkles,
    Check,
    ArrowRight,
    TrendingUp,
    FileText,
    Gift
} from 'lucide-react'
import toast from 'react-hot-toast'
import { verificationAPI } from '@/services/api'
import Cookies from 'js-cookie'

const scoremeter = '/images/Cibil/scoremeter.png'
const badge = '/images/Cibil/badge.png'
const calendar = '/images/Cibil/calendar.png'
const graph = '/images/Cibil/graph.png'
const testimonial = '/images/Cibil/testimonial.png'
const joinck = '/images/Refine/refineProgram2.png'

function FormDesign() {
    return (
        <div className="pr-4 lg:pr-8 flex flex-col justify-center h-full">
            <div className="mb-4">
                <Image
                    src={scoremeter}
                    alt="CRIF Score Meter"
                    width={320}
                    height={160}
                    priority
                    className="object-contain w-auto max-h-36"
                />
            </div>
            <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#dbe8fd] text-[#1f52db] mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    100% Free Report
                </span>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Get Your FREE <br />
                    <span className="text-[#1f52db]">CRIF Credit Report</span>
                </h1>
                <p className="text-sm text-slate-600 mt-2 max-w-md leading-relaxed">
                    Check your official RBI-authorized credit score in under 2 minutes. Checking your own score has zero impact on your credit history.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 pt-2 border-t border-slate-200">
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Image src={badge} alt="Offers" width={40} height={40} className="w-9 h-9 object-contain mb-1" />
                    <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                        Best Loan & Card Offers
                    </p>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Image src={graph} alt="Insights" width={40} height={40} className="w-9 h-9 object-contain mb-1" />
                    <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                        Score Improvement Tips
                    </p>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Image src={calendar} alt="Report" width={40} height={40} className="w-9 h-9 object-contain mb-1" />
                    <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                        Free Monthly Updates
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Powered by <strong className="text-slate-800 font-bold">CRIF High Mark</strong> • RBI Licensed</span>
            </div>
        </div>
    )
}

function JoinCK() {
    return (
        <div className="max-w-6xl mx-auto px-4 my-8 sm:my-14">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 items-center bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-blue-50/80 rounded-2xl p-6 sm:p-10 border border-blue-100 shadow-sm">
                <div className="flex flex-col text-center md:text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1f52db] mb-2">
                        SMART CREDIT MANAGEMENT
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Join <span className="text-[#1f52db]">CREDITKLICK</span> &amp; Monitor Your Credit Score
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
                        Stay protected with real-time bureau alerts, personalized pre-approved loans, and continuous dispute resolution.
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-5 text-xs sm:text-sm font-semibold text-slate-700">
                        <span className="inline-flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#1f52db]" /> Free 4-Bureau Insights
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#1f52db]" /> Zero Score Impact
                        </span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl shadow-lg overflow-hidden aspect-[4/3] bg-white border border-blue-100">
                        <Image
                            src={joinck}
                            alt="Join CreditKlick"
                            fill
                            className="object-contain p-2"
                            sizes="(max-width: 768px) 90vw, 40vw"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function HowitWorks() {
    const steps = [
        {
            num: "01",
            title: "Credit Monitoring",
            desc: "Track your CRIF credit score monthly at zero cost. Catch negative reporting and errors before they hurt you."
        },
        {
            num: "02",
            title: "Credit Education",
            desc: "Learn exact score factors including credit utilization, repayment history, and hard inquiries with actionable tips."
        },
        {
            num: "03",
            title: "Pre-Approved Offers",
            desc: "Discover credit cards and personal loans customized to your exact score bracket with lowest interest rates."
        }
    ]

    return (
        <div className="max-w-6xl mx-auto px-4 my-10 sm:my-16">
            <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1f52db] mb-1.5 inline-block">
                    SIMPLE &amp; TRANSPARENT
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    How It Works?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                    Your complete credit report in three seamless steps
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {steps.map((s) => (
                    <div
                        key={s.num}
                        className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col"
                    >
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#dbe8fd] text-[#1f52db] font-extrabold text-sm mb-4">
                            {s.num}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                            {s.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-grow">
                            {s.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Testimonials() {
    return (
        <div className="max-w-6xl mx-auto px-4 my-10 sm:my-16">
            <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1f52db] mb-1.5 inline-block">
                    USER EXPERIENCES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Trusted by 200,000+ Borrowers
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                    Real borrowers who improved their financial standing with CreditKlick
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 flex flex-col items-center justify-center text-center">
                    <Image
                        src={testimonial}
                        alt="Happy Users"
                        width={220}
                        height={160}
                        className="w-auto h-28 object-contain mb-3"
                    />
                    <div className="flex text-amber-400 gap-0.5 mb-1.5">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-base font-bold text-slate-900">4.8 / 5 Rating</p>
                    <p className="text-xs text-slate-500">Based on 25,000+ verified customer reviews</p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex text-amber-400 gap-0.5 mb-3">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                            &ldquo;My scores have improved significantly over the past year. Heartfelt thanks for your quick report analysis and professional approach!&rdquo;
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900 uppercase">Neha Sharma</p>
                        <p className="text-xs text-[#1f52db] font-semibold">Delhi NCR • Score +84 Pts</p>
                    </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex text-amber-400 gap-0.5 mb-3">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <StarHalf className="w-4 h-4 fill-current" />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                            &ldquo;I was surprised to find an erroneous card overdue. CreditKlick helped me get the zero-due certificate and my home loan was approved at 8.45%.&rdquo;
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900 uppercase">Pawan Kohli</p>
                        <p className="text-xs text-[#1f52db] font-semibold">Mumbai • Approved for ₹45L Loan</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CScontent() {
    const content = [
        {
            title: "Why Check Your Credit Score?",
            text: "Your credit score is a 3-digit summary of your financial reliability. Banks and NBFCs use it to decide loan approvals, credit limits, and interest rates."
        },
        {
            title: "Soft Inquiry with Zero Impact",
            text: "Checking your own credit score on CreditKlick is treated as a soft inquiry. It will never lower or negatively impact your score."
        },
        {
            title: "Stay Ahead of Identity Theft & Errors",
            text: "Over 1 in 4 credit reports contain clerical errors or unauthorized inquiries. Monthly checks ensure you catch and dispute discrepancies quickly."
        }
    ]

    return (
        <div className="py-10 bg-slate-50 border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-4">
                <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                    Everything You Need to Know About Credit Scores
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {content.map((item, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="text-sm font-bold text-[#1f52db] mb-2 flex items-center gap-1.5">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                {item.title}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function CreditScoreClient() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [agreed, setAgreed] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', dob: '', pin: '', pan: '', mobile: '' })
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('')
    const [formErrors, setFormErrors] = useState<any>({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        const cibil = Cookies.get('cibil')
        if (cibil) {
            try {
                const cibilData = JSON.parse(cibil)
                if (cibilData && cibilData.data && cibilData.data !== 'undefined') {
                    router.push('/report-analysis')
                }
            } catch (e) {
                Cookies.remove('cibil')
            }
        }
    }, [router])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const handleGender = (val: string) => setGender(val)
    const handleStatus = (val: string) => setStatus(val)

    const handleMobileDigit = (e: any) => {
        let inputValue = e.target.value.replace(/\D/g, '')
        if (inputValue.length > 10) inputValue = inputValue.slice(0, 10)
        e.target.value = inputValue
        setFormData(prev => ({ ...prev, mobile: inputValue }))
    }

    const handlePinDigit = (e: any) => {
        let inputPin = e.target.value.replace(/\D/g, '')
        if (inputPin.length > 6) inputPin = inputPin.slice(0, 6)
        e.target.value = inputPin
        setFormData(prev => ({ ...prev, pin: inputPin }))
    }

    const handleDateDigit = (e: any) => {
        let inputDate = e.target.value.replace(/\D/g, '')
        if (inputDate.length >= 2) inputDate = inputDate.slice(0, 2) + '-' + inputDate.slice(2)
        if (inputDate.length >= 5) inputDate = inputDate.slice(0, 5) + '-' + inputDate.slice(5)
        inputDate = inputDate.slice(0, 10)
        e.target.value = inputDate
        setFormData(prev => ({ ...prev, dob: inputDate }))
    }

    const validateForm = () => {
        let errors: any = {}
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-z0-9-]+\.[a-z]{2,6}$/i
        const pinRegex = /^[0-9]{6}$/
        const panRegex = /^[a-zA-Z]{3}[cphfatbljgCPHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/
        const phoneRegex = /^[6-9]{1}[0-9]{9}$/

        if (!formData.name.trim()) errors.name = 'Please enter your Full Name'
        if (!formData.email.trim()) errors.email = 'Please enter your Email'
        else if (!emailRegex.test(formData.email.trim())) errors.email = 'Enter a valid Email Address'
        if (!formData.dob) errors.dob = 'Enter D.O.B (DD-MM-YYYY)'
        if (!formData.pin) errors.pin = 'Enter 6-digit Pincode'
        else if (!pinRegex.test(formData.pin)) errors.pin = 'Enter a valid 6-digit Pincode'
        if (!formData.pan.trim()) errors.pan = 'Enter 10-character PAN number'
        else if (!panRegex.test(formData.pan.trim())) errors.pan = 'Enter valid PAN (e.g. ABCDE1234F)'
        if (!formData.mobile) errors.mobile = 'Enter 10-digit mobile number'
        else if (!phoneRegex.test(formData.mobile)) errors.mobile = 'Enter valid 10-digit mobile'
        if (!gender) errors.selectedError = 'Please select your Gender'
        if (!status) errors.status = 'Please select Employment Status'
        if (!agreed) errors.agree = 'Please agree to authorize bureau fetch and accept Terms & Conditions.'

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!validateForm()) {
            toast.error('Please fill all required fields correctly')
            return
        }

        setIsLoading(true)
        try {
            const response = await verificationAPI.init({
                mobile: formData.mobile,
                fName: formData.name.trim(),
                email: formData.email.trim(),
                pCode: formData.pin,
                Pan: formData.pan.trim().toUpperCase(),
                dob: formData.dob,
                profession: status,
                gender: gender,
                isLogin: false
            })
            const data = response.data

            if (!data.success) throw new Error(data.error || 'Verification failed')

            setIsSubmitted(true)
            toast.success('Form Submitted Successfully! Our team is processing your CRIF report.', {
                duration: 5000
            })

        } catch (error: any) {
            console.error('Submission Error:', error)
            toast.error(error.response?.data?.error || error.message || 'Submission failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#1f52db] to-[#1640b3] text-white py-4 sm:py-6 px-4 text-center shadow-sm">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-white/15 text-white backdrop-blur-sm mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        Free CRIF High Mark Report • 0 Impact On Score
                    </span>
                    <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                        Check Your Free Credit Score
                    </h1>
                    <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-lg">
                        Get your full credit analysis with personal loan &amp; card pre-approvals in seconds.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-10">
                {/* Mobile Intro Pill Bar (Mobile Only) */}
                <div className="block md:hidden mb-4 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-around text-center text-[11px] font-semibold text-slate-700 divide-x divide-slate-200">
                        <div className="px-2 flex flex-col items-center">
                            <span className="text-[#1f52db] font-extrabold text-xs">⚡ 2-Min</span>
                            <span className="text-slate-500 text-[10px]">Instant Fetch</span>
                        </div>
                        <div className="px-2 flex flex-col items-center">
                            <span className="text-emerald-600 font-extrabold text-xs">🔒 100% Safe</span>
                            <span className="text-slate-500 text-[10px]">No Score Drop</span>
                        </div>
                        <div className="px-2 flex flex-col items-center">
                            <span className="text-indigo-600 font-extrabold text-xs">₹0 Free</span>
                            <span className="text-slate-500 text-[10px]">Official CRIF</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    {/* Left Column (Desktop Only): Value prop */}
                    <div className="hidden md:block md:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 lg:p-8">
                        <FormDesign />
                    </div>

                    {/* Right Column: The Form */}
                    <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-7">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                                            Enter Your Basic Details
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Needed to securely fetch your bureau report
                                        </p>
                                    </div>
                                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                        <Lock className="w-3 h-3" /> 256-bit Encrypted
                                    </span>
                                </div>

                                {/* 2 Columns per row across mobile and desktop */}
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 truncate">
                                            Full Name <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="As per PAN"
                                            className="w-full h-10 sm:h-12 px-2.5 sm:px-3.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-300 focus:border-[#1f52db] focus:ring-2 focus:ring-blue-100 outline-none transition text-slate-800 placeholder:text-slate-400 bg-white"
                                            required
                                        />
                                        {formErrors.name && (
                                            <p className="text-[10px] sm:text-xs text-rose-500 font-medium mt-0.5 leading-tight">{formErrors.name}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 truncate">
                                            Email Address <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="name@example.com"
                                            className="w-full h-10 sm:h-12 px-2.5 sm:px-3.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-300 focus:border-[#1f52db] focus:ring-2 focus:ring-blue-100 outline-none transition text-slate-800 placeholder:text-slate-400 bg-white"
                                            required
                                        />
                                        {formErrors.email && (
                                            <p className="text-[10px] sm:text-xs text-rose-500 font-medium mt-0.5 leading-tight">{formErrors.email}</p>
                                        )}
                                    </div>

                                    {/* Date of Birth */}
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 truncate">
                                            Date of Birth <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="dob"
                                            value={formData.dob}
                                            onInput={handleDateDigit}
                                            maxLength={10}
                                            placeholder="DD-MM-YYYY"
                                            className="w-full h-10 sm:h-12 px-2.5 sm:px-3.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-300 focus:border-[#1f52db] focus:ring-2 focus:ring-blue-100 outline-none transition text-slate-800 placeholder:text-slate-400 bg-white"
                                            required
                                        />
                                        {formErrors.dob && (
                                            <p className="text-[10px] sm:text-xs text-rose-500 font-medium mt-0.5 leading-tight">{formErrors.dob}</p>
                                        )}
                                    </div>

                                    {/* Pincode */}
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 truncate">
                                            Pincode <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="pin"
                                            value={formData.pin}
                                            onInput={handlePinDigit}
                                            maxLength={6}
                                            placeholder="e.g. 110001"
                                            className="w-full h-10 sm:h-12 px-2.5 sm:px-3.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-300 focus:border-[#1f52db] focus:ring-2 focus:ring-blue-100 outline-none transition text-slate-800 placeholder:text-slate-400 bg-white"
                                            required
                                        />
                                        {formErrors.pin && (
                                            <p className="text-[10px] sm:text-xs text-rose-500 font-medium mt-0.5 leading-tight">{formErrors.pin}</p>
                                        )}
                                    </div>

                                    {/* PAN Number */}
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 truncate">
                                            PAN Number <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="pan"
                                            value={formData.pan}
                                            onChange={handleChange}
                                            maxLength={10}
                                            placeholder="ABCDE1234F"
                                            className="w-full h-10 sm:h-12 px-2.5 sm:px-3.5 text-xs sm:text-sm font-bold uppercase rounded-lg border border-slate-300 focus:border-[#1f52db] focus:ring-2 focus:ring-blue-100 outline-none transition text-slate-800 placeholder:text-slate-400 bg-white"
                                            required
                                        />
                                        {formErrors.pan && (
                                            <p className="text-[10px] sm:text-xs text-rose-500 font-medium mt-0.5 leading-tight">{formErrors.pan}</p>
                                        )}
                                    </div>

                                    {/* Mobile Number */}
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 truncate">
                                            Mobile Number <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] sm:text-xs font-bold text-slate-500">
                                                +91
                                            </span>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                value={formData.mobile}
                                                onInput={handleMobileDigit}
                                                maxLength={10}
                                                placeholder="10 digits"
                                                className="w-full h-10 sm:h-12 pl-9 sm:pl-12 pr-2 sm:pr-3.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-300 focus:border-[#1f52db] focus:ring-2 focus:ring-blue-100 outline-none transition text-slate-800 placeholder:text-slate-400 bg-white"
                                                required
                                            />
                                        </div>
                                        {formErrors.mobile && (
                                            <p className="text-[10px] sm:text-xs text-rose-500 font-medium mt-0.5 leading-tight">{formErrors.mobile}</p>
                                        )}
                                    </div>

                                    {/* Gender (Comfortable Pill Radios in Col 1) */}
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 truncate">
                                            Gender <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-3 gap-1 sm:gap-2">
                                            {[
                                                { label: 'Male', val: 'male' },
                                                { label: 'Female', val: 'female' },
                                                { label: 'Other', val: 'others' }
                                            ].map((g) => (
                                                <button
                                                    key={g.val}
                                                    type="button"
                                                    onClick={() => handleGender(g.val)}
                                                    className={`h-10 sm:h-11 rounded-lg text-[11px] sm:text-xs font-semibold transition border flex items-center justify-center px-0.5 ${
                                                        gender === g.val
                                                            ? 'bg-[#dbe8fd] border-[#1f52db] text-[#1f52db] shadow-xs'
                                                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                                    }`}
                                                >
                                                    {g.label}
                                                </button>
                                            ))}
                                        </div>
                                        {formErrors.selectedError && (
                                            <p className="text-[10px] sm:text-xs text-rose-500 font-medium mt-0.5 leading-tight">{formErrors.selectedError}</p>
                                        )}
                                    </div>

                                    {/* Employment Status (Comfortable Pill Radios in Col 2) */}
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 truncate">
                                            Status <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                            {[
                                                { labelMobile: 'Salaried', labelDesktop: 'Salaried', val: 'Salaried' },
                                                { labelMobile: 'Self-Emp', labelDesktop: 'Self Employed', val: 'Self Employed' }
                                            ].map((s) => (
                                                <button
                                                    key={s.val}
                                                    type="button"
                                                    onClick={() => handleStatus(s.val)}
                                                    className={`h-10 sm:h-11 rounded-lg text-[11px] sm:text-xs font-semibold transition border flex items-center justify-center px-1 ${
                                                        status === s.val
                                                            ? 'bg-[#dbe8fd] border-[#1f52db] text-[#1f52db] shadow-xs'
                                                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                                    }`}
                                                >
                                                    <span className="sm:hidden">{s.labelMobile}</span>
                                                    <span className="hidden sm:inline">{s.labelDesktop}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {formErrors.status && (
                                            <p className="text-[10px] sm:text-xs text-rose-500 font-medium mt-0.5 leading-tight">{formErrors.status}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Terms & Conditions Consent Box */}
                                <div className="mt-4 p-3 bg-slate-50/80 rounded-xl border border-slate-200">
                                    <label className="flex items-start gap-3 cursor-pointer text-left">
                                        <input
                                            type="checkbox"
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                            className="mt-0.5 w-4 h-4 rounded text-[#1f52db] border-slate-300 focus:ring-[#1f52db] shrink-0 cursor-pointer"
                                        />
                                        <span className="text-[11px] sm:text-xs leading-relaxed text-slate-600">
                                            By proceeding, you voluntarily agree to provide your personal details, and authorize &lsquo;Creditklick Services Private Limited&rsquo; to obtain your credit profile/score from CRIF High Mark. You also agree to our{' '}
                                            <Link href="/privacy-policy" className="font-semibold text-[#1f52db] underline">
                                                Privacy Policy
                                            </Link>{' '}
                                            and{' '}
                                            <Link href="/terms-conditions" className="font-semibold text-[#1f52db] underline">
                                                Terms &amp; Conditions
                                            </Link>.
                                        </span>
                                    </label>
                                    {formErrors.agree && (
                                        <p className="text-xs text-rose-500 font-medium mt-1.5 pl-7">{formErrors.agree}</p>
                                    )}
                                </div>

                                {/* Submit CTA */}
                                <div className="mt-5 flex flex-col items-center">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 rounded-xl bg-[#1f52db] hover:bg-[#1640b3] text-white font-bold text-sm sm:text-base shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="animate-spin w-4 h-4" /> Fetching Your CRIF Score...
                                            </span>
                                        ) : (
                                            <>
                                                <span>Check Credit Score Now</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>

                                    <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500 mt-2.5">
                                        <span className="inline-flex items-center gap-1">
                                            <Lock className="w-3.5 h-3.5 text-slate-400" /> 128-bit Bank Encryption
                                        </span>
                                        <span>•</span>
                                        <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                                            <Check className="w-3.5 h-3.5" /> Instant WhatsApp Updates
                                        </span>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="max-w-md mx-auto my-4 p-5 sm:p-6 bg-white border border-blue-100 rounded-2xl shadow-sm text-left animate-fadeIn">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-[#dbe8fd] rounded-full flex items-center justify-center text-[#1f52db] shrink-0">
                                        <CheckCircle2 className="w-6 h-6 text-[#1f52db]" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                                            Application Received! 🎉
                                        </h3>
                                        <p className="text-xs text-slate-600 mt-0.5">
                                            Thank you{formData.name ? `, ${formData.name}` : ''}! Your CRIF report is being generated.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 my-4 space-y-2 text-xs">
                                    {formData.mobile && (
                                        <div className="flex items-center justify-between border-b border-blue-100/80 pb-2">
                                            <span className="text-slate-600 font-medium">Mobile:</span>
                                            <span className="font-semibold text-slate-900">+91 {formData.mobile}</span>
                                        </div>
                                    )}
                                    {formData.email && (
                                        <div className="flex items-center justify-between border-b border-blue-100/80 pb-2">
                                            <span className="text-slate-600 font-medium">Email:</span>
                                            <span className="font-semibold text-slate-900">{formData.email}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between pt-0.5">
                                        <span className="text-slate-600 font-medium">Status:</span>
                                        <span className="font-bold text-[#1f52db] bg-[#dbe8fd] px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider">
                                            Under Processing
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSubmitted(false)
                                            setFormData({ name: '', email: '', dob: '', pin: '', pan: '', mobile: '' })
                                            setGender('')
                                            setStatus('')
                                            setAgreed(false)
                                        }}
                                        className="w-full bg-[#1f52db] hover:bg-[#1640b3] text-white font-semibold py-2.5 rounded-xl text-xs shadow-sm transition-all text-center cursor-pointer"
                                    >
                                        Check Another Credit Score
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <JoinCK />
            <HowitWorks />
            <Testimonials />
            <CScontent />
        </div>
    )
}
