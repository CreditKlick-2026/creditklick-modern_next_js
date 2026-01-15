"use client"

import { motion } from 'framer-motion'

export default function CookiesPolicyClient() {
    return (
        <>
            {/* Hero / Parallax */}
            {/* Hero / Gradient */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-blue-50">
                <div
                    className="absolute inset-0 bg-fixed bg-center bg-cover"
                    style={{
                        backgroundImage: "url('/assets/images/cookies-hero.png')"
                    }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl md:text-6xl text-white drop-shadow-lg font-semibold tracking-widest uppercase text-center px-4">
                        COOKIES POLICY
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
                        What Are Cookies?
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 mb-8">
                        Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                        They are widely used to make websites work more efficiently and provide information to the site owners.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        How We Use Cookies
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                        CreditKlick uses cookies for several purposes:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
                        <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly.</li>
                        <li><strong>Performance Cookies:</strong> These help us understand how visitors interact with our website.</li>
                        <li><strong>Functionality Cookies:</strong> These remember your preferences and settings.</li>
                        <li><strong>Analytics Cookies:</strong> These help us analyze website traffic and improve our services.</li>
                    </ul>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Types of Cookies We Use
                    </h3>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-4 py-3 text-left">Cookie Name</th>
                                    <th className="px-4 py-3 text-left">Purpose</th>
                                    <th className="px-4 py-3 text-left">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-4 py-3">user</td>
                                    <td className="px-4 py-3">Stores user session information</td>
                                    <td className="px-4 py-3">7 days</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-3">cibil</td>
                                    <td className="px-4 py-3">Stores credit score data for quick access</td>
                                    <td className="px-4 py-3">7 days</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-3">token</td>
                                    <td className="px-4 py-3">Authentication token</td>
                                    <td className="px-4 py-3">7 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Managing Cookies
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        You can control and manage cookies through your browser settings. Most browsers allow you to refuse
                        or delete cookies. Please note that disabling cookies may affect the functionality of our website.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Third-Party Cookies
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        We may also use third-party cookies from services like Google Analytics to analyze website usage.
                        These third parties have their own privacy policies regarding cookies.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Updates to This Policy
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        We may update this Cookies Policy from time to time. Any changes will be posted on this page.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Contact Us
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        If you have any questions about our use of cookies, please contact us at:{' '}
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
