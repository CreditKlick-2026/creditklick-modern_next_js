"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Star, StarHalf, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { verificationAPI } from '@/services/api'
import Cookies from 'js-cookie'

// Images
import experian from '@/assets/Images/experian.png'
import scoremeter from '@/assets/Images/Cibil/scoremeter.png'
import badge from '@/assets/Images/Cibil/badge.png'
import calendar from '@/assets/Images/Cibil/calendar.png'
import graph from '@/assets/Images/Cibil/graph.png'
import testimonial from '@/assets/Images/Cibil/testimonial.png'
import joinck from '@/assets/Images/Refine/refineProgram2.png'

function FormDesign() {
    return (
        <div className="pl-4">
            <div>
                <Image src={scoremeter} alt="Score Meter" className="flex pl-10 object-contain w-auto h-auto" />
            </div>
            <div>
                <h1 className="lg:text-5xl text-3xl text-blue-900 font-thin">
                    Get Your FREE <br /> Experian Credit Report{" "}
                </h1>
                <p className="text-sm font-thin text-blue-900">
                    When you ask a bank for a loan or credit card, they want to know
                    your credit score.
                </p>
            </div>
            <div className="flex gap-x-4 p-2 my-4">
                <span className="w-16">
                    <Image src={badge} alt="Offers" className="w-full h-auto object-contain" />
                    <p className="text-[8px] px-2 py-1">
                        Get best offers on Loan & Car
                    </p>
                </span>
                <span className="w-16">
                    <Image src={graph} alt="Insights" className="w-full h-auto object-contain" />
                    <p className="text-[8px] px-2 py-1">Insights for better score</p>
                </span>
                <span className="w-16">
                    <Image src={calendar} alt="Report" className="w-full h-auto object-contain" />
                    <p className="text-[8px] px-2 py-1">Free monthly credit report</p>
                </span>
            </div>

            <span className="flex text-xs gap-x-1 mt-10 items-center">
                {" "}
                powered by <Image src={experian} alt="Experian" className="w-16 h-auto object-contain" />
            </span>
        </div>
    )
}

function JoinCK() {
    return (
        <div className="grid sm:grid-cols-2 grid-cols-1 my-5 bg-blue-50">
            <div className="flex flex-col items-center justify-center">
                <p className="lg:text-4xl md:text-3xl text-2xl text-left my-1 text-blue-700 mx-8 font-semibold italic">
                    Join CREDITKLICK and monitor your <br />Credit Score
                </p>
            </div>
            <div className="my-10">
                <div className="relative md:w-2/4 w-2/3 m-auto rounded-3xl shadow-xl overflow-hidden aspect-[4/3] bg-white">
                    <Image src={joinck} alt="Join CK" fill className="object-contain" sizes="(max-width: 768px) 66vw, 50vw" />
                </div>
            </div>
        </div>
    )
}

function HowitWorks() {
    return (
        <div className="my-16 container mx-auto">
            <h1 className="text-3xl text-blue-900 my-5 text-center">How it works?</h1>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-8 gap-y-6 my-4 w-3/4 mx-auto">
                <div className="my-auto py-8 text-center bg-gradient-to-tr from-white to-blue-50 rounded-md shadow-md w-full">
                    <p className="text-2xl text-blue-500">Credit Monitoring</p>
                    <p className="text-xs text-blue-800 my-2">
                        You can monitor your credit score and credit report for free.
                    </p>
                </div>
                <div className="my-auto py-8 text-center bg-gradient-to-tr from-white to-blue-50 rounded-md shadow-md w-full">
                    <p className="text-2xl text-blue-500">Credit Education</p>
                    <p className="text-xs text-blue-800 my-2">
                        With insights and alerts tailored to your needs, stay on top of your score.
                    </p>
                </div>
                <div className="my-auto py-8 text-center bg-gradient-to-tr from-white to-blue-50 rounded-md shadow-md w-full">
                    <p className="text-2xl text-blue-500">Credit Offers</p>
                    <p className="text-xs text-blue-800 my-2">
                        Discover and review which credit cards meet your financial needs.
                    </p>
                </div>
            </div>
        </div>
    )
}

function Testimonials() {
    return (
        <div className="px-4 my-10">
            <p className="lg:text-xl text-base font-bold text-gray-600 uppercase">
                testimonials
            </p>
            <p className="lg:text-3xl md:text-xl text-lg font-bold">
                Trusted by 200K+ users like you
            </p>
            <div className="grid lg:grid-cols-3 grid-cols-1">
                <div className="w-full p-4 m-auto">
                    <Image src={testimonial} alt="Testimonial" className="lg:w-1/2 w-2/5 m-auto object-contain h-auto" />
                </div>
                <div className="w-3/4 p-4 bg-blue-50 mx-auto my-4 shadow-lg rounded-lg">
                    <div className="flex text-blue-500 my-2">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="md:text-lg text-sm my-2">
                        My scores have improved significantly in a period of 1 year. My
                        heartfelt thanks for your support and I am pleased with your
                        professional approach.
                    </p>
                    <p className="text-lg font-semibold text-blue-500 uppercase">
                        Neha Sharma
                    </p>
                </div>
                <div className="w-3/4 p-4 bg-blue-50 mx-auto my-4 shadow-lg rounded-lg">
                    <div className="flex text-blue-500 my-2">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <StarHalf className="w-4 h-4 fill-current" />
                    </div>
                    <p className="md:text-lg text-sm my-2">
                        I am very happy to tell you that my Axis Bank credit card problem
                        has been solved and there is no outstanding amount to be paid from
                        my side. thanks for your help
                    </p>
                    <p className="text-lg font-semibold text-blue-500 uppercase">
                        pawan kohli
                    </p>
                </div>
            </div>
        </div>
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
        <div className="py-4 bg-gray-100">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {content.map((items, index) => (
                    <div key={index} className="font-semibold md:text-lg text-base text-gray-700">
                        <li className="mb-4">{items.text}</li>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Switch({ checked, onChange, children }: { checked: boolean, onChange: (checked: boolean) => void, children: React.ReactNode }) {
    return (
        <div className="flex h-6 items-center my-4 justify-center">
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`flex w-8 mr-3 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}
            >
                <span className="sr-only">Agree to policies</span>
                <span
                    aria-hidden="true"
                    className={`h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out ${checked ? 'translate-x-3.5' : 'translate-x-0'}`}
                />
            </button>
            <span className="text-sm leading-6 text-gray-600">{children}</span>
        </div>
    )
}

export default function CreditScoreClient() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [agreed, setAgreed] = useState(true)
    const [formData, setFormData] = useState({ name: '', email: '', dob: '', pin: '', pan: '', mobile: '' })
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('')
    const [formErrors, setFormErrors] = useState<any>({})

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

            toast.success('OTP Sent Successfully via ' + (data.flow === 'MTALKZ' ? 'SMS' : 'Experian'))

            const nextState = {
                phone: formData.mobile,
                flow: data.flow,
                stageOneId: data.stageOneId,
                stageTwoId: data.stageTwoId,
                message: data.message,
                userDetails: { ...formData, profession: status, gender },
                isExistingUser: data.exists
            }
            sessionStorage.setItem('otpVerificationState', JSON.stringify(nextState))

            router.push('/verify-otp')

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
            <div className="font-semibold text-lg md:text-2xl bg-blue-100 py-3 md:py-6 text-blue-900 text-center tracking-wider">
                <h1>CHECK FREE CREDIT SCORE</h1>
            </div>

            {/* Main form container - reduced margins on mobile */}
            <div className="h-full mx-auto my-4 md:my-10 px-2 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-around rounded bg-white">
                    {/* Experian badge - mobile only */}
                    <span className="text-xs gap-x-1 items-center justify-end pr-4 md:hidden flex py-2">
                        powered by <Image src={experian} alt="Experian" className="w-16 h-auto object-contain" />
                    </span>

                    {/* Left design - desktop only */}
                    <div className="w-2/3 md:block hidden mx-auto">
                        <FormDesign />
                    </div>

                    {/* Form section */}
                    <div className="md:w-3/3 mx-auto px-2 md:px-4 w-full">
                        <div className="grid grid-cols-2 m-auto gap-2 md:gap-4 py-2 md:py-4">
                            {/* Full Name */}
                            <div className="p-1 md:p-2 h-auto">
                                <label className="block text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">Full Name</label>
                                <div className="mt-1 md:mt-2.5">
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-600 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm sm:leading-6" required />
                                </div>
                                <div className="text-xs text-red-500">{formErrors.name}</div>
                            </div>

                            {/* Email */}
                            <div className="p-1 md:p-2 h-auto">
                                <label className="block text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">Email</label>
                                <div className="mt-1 md:mt-2.5">
                                    <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email Id" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-600 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm sm:leading-6" required />
                                </div>
                                <div className="text-xs text-red-500">{formErrors.email}</div>
                            </div>

                            {/* Date of Birth */}
                            <div className="p-1 md:p-2 h-auto">
                                <label className="block text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">D.O.B</label>
                                <div className="mt-1 md:mt-2.5">
                                    <input type="tel" name="dob" value={formData.dob} onInput={handleDateDigit} maxLength={10} placeholder="DD-MM-YYYY" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-700 shadow-sm ring-1 ring-inset font-semibold ring-gray-300 placeholder:text-gray-400 text-sm sm:leading-6" required />
                                </div>
                                <div className="text-xs text-red-500">{formErrors.dob}</div>
                            </div>

                            {/* Pincode */}
                            <div className="p-1 md:p-2 h-auto">
                                <label className="block text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">Pincode</label>
                                <div className="mt-1 md:mt-2.5">
                                    <input type="number" name="pin" value={formData.pin} onInput={handlePinDigit} maxLength={6} placeholder="eg:110001" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-600 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm sm:leading-6" required />
                                </div>
                                <div className="text-xs text-red-500">{formErrors.pin}</div>
                            </div>

                            {/* PAN */}
                            <div className="p-1 md:p-2 h-auto">
                                <label className="block text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">PAN</label>
                                <div className="mt-1 md:mt-2.5">
                                    <input type="text" name="pan" value={formData.pan} onChange={handleChange} maxLength={10} placeholder="AAAAA1214J" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-600 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm sm:leading-6 uppercase" required />
                                </div>
                                <div className="text-xs text-red-500">{formErrors.pan}</div>
                            </div>

                            {/* Mobile Number */}
                            <div className="p-1 md:p-2 h-auto">
                                <label className="block text-sm md:text-lg uppercase font-semibold leading-6 text-gray-900">Mobile</label>
                                <div className="mt-1 md:mt-2.5">
                                    <input type="number" name="mobile" value={formData.mobile} onInput={handleMobileDigit} maxLength={10} placeholder="10 digit" className="block w-full rounded-md border-0 py-2 px-2 md:px-3.5 text-gray-600 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm sm:leading-6" required />
                                </div>
                                <div className="text-xs text-red-500">{formErrors.mobile}</div>
                            </div>

                            {/* Gender - inline on mobile */}
                            <div className="p-1 md:p-2">
                                <label className="block text-sm md:text-lg font-semibold leading-6 text-gray-900">GENDER</label>
                                <div className="flex gap-3 mt-1 flex-wrap">
                                    <label className="text-xs md:text-sm flex items-center gap-1">
                                        <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={handleGender} className="w-3 h-3" /> Male
                                    </label>
                                    <label className="text-xs md:text-sm flex items-center gap-1">
                                        <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={handleGender} className="w-3 h-3" /> Female
                                    </label>
                                    <label className="text-xs md:text-sm flex items-center gap-1">
                                        <input type="radio" name="gender" value="others" checked={gender === 'others'} onChange={handleGender} className="w-3 h-3" /> Others
                                    </label>
                                </div>
                                <div className="text-xs text-red-500">{formErrors.selectedError}</div>
                            </div>

                            {/* Employment Status - inline on mobile */}
                            <div className="p-1 md:p-2">
                                <label className="block text-sm md:text-lg font-semibold leading-6 text-gray-900">STATUS</label>
                                <div className="flex gap-3 mt-1 flex-wrap">
                                    <label className="text-xs md:text-sm flex items-center gap-1">
                                        <input type="radio" name="status" value="Salaried" checked={status === 'Salaried'} onChange={handleStatus} className="w-3 h-3" /> Salaried
                                    </label>
                                    <label className="text-xs md:text-sm flex items-center gap-1">
                                        <input type="radio" name="status" value="Self Employed" checked={status === 'Self Employed'} onChange={handleStatus} className="w-3 h-3" /> Self-Employed
                                    </label>
                                </div>
                                <div className="text-xs text-red-500">{formErrors.status}</div>
                            </div>

                            {/* Terms and Submit - full width */}
                            <div className="col-span-2 px-1">
                                <Switch checked={agreed} onChange={setAgreed}>
                                    <span className="text-xs">By selecting this, you agree to our <Link href="/privacy-policy" className="font-semibold text-indigo-600">Privacy Policy</Link> and <Link href="/terms-conditions" className="font-semibold text-indigo-600">Terms</Link>.</span>
                                </Switch>
                                <div className="text-xs text-red-500 text-center">{formErrors.agree}</div>
                            </div>

                            <div className="col-span-2 mt-2 mx-auto flex flex-col text-center px-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="block w-full rounded-md bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                    onClick={handleSubmit}
                                >
                                    {isLoading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Processing...</span> : 'Check Credit Score Now'}
                                </button>
                                <p className="text-[10px] text-center mt-1 text-gray-400">CreditKlick uses 128-bit encryption to secure your information</p>
                                <p className="text-[10px] text-center text-green-400">Receive updates via Whatsapp</p>
                            </div>
                        </div>

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
