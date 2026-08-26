"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Twitter, Linkedin, Instagram, Facebook, Youtube, Loader2, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { subscribersAPI } from '@/services/api'

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
                toast.success(response.data.message || 'Successfully subscribed to newsletter!')
            }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } }
            const message = err.response?.data?.message || 'Failed to subscribe. Please try again.'
            toast.error(message)
        } finally {
            setIsLoading(false)
        }
    }

    const footerLinks = [
        {
            title: "Resources",
            links: [
                { name: "Credit Score", href: "/credit-score" },
                { name: "Credit Card", href: "/credit-cards" },
                { name: "Credit Refine", href: "/refine", isHighlight: true },
                { name: "Personal Loan", href: "/loan/personal-loan" },
                { name: "Business Loan", href: "/loan/business-loan" },
                { name: "Home Loan", href: "/loan/home-loan" },
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About us", href: "/about" },
                { name: "Careers", href: "https://www.stefto.com/careers/" },
                { name: "Contact us", href: "/contact" },
                { name: "Blogs", href: "/blog" },
                { name: "Register Complaint", href: "/register-complaint" },
            ]
        },
        {
            title: "Quick Links",
            links: [
                { name: "EMI Calculator", href: "/emi" },
                { name: "AU VALUE Calculator", href: "/calculator/au" },
                { name: "IDFC FIRST VALUE Calculator", href: "/calculator/idfc" },
                { name: "SBI SCLICK VALUE Calculator", href: "/calculator/sbi-click" },
                { name: "YES BANK VALUE Calculator", href: "/calculator/yes" },
            ]
        },
        {
            title: "Legal & Governance",
            links: [
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms and Conditions", href: "/terms-conditions" },
                { name: "Return & Refund Policy", href: "/return-refund" },
                { name: "Posh Policy", href: "/posh-policy" },
                { name: "Cookies Policy", href: "/cookies-policy" },
                { name: "Grievance Redressal", href: "/grievance-redressal" },
            ]
        }
    ]

    return (
        <footer className="relative bg-[#364153] pt-[80px] md:pt-[130px] pb-8 sm:pb-10 font-sans selection:bg-white selection:text-[#364153] z-0 overflow-hidden text-white">
            {/* 1. Wave Mask Divider */}
            <div className="absolute -top-[3px] left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative block w-full h-[70px] md:h-[120px]" preserveAspectRatio="none">
                    <path d="M-10,-6 L1450,-6 L1450,0 C1280,0 1220,80 1060,80 C900,80 840,30 680,30 C520,30 460,100 320,100 C180,100 120,0 0,0 L-10,0 Z" className="fill-white" />
                </svg>
            </div>

            {/* 3. Footer Content */}
            <div className="max-w-[1200px] mx-auto px-6 relative z-30">
                <div className="flex flex-col xl:flex-row justify-between gap-10 sm:gap-14 xl:gap-10 pt-2 sm:pt-4">
                    {/* Left Column (Brand & Socials matching screenshot) */}
                    <div className="xl:w-[32%] flex flex-col gap-4">
                        <Link href="/" className="inline-block mb-1">
                            <Image
                                src="/assets/creditklic_next_gen_transparent.png"
                                alt="CreditKlick"
                                width={160}
                                height={65}
                                className="w-32 sm:w-36 h-auto object-contain"
                                priority
                            />
                        </Link>
                        
                        <p className="text-xs text-blue-200 uppercase tracking-widest font-semibold leading-relaxed max-w-xs">
                            HEADOFFICE - PLOT 112 UDYOG VIHAR PHASE-1 GURGAON, HARYANA, 122016
                        </p>

                        {/* White Square Social Badges */}
                        <div className="flex items-center gap-2.5 my-2">
                            <a href="https://www.facebook.com/creditklickfin/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                                <Facebook className="w-5 h-5 text-blue-600 fill-current" />
                            </a>
                            <a href="https://twitter.com/creditklickfin" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                                <Twitter className="w-5 h-5 text-blue-400 fill-current" />
                            </a>
                            <a href="https://www.youtube.com/@creditklickfin" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                                <Youtube className="w-5 h-5 text-red-600 fill-current" />
                            </a>
                            <a href="https://www.linkedin.com/company/creditklickfin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                                <Linkedin className="w-5 h-5 text-blue-500 fill-current" />
                            </a>
                            <a href="https://www.instagram.com/creditklickfin/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                                <Instagram className="w-5 h-5 text-pink-500" />
                            </a>
                        </div>

                        <p className="text-xs text-gray-400 font-normal">
                            © 2022-{new Date().getFullYear()} Incredible Management Services PVT. LTD.
                        </p>
                    </div>

                    {/* Right Columns (4 Column Grid with Styled Typography) */}
                    <div className="xl:w-[68%] grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                        {footerLinks.map((section, idx) => (
                            <div key={idx} className="text-left">
                                <h4 className="font-semibold text-lg mb-4 text-blue-400">
                                    {section.title}
                                </h4>
                                <ul className="space-y-2 sm:space-y-2.5">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link 
                                                href={link.href} 
                                                className={`text-sm ${link.isHighlight ? 'text-blue-300 font-medium' : 'text-gray-300'} hover:text-white hover:pl-1 transition-all block`}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar with Divider */}
                <div className="mt-8 sm:mt-12 pt-4 sm:pt-5 flex flex-col md:flex-row justify-between items-center gap-4 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

                    <div className="text-xs text-white/70 font-medium">
                        CreditKlick is India&apos;s leading credit score comparison and financial services portal.
                    </div>

                    <div className="flex gap-4 sm:gap-6 flex-wrap text-xs text-white/70">
                        <Link href="/terms-conditions" className="hover:text-white hover:underline underline-offset-[3px] decoration-white/30 transition-colors">Terms of Use</Link>
                        <Link href="/privacy-policy" className="hover:text-white hover:underline underline-offset-[3px] decoration-white/30 transition-colors">Privacy Policy</Link>
                        <Link href="/grievance-redressal" className="hover:text-white hover:underline underline-offset-[3px] decoration-white/30 transition-colors">Grievance Redressal</Link>
                        <Link href="/cookies-policy" className="hover:text-white hover:underline underline-offset-[3px] decoration-white/30 transition-colors">Cookies Policy</Link>
                        <button type="button" onClick={() => window.dispatchEvent(new Event('open_cookie_consent'))} className="hover:text-white hover:underline underline-offset-[3px] decoration-white/30 transition-colors">Cookie Settings</button>
                        <Link href="/posh-policy" className="hover:text-white hover:underline underline-offset-[3px] decoration-white/30 transition-colors">POSH Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
