"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Loader2, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { subscribersAPI } from '@/services/api'

const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/creditklickfin/', color: 'text-blue-600' },
    { icon: Twitter, href: 'https://twitter.com/creditklickfin', color: 'text-blue-400' },
    { icon: Youtube, href: 'https://www.youtube.com/@creditklickfin', color: 'text-red-600' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/creditklickfin', color: 'text-blue-500' },
    { icon: Instagram, href: 'https://www.instagram.com/creditklickfin/', color: 'text-pink-500' },
]

export function Footer() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !email.includes('@')) {
            toast.error('Please enter a valid email address')
            return
        }

        setIsLoading(true)
        try {
            const response = await subscribersAPI.subscribe(email, 'footer')
            if (response.data.success) {
                setIsSubscribed(true)
                setEmail('')
                toast.success(response.data.message || 'Successfully subscribed!')
            }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } }
            const message = err.response?.data?.message || 'Failed to subscribe. Please try again.'
            toast.error(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <footer className="bg-gray-700 text-white">
            {/* Newsletter Section */}
            <div className="bg-gray-800 py-10">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-bold mb-2">Stay Financially Ahead</h3>
                        <p className="text-gray-400 mb-6">Join 10,000+ subscribers for credit tips, loan offers & financial news.</p>

                        {isSubscribed ? (
                            <div className="flex items-center justify-center gap-2 text-green-400">
                                <CheckCircle className="w-5 h-5" />
                                <span>Thanks for subscribing!</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" disabled={isLoading} />
                                </div>
                                <button type="submit" disabled={isLoading} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Subscribe'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Image src="/assets/Images/creditklic_next_gen.png" alt="CreditKlick" width={128} height={50} style={{ width: 'auto', height: 'auto' }} className="max-w-32" />
                        </Link>
                        <p className="text-xs text-gray-300 uppercase tracking-widest mb-4">Headoffice - Plot 112 Udyog Vihar Phase-1 Gurgaon, Haryana, 122016</p>
                        <div className="flex items-center space-x-2 mb-4">
                            {socialLinks.map((social, index) => (
                                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                                    <social.icon className={`h-4 w-4 ${social.color}`} />
                                </a>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500">© 2022-2026 Incredible Management Services PVT. LTD.</p>
                    </div>

                    {/* Resources */}
                    <div className="text-left">
                        <h4 className="font-semibold text-lg mb-4 text-blue-400">Resources</h4>
                        <ul className="space-y-2">
                            <li><Link href="/credit-score" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Credit Score</Link></li>
                            <li><Link href="/credit-cards" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Credit Card</Link></li>
                            <li><Link href="/refine" className="text-sm text-blue-300 hover:text-white hover:pl-1 transition-all font-medium">Credit Refine</Link></li>
                            <li><Link href="/loan/personal-loan" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Personal Loan</Link></li>
                            <li><Link href="/loan/business-loan" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Business Loan</Link></li>
                            <li><Link href="/loan/home-loan" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Home Loan</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="text-left">
                        <h4 className="font-semibold text-lg mb-4 text-blue-400">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">About us</Link></li>
                            <li><a href="https://www.stefto.com/careers/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Careers</a></li>
                            <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Contact us</Link></li>
                            <li><Link href="/blog" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Blogs</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="text-left">
                        <h4 className="font-semibold text-lg mb-4 text-blue-400">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Privacy Policy</Link></li>
                            <li><Link href="/terms-conditions" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Terms and Conditions</Link></li>
                            <li><Link href="/return-refund" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Return & Refund Policy</Link></li>
                            <li><Link href="/posh-policy" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Posh Policy</Link></li>
                            <li><Link href="/cookies-policy" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">Cookies Policy</Link></li>
                        </ul>
                    </div>

                    <div className="text-left">
                        <h4 className="font-semibold text-lg mb-4 text-blue-400">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/emi" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">EMI Calculator</Link></li>
                            <li><Link href="/calculator/au" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">AU VALUE Calculator</Link></li>
                            <li><Link href="/calculator/idfc" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">IDFC FIRST VALUE Calculator</Link></li>
                            <li><Link href="/calculator/sbi-click" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">SBI SCLICK VALUE Calculator</Link></li>
                            <li><Link href="/calculator/yes" className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all">YES BANK VALUE Calculator</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-800 py-3 overflow-hidden border-t border-gray-700">
                <div className="container-custom">
                    <div className="text-red-400 text-sm overflow-hidden whitespace-nowrap">
                        <motion.div
                            animate={{ x: ["100%", "-100%"] }}
                            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                            className="inline-block"
                        >
                            CreditKlick does not sell any loans on our own and does not charge any fee from any customers/viewers. We advise customers/viewers to choose from best offers from Banks and its advertisers. We do not guarantee any loans as loan sanction is as per Banks and NBFCs. We suggest all users to never pay any upfront amount for any loan disbursal. Report any fraud at support@creditklick.com
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
