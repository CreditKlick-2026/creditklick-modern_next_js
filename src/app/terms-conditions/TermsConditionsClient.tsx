"use client"

import { motion } from 'framer-motion'

export default function TermsConditionsClient() {
    return (
        <>
            {/* Hero / Parallax */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-blue-50">
                <div
                    className="absolute inset-0 bg-fixed bg-center bg-cover"
                    style={{
                        backgroundImage: "url('/assets/terms-hero.png')"
                    }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl md:text-6xl text-blue-900 font-semibold tracking-widest uppercase text-center px-4">
                        TERMS & CONDITIONS
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
                        Acceptance of Terms
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 mb-8">
                        By accessing and using CreditKlick&apos;s website and services, you agree to be bound by these Terms and
                        Conditions. If you do not agree to these terms, please do not use our services.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Use of Services
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                        You agree to use our services only for lawful purposes and in accordance with these Terms:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
                        <li>You must be at least 18 years old to use our services</li>
                        <li>You must provide accurate and complete information</li>
                        <li>You are responsible for maintaining the confidentiality of your account</li>
                        <li>You must not use our services for any fraudulent or illegal activities</li>
                    </ul>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Credit Score Services & Bureau Consent (CRIF High Mark Annexure 3)
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                        Our credit score check and credit health monitoring services are provided in partnership with authorized credit information companies including <strong>CRIF High Mark Credit Information Services Pvt. Ltd.</strong> (CRIF High Mark). By authorizing Creditklick Services Private Limited (&ldquo;Company&rdquo;), you agree to the following CRIF High Mark Terms of Use:
                    </p>





                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Loan and Credit Card Applications
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        CreditKlick acts as a facilitator between you and banking/financial partners. We do not guarantee
                        approval of any loan or credit card application. The final decision rests with the respective
                        financial institution.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Intellectual Property
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        All content on this website, including text, graphics, logos, and software, is the property of
                        CreditKlick or its content suppliers and is protected by intellectual property laws.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Limitation of Liability
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        CreditKlick shall not be liable for any indirect, incidental, special, consequential, or punitive
                        damages arising out of your use of our services. Our total liability shall not exceed the amount
                        you paid to us, if any, for the services.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Governing Law
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        These Terms shall be governed by and construed in accordance with the laws of India. Any disputes
                        shall be subject to the exclusive jurisdiction of courts in New Delhi.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Contact Us
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        If you have any questions about these Terms, please contact us at:{' '}
                        <a href="support@creditklick.com" className="text-blue-600 hover:underline">support@creditklick.com</a>
                    </p>

                    <p className="text-sm text-gray-500 italic">
                        Last updated: January 2025
                    </p>
                </motion.div>
            </div>
        </>
    )
}
