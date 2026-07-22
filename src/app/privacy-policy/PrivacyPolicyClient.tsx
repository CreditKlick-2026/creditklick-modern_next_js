"use client"

import { motion } from 'framer-motion'

export default function PrivacyPolicyClient() {
    return (
        <>
            {/* Hero / Parallax */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-blue-50">
                <div
                    className="absolute inset-0 bg-fixed bg-center bg-cover"
                    style={{
                        backgroundImage: "url('/assets/privacy-hero.png')"
                    }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl md:text-6xl text-blue-900 font-semibold tracking-widest uppercase text-center px-4">
                        PRIVACY POLICY
                    </h1>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-10 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="prose prose-lg max-w-none"
                >
                    <h2 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Introduction
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 mb-8">
                        CreditKlick (operated by Incredible Management Service Pvt. Ltd.) is committed to protecting your privacy.
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
                        our website or use our services.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Information We Collect
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
                        <li>Personal identification information (Name, email address, phone number, PAN, date of birth)</li>
                        <li>Financial information (credit score, credit report data)</li>
                        <li>Device and usage information (IP address, browser type, pages visited)</li>
                        <li>Communications data (emails, chat messages, feedback)</li>
                    </ul>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        How We Use Your Information
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process your credit score requests and loan applications</li>
                        <li>Send you promotional communications (with your consent)</li>
                        <li>Respond to your comments, questions, and requests</li>
                        <li>Monitor and analyze trends, usage, and activities</li>
                        <li>Detect, investigate, and prevent fraudulent transactions</li>
                    </ul>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Information Sharing
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        We may share your information with third parties only in the following circumstances:
                        with your consent, with our banking and financial partners (to process your loan/card applications),
                        with service providers who assist us in operating our platform, or when required by law.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Data Security
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        We implement appropriate technical and organizational security measures to protect your personal
                        information. However, no method of transmission over the Internet is 100% secure, and we cannot
                        guarantee absolute security.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Your Rights
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        You have the right to access, correct, or delete your personal information. You may also opt out
                        of receiving promotional communications from us. To exercise these rights, please contact us at
                        support@creditklick.com.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Contact Us
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at:{' '}
                        <a href="mailto:support@creditklick.com" className="text-blue-600 hover:underline">support@creditklick.com</a>
                    </p>

                    <p className="text-sm text-gray-500 italic">
                        Last updated: January 2026
                    </p>
                </motion.div>
            </div>
        </>
    )
}
