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
                        Credit Bureau Data Handling & Encryption
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                        To fetch and display your credit score and credit report, CreditKlick acts as your authorized representative in partnership with licensed credit bureaus in India, including <strong>CRIF High Mark</strong> and <strong>CRIF</strong>. All raw credit report responses received from credit bureaus are strictly encrypted at rest using industry-standard <strong>AES-256-GCM encryption</strong>.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Data Retention & 6-Month Auto Deletion
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        In accordance with CRIF Infosec Audit compliance standards and the Digital Personal Data Protection (DPDP) Act 2023, CreditKlick enforces a strict <strong>6-month (180-day) data retention limit</strong>. All raw credit bureau reports are automatically purged from our databases after 180 days from the consent authorization date via an automated backend scheduler.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Data Security
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        We implement appropriate technical and organizational security measures to protect your personal
                        information, including SSL/TLS 1.3 encryption in transit, AES-256 encryption at rest, restricted network access controls, and routine CERT-In VAPT security assessments.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Your Rights & Consent Revocation
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        You have the right to access, correct, or delete your personal information. Under the DPDP Act 2023, you have the full right to revoke your consent at any time. Revoking consent will permanently purge your credit report records and personal profile from our systems within 24 hours. As mandated by CRIF Infosec audit policy, consent transaction logs are retained for a minimum of 2 years for audit verification while all underlying credit information is purged. You can exercise this right by contacting us at <a href="mailto:support@creditklick.com" className="text-blue-600 hover:underline">support@creditklick.com</a>.
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
