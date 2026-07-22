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

                    <div className="bg-slate-50 border border-blue-200 rounded-lg p-6 mb-8 text-sm md:text-base text-gray-800 space-y-3 leading-relaxed">
                        <h4 className="font-bold text-blue-900 text-lg border-b border-blue-200 pb-2 mb-3">CRIF High Mark - Credit Score Terms of Use</h4>
                        <p>In connection with submission of the application for my credit information (&ldquo;Consumer Credit Information&rdquo;) offered by CRIF High Mark Credit Information Services Pvt. Ltd. (&ldquo;CIC&rdquo;) through Creditklick Services Private Limited (referred to as the &ldquo;Company&rdquo;) and delivery of the Consumer Credit Information to the Company, I hereby acknowledge and agree to the following:</p>
                        <p><strong>A.</strong> The Company is my lawfully appointed agent, and it has agreed to be my agent to obtain my Credit Information and Credit Score from CRIF High Mark Credit Information Services Pvt. Ltd. (CRIF High Mark) for the Purpose of checking credit score, assessing creditworthiness, and providing credit advisory services and not for any other purposes.</p>
                        <p><strong>B.</strong> This consent shall be valid for a maximum period of 6 months or till such time the credit information is required to be retained to satisfy the Purpose for which it was intended, or I withdraw my consent at any time, by informing the same to the Company, at their registered office address, website, assigned email id or mobile application, whichever is earlier.</p>
                        <p><strong>C.</strong> I further authorize the Company to share with CICs, my personal information/details to procure my Credit Information on a monthly frequency and use the same for fulfill the aforesaid Purpose.</p>
                        <p><strong>D.</strong> I confirm that this consent is given by my free will and not due to any solicitation by any person/entity.</p>
                        <p><strong>E.</strong> I hereby expressly grant unconditional consent to, and direct, CIC to deliver and / or transfer my Consumer Credit Information to the Company on my behalf.</p>
                        <p><strong>F.</strong> I shall not hold CIC responsible or liable for any loss, claim, liability, or damage of any kind resulting from, arising out of, or in any way related to: (a) delivery of my Consumer Credit Information to the Company; (b) any use, modification or disclosure by the Company of the contents, in whole or in part, of my Consumer Credit Information, wherever authorized by me; (c) any breach of confidentiality or privacy in relation to delivery of my Consumer Credit Information to the Company;</p>
                        <p><strong>G.</strong> I acknowledge and accept that: (a) CIC has not made any promises or representations to me in order to induce me to provide my Consumer Credit Information or seek any consent or authorization in this regard; and (b) the implementation of the Agreement between CIC and the Company is solely the responsibility of the Company.</p>
                        <p><strong>H.</strong> I agree that I may be required to record my consent / provide instructions electronically or physically as the case may be, and in all such cases I understand that by clicking on the &quot;I Accept&quot; button below or signing this Consent physically, I am providing &quot;written instructions&quot; to the Company authorizing Company to obtain my Consumer Credit Information from my personal credit profile from CRIF High Mark. I further authorize the Company to obtain such information solely to confirm my identity and display my Consumer Credit Information to me.</p>
                        <p><strong>I.</strong> I understand that in order to render services as defined herein above as per the Purpose to me, I hereby authorize the Company to obtain my Consumer Credit Information from CIC.</p>
                        <p><strong>J.</strong> By submitting this registration form, I understand that I am providing express written instructions for the Company to request and receive a copy of my consumer credit report and score from CIC.</p>
                        <p><strong>K.</strong> I understand that the product is provided on an &ldquo;as-is&rdquo;, &ldquo;as available&rdquo; basis and CIC expressly disclaims all warranties, including the warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
                        <p><strong>L.</strong> I shall not sue or otherwise make or present any demand or claim, and I irrevocably, unconditionally and entirely release, waive and forever discharge CIC, its officers, directors, employees, agents, licensees, affiliates, successors and assigns, jointly and individually, from any and all manner of liabilities, claims, demands, losses, claims, suits, costs and expenses.</p>
                        <p><strong>M.</strong> I agree that the terms of this consent shall be governed by the laws of India.</p>
                    </div>

                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        In compliance with CRIF Infosec Audit guidelines and DPDP Act 2023, user consent logs are maintained for minimum 2 years, while raw credit report records are retained for a maximum duration of <strong>6 months (180 days)</strong> from the date of authorization, after which raw credit reports are automatically purged from our servers. Users retain the explicit right to revoke consent at any time via our <a href="/revoke-consent" className="text-blue-600 underline font-semibold">Revoke Consent Portal</a>.
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
                        <a href="support@creditklick.com" className="text-blue-600 hover:underline">legal@creditklick.com</a>
                    </p>

                    <p className="text-sm text-gray-500 italic">
                        Last updated: January 2025
                    </p>
                </motion.div>
            </div>
        </>
    )
}
