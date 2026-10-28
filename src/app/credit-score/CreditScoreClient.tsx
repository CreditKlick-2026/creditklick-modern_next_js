"use client"
// CreditKlick - Credit Score Client Component

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
    Star,
    StarHalf,
    Loader2,
    CheckCircle2,
    CheckCircle,
    Gauge,
    GraduationCap,
    CreditCard,
    Smartphone,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { verificationAPI } from '@/services/api'
import Cookies from 'js-cookie'
import './credit-score.css'


const scoremeter = '/images/Cibil/scoremeter.png'
const badge = '/images/Cibil/badge.png'
const calendar = '/images/Cibil/calendar.png'
const graph = '/images/Cibil/graph.png'
const testimonial = '/images/Cibil/testimonial.png'
const joinck = '/images/App.png'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.creditklick.creditklick'

function FormDesign() {
    return (
        <div className="pl-4">
            <div>
                <Image src={scoremeter} alt="Score Meter" width={150} height={150} className="flex pl-10 object-contain w-auto h-auto" />
            </div>
            <div>
                <h1 className="lg:text-5xl text-3xl text-brand font-thin">
                    Get Your FREE <br /> CRIF Credit Report{" "}
                </h1>
                <p className="text-sm font-thin text-brand">
                    When you ask a bank for a loan or credit card, they want to know
                    your credit score.
                </p>
            </div>
            <div className="flex gap-x-4 p-2 my-4">
                <span className="w-16">
                    <Image src={badge} alt="Offers" width={64} height={64} className="w-full h-auto object-contain" />
                    <p className="text-[8px] px-2 py-1">
                        Get best offers on Loan & Car
                    </p>
                </span>
                <span className="w-16">
                    <Image src={graph} alt="Insights" width={64} height={64} className="w-full h-auto object-contain" />
                    <p className="text-[8px] px-2 py-1">Insights for better score</p>
                </span>
                <span className="w-16">
                    <Image src={calendar} alt="Report" width={64} height={64} className="w-full h-auto object-contain" />
                    <p className="text-[8px] px-2 py-1">Free monthly credit report</p>
                </span>
            </div>

            <span className="flex text-xs gap-x-1 mt-10 items-center text-gray-500 font-medium">
                {" "}
                powered by <span className="font-bold text-brand">CRIF High Mark</span>
            </span>
        </div>
    )
}

function JoinCK() {
    return (
        <section className="cs-join">
            <div className="cs-wrap cs-join-inner">
                <div className="cs-join-copy">
                    <p className="cs-eyebrow">CreditKlick App</p>
                    <h2 style={{ marginTop: '0.4rem' }}>
                        Join <span>CREDITKLICK</span> and monitor your Credit Score
                    </h2>
                    <p className="cs-join-sub">
                        Track your score, read your full report and get tools to improve it &mdash; all in one app.
                    </p>
                    <ul className="cs-join-list">
                        <li><CheckCircle aria-hidden="true" /> Free credit score &amp; report</li>
                        <li><CheckCircle aria-hidden="true" /> Score insights and improvement tools</li>
                        <li><CheckCircle aria-hidden="true" /> Loan &amp; credit card offers</li>
                    </ul>
                    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="cs-join-cta">
                        <Smartphone aria-hidden="true" />
                        Get it on Google Play
                    </a>
                </div>
                <div className="cs-join-art">
                    <Image src={joinck} alt="CreditKlick mobile app" width={280} height={615} />
                </div>
            </div>
        </section>
    )
}

function HowitWorks() {
    const steps = [
        { icon: Gauge, title: 'Credit Monitoring', text: 'You can monitor your credit score and credit report for free.' },
        { icon: GraduationCap, title: 'Credit Education', text: 'With insights and alerts tailored to your needs, stay on top of your score.' },
        { icon: CreditCard, title: 'Credit Offers', text: 'Discover and review which credit cards meet your financial needs.' },
    ]
    return (
        <section className="cs-section">
            <div className="cs-wrap">
                <div className="cs-center">
                    <p className="cs-eyebrow">How it works</p>
                    <h2 className="cs-h2">How it works?</h2>
                </div>
                <div className="cs-steps">
                    {steps.map(({ icon: Icon, title, text }, i) => (
                        <div key={title} className="cs-step">
                            <span className="cs-step-num" aria-hidden="true">0{i + 1}</span>
                            <span className="cs-step-icon"><Icon aria-hidden="true" /></span>
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Testimonials() {
    return (
        <section className="cs-section" style={{ paddingTop: 0 }}>
            <div className="cs-wrap">
                <div className="cs-center">
                    <p className="cs-eyebrow">Testimonials</p>
                    <h2 className="cs-h2">Trusted by 200K+ users like you</h2>
                </div>
                <div className="cs-reviews">
                    <div className="cs-review-photo">
                        <Image src={testimonial} alt="Happy CreditKlick customer" width={300} height={300} />
                    </div>
                    <figure className="cs-review" style={{ margin: 0 }}>
                        <div className="cs-stars" aria-label="5 out of 5 stars">
                            <Star /><Star /><Star /><Star /><Star />
                        </div>
                        <blockquote>
                            My scores have improved significantly in a period of 1 year. My
                            heartfelt thanks for your support and I am pleased with your
                            professional approach.
                        </blockquote>
                        <figcaption className="cs-review-name">Neha Sharma</figcaption>
                    </figure>
                    <figure className="cs-review" style={{ margin: 0 }}>
                        <div className="cs-stars" aria-label="4.5 out of 5 stars">
                            <Star /><Star /><Star /><Star /><StarHalf />
                        </div>
                        <blockquote>
                            I am very happy to tell you that my Axis Bank credit card problem
                            has been solved and there is no outstanding amount to be paid from
                            my side. thanks for your help
                        </blockquote>
                        <figcaption className="cs-review-name">Pawan Kohli</figcaption>
                    </figure>
                </div>
            </div>
        </section>
    )
}

function CScontent() {
    const content = [
        { text: "Welcome to CreditKlick, where you can check your credit score and gain valuable insights into your credit history." },
        { text: "Your credit score is important. It affects your ability to get credit, loans and even a place to rent or a job. It's a numerical representation of your creditworthiness, based on your credit history, payment behavior, and outstanding debts." },
        { text: "Our platform provides a simple and convenient way to access your credit score and credit report from the major credit bureaus. Sign up for our service to regularly monitor your credit score." },
        { text: "Stay on top of any changes or updates to your credit history" },
        { text: "Our website is designed to help you. It provides valuable information about credit scores. This includes how they are calculated, why they are important, and how to improve them." },
        { text: "Don't let a low credit score hold you back from achieving your dreams. Sign up for our credit score check service today and take control of your financial future." },
    ]

    return (
        <section className="cs-section cs-why">
            <div className="cs-wrap">
                <div className="cs-center">
                    <p className="cs-eyebrow">Know your score</p>
                    <h2 className="cs-h2">Why check your credit score?</h2>
                </div>
                <ul className="cs-why-list">
                    {content.map((item) => (
                        <li key={item.text}>
                            <CheckCircle2 aria-hidden="true" />
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

function Switch({ checked, onChange, children }: { checked: boolean, onChange: (checked: boolean) => void, children: React.ReactNode }) {
    return (
        <div className="flex items-start my-3 text-left">
            <button
                type="button"
                onClick={() => onChange(!checked)}
                style={checked ? { backgroundColor: '#155dfc' } : undefined}
                className={`flex w-8 mr-3 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out mt-0.5 ${checked ? '' : 'bg-gray-200'}`}
            >
                <span className="sr-only">Agree to policies</span>
                <span
                    aria-hidden="true"
                    className={`h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out ${checked ? 'translate-x-3.5' : 'translate-x-0'}`}
                />
            </button>
            <span className="text-xs leading-5 text-gray-600">{children}</span>
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
    const handleGender = (e: any) => setGender(e.target.value)
    const handleStatus = (e: any) => setStatus(e.target.value)

    const handleMobileDigit = (e: any) => {
        let inputValue = e.target.value
        if (inputValue.length > 10) {
            inputValue = inputValue.slice(0, 10)
            e.target.value = inputValue
        }
        setFormData(prev => ({ ...prev, mobile: inputValue }))
    }

    const handlePinDigit = (e: any) => {
        let inputPin = e.target.value
        if (inputPin.length > 6) {
            inputPin = inputPin.slice(0, 6)
            e.target.value = inputPin
        }
        setFormData(prev => ({ ...prev, pin: inputPin }))
    }

    const handleDateDigit = (e: any) => {
        let inputDate = e.target.value
        inputDate = inputDate.replace(/\D/g, '')
        if (inputDate.length >= 2) inputDate = inputDate.slice(0, 2) + '-' + inputDate.slice(2)
        if (inputDate.length >= 5) inputDate = inputDate.slice(0, 5) + '-' + inputDate.slice(5)
        inputDate = inputDate.slice(0, 10)
        e.target.value = inputDate
        setFormData(prev => ({ ...prev, dob: inputDate }))
    }

    const validateForm = () => {
        let errors: any = {}
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-z]+\.[a-z]{2,3}$/
        const pinRegex = /^[0-9]{6}$/
        const panRegex = /^[a-zA-Z]{3}[cphfatbljgCPHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/
        const phoneRegex = /^[6-9]{1}[0-9]{9}$/

        if (!formData.name) errors.name = 'Please enter your Name'
        if (!formData.email) errors.email = 'Please enter your Email'
        else if (!emailRegex.test(formData.email)) errors.email = 'Enter valid Email Address'
        if (!formData.dob) errors.dob = 'Please enter D.O.B.'
        if (!formData.pin) errors.pin = 'Please enter pincode'
        else if (!pinRegex.test(formData.pin)) errors.pin = 'Enter valid 6 digit pincode'
        if (!formData.pan) errors.pan = 'Please enter your PAN number'
        else if (!panRegex.test(formData.pan)) errors.pan = 'Enter valid PAN'
        if (!formData.mobile) errors.mobile = 'Please enter 10 digit mobile number'
        else if (!phoneRegex.test(formData.mobile)) errors.mobile = 'Enter valid 10 digit number'
        if (!gender) errors.selectedError = 'Please select your gender'
        if (!status) errors.status = 'Select status'
        if (!agreed) errors.agree = 'Please agree to the terms and conditions.'

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
                fName: formData.name,
                email: formData.email,
                pCode: formData.pin,
                Pan: formData.pan,
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
        <div className="min-h-screen">
            {/* Header - compact on mobile */}
            <div style={{ backgroundColor: '#dbe8fd' }} className="font-semibold text-lg md:text-2xl py-3 md:py-6 text-brand text-center tracking-wider">
                <h1>CHECK FREE CREDIT SCORE</h1>
            </div>

            {/* Main form container - reduced margins on mobile */}
            <div className="h-full mx-auto my-4 md:my-10 px-2 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-around rounded bg-white">


                    {/* Left design - desktop only */}
                    <div className="w-2/3 md:block hidden mx-auto">
                        <FormDesign />
                    </div>

                    {/* Form section */}
                    <div className="md:w-3/3 mx-auto px-2 md:px-4 w-full">
                        {!isSubmitted ? (
                            <div className="grid grid-cols-2 m-auto gap-2 md:gap-4 py-2 md:py-4">
                                {/* Full Name */}
                                <div className="p-1 md:p-2 h-auto">
                                    <label className="block text-xs sm:text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">Full Name</label>
                                    <div className="mt-1 md:mt-2.5">
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-600 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs sm:text-sm sm:leading-6" required />
                                    </div>
                                    <div className="text-xs text-red-500">{formErrors.name}</div>
                                </div>

                                {/* Email */}
                                <div className="p-1 md:p-2 h-auto">
                                    <label className="block text-xs sm:text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">Email</label>
                                    <div className="mt-1 md:mt-2.5">
                                        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email Id" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-600 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs sm:text-sm sm:leading-6" required />
                                    </div>
                                    <div className="text-xs text-red-500">{formErrors.email}</div>
                                </div>

                                {/* Date of Birth */}
                                <div className="p-1 md:p-2 h-auto">
                                    <label className="block text-xs sm:text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">D.O.B</label>
                                    <div className="mt-1 md:mt-2.5">
                                        <input type="tel" name="dob" value={formData.dob} onInput={handleDateDigit} maxLength={10} placeholder="DD-MM-YYYY" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-700 shadow-sm ring-1 ring-inset font-semibold ring-gray-300 placeholder:text-gray-400 text-xs sm:text-sm sm:leading-6" required />
                                    </div>
                                    <div className="text-xs text-red-500">{formErrors.dob}</div>
                                </div>

                                {/* Pincode */}
                                <div className="p-1 md:p-2 h-auto">
                                    <label className="block text-xs sm:text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">Pincode</label>
                                    <div className="mt-1 md:mt-2.5">
                                        <input type="number" name="pin" value={formData.pin} onInput={handlePinDigit} maxLength={6} placeholder="eg:110001" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-600 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs sm:text-sm sm:leading-6" required />
                                    </div>
                                    <div className="text-xs text-red-500">{formErrors.pin}</div>
                                </div>

                                {/* PAN */}
                                <div className="p-1 md:p-2 h-auto">
                                    <label className="block text-xs sm:text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">PAN</label>
                                    <div className="mt-1 md:mt-2.5">
                                        <input type="text" name="pan" value={formData.pan} onChange={handleChange} maxLength={10} placeholder="AAAAA1234F" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-600 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs sm:text-sm sm:leading-6 uppercase" required />
                                    </div>
                                    <div className="text-xs text-red-500">{formErrors.pan}</div>
                                </div>

                                {/* Mobile Number */}
                                <div className="p-1 md:p-2 h-auto">
                                    <label className="block text-xs sm:text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">Mobile</label>
                                    <div className="mt-1 md:mt-2.5">
                                        <input type="number" name="mobile" value={formData.mobile} onInput={handleMobileDigit} maxLength={10} placeholder="10 digit" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-600 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs sm:text-sm sm:leading-6" required />
                                    </div>
                                    <div className="text-xs text-red-500">{formErrors.mobile}</div>
                                </div>

                                {/* Gender - inline on mobile */}
                                <div className="p-1 md:p-2">
                                    <label className="block text-xs sm:text-sm md:text-lg font-semibold leading-6 text-gray-900 uppercase">GENDER</label>
                                    <div className="flex gap-2 sm:gap-3 mt-1 flex-wrap">
                                        <label className="text-xs sm:text-sm flex items-center gap-1 cursor-pointer">
                                            <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={handleGender} className="w-3.5 h-3.5" /> Male
                                        </label>
                                        <label className="text-xs sm:text-sm flex items-center gap-1 cursor-pointer">
                                            <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={handleGender} className="w-3.5 h-3.5" /> Female
                                        </label>
                                        <label className="text-xs sm:text-sm flex items-center gap-1 cursor-pointer">
                                            <input type="radio" name="gender" value="others" checked={gender === 'others'} onChange={handleGender} className="w-3.5 h-3.5" /> Others
                                        </label>
                                    </div>
                                    <div className="text-xs text-red-500">{formErrors.selectedError}</div>
                                </div>

                                {/* Employment Status - inline on mobile */}
                                <div className="p-1 md:p-2">
                                    <label className="block text-xs sm:text-sm md:text-lg font-semibold leading-6 text-gray-900 uppercase">STATUS</label>
                                    <div className="flex gap-2 sm:gap-3 mt-1 flex-wrap">
                                        <label className="text-xs sm:text-sm flex items-center gap-1 cursor-pointer">
                                            <input type="radio" name="status" value="Salaried" checked={status === 'Salaried'} onChange={handleStatus} className="w-3.5 h-3.5" /> Salaried
                                        </label>
                                        <label className="text-xs sm:text-sm flex items-center gap-1 cursor-pointer">
                                            <input type="radio" name="status" value="Self Employed" checked={status === 'Self Employed'} onChange={handleStatus} className="w-3.5 h-3.5" /> Self-Employed
                                        </label>
                                    </div>
                                    <div className="text-xs text-red-500">{formErrors.status}</div>
                                </div>

                                {/* Terms and Submit - full width */}
                                <div className="col-span-2 px-1">
                                    <Switch checked={agreed} onChange={setAgreed}>
                                        <span className="text-xs">By clicking/proceeding, you voluntarily agree to provide your personal details, and you authorize &lsquo;Creditklick Services Private Limited&rsquo; to obtain your credit profile/score from CRIF Highmark. You also agree to our <Link href="/privacy-policy" style={{ color: '#155dfc' }} className="font-semibold underline">Privacy Policy</Link> and <Link href="/terms-conditions" style={{ color: '#155dfc' }} className="font-semibold underline">Terms &amp; Conditions</Link>.</span>
                                    </Switch>
                                    <div className="text-xs text-red-500 text-center">{formErrors.agree}</div>
                                </div>

                                <div className="col-span-2 mt-2 mx-auto flex flex-col text-center px-2 sm:px-4 w-full">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        style={{ backgroundColor: '#155dfc' }}
                                        className="block w-full rounded-md px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-50 cursor-pointer transition"
                                        onClick={handleSubmit}
                                    >
                                        {isLoading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Processing...</span> : 'Check Credit Score Now'}
                                    </button>
                                    <p className="text-[10px] text-center mt-1.5 text-gray-400">CreditKlick uses 128-bit encryption to secure your information</p>
                                    <p className="text-[10px] text-center text-green-500 font-medium">Receive updates via Whatsapp</p>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-md mx-auto my-4 p-5 md:p-6 bg-white border border-blue-100 rounded-xl shadow-md text-left animate-fadeIn">
                                <div className="flex items-center gap-3 mb-3">
                                    <div style={{ backgroundColor: '#dbe8fd' }} className="w-10 h-10 rounded-full flex items-center justify-center text-brand shrink-0">
                                        <CheckCircle2 className="w-6 h-6 text-brand" />
                                    </div>
                                    <div>
                                        <h3 className="text-base md:text-lg font-bold text-brand leading-snug">
                                            Form Submitted Successfully! 🎉
                                        </h3>
                                        <p className="text-xs text-gray-600 mt-0.5">
                                            Thank you{formData.name ? `, ${formData.name}` : ''}! Your CRIF report is being processed.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ backgroundColor: 'rgba(219, 232, 253, 0.7)' }} className="border border-blue-100 rounded-lg p-3.5 my-4 space-y-2 text-xs">
                                    {formData.mobile && (
                                        <div className="flex items-center justify-between border-b border-blue-100/80 pb-2">
                                            <span className="text-gray-600 font-medium">Mobile:</span>
                                            <span className="font-semibold text-gray-900">+91 {formData.mobile}</span>
                                        </div>
                                    )}
                                    {formData.email && (
                                        <div className="flex items-center justify-between border-b border-blue-100/80 pb-2">
                                            <span className="text-gray-600 font-medium">Email:</span>
                                            <span className="font-semibold text-gray-900">{formData.email}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between pt-0.5">
                                        <span className="text-gray-600 font-medium">Status:</span>
                                        <span style={{ backgroundColor: '#dbe8fd' }} className="font-semibold text-brand px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider">
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
                                        style={{ backgroundColor: '#155dfc' }}
                                        className="w-full text-white font-semibold py-2.5 rounded-lg text-xs shadow-sm transition hover:opacity-90 text-center cursor-pointer"
                                    >
                                        Check Another Credit Score
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="cs">
                <JoinCK />
                <HowitWorks />
                <Testimonials />
                <CScontent />
            </div>
        </div>
    )
}
