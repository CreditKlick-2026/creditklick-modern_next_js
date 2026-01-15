"use client"

import { motion } from 'framer-motion'

export default function ReturnRefundClient() {
    return (
        <>
            {/* Hero / Parallax */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-blue-50">
                <div
                    className="absolute inset-0 bg-fixed bg-center bg-cover"
                    style={{
                        backgroundImage: "url('/assets/images/refund-hero.png')"
                    }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl md:text-6xl text-blue-900 font-semibold tracking-widest uppercase text-center px-4">
                        RETURN & REFUND POLICY
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
                        Refund Policy
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 mb-8">
                        At CreditKlick, we strive to provide the best services to our customers. This policy outlines the
                        conditions under which refunds may be processed for our paid services.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Services Covered
                    </h3>
                    <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
                        <li>Credit Refine subscription services</li>
                        <li>Premium credit report analysis</li>
                        <li>Credit consultation services</li>
                    </ul>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Refund Eligibility
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                        Refunds may be considered under the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
                        <li>Service not delivered as promised within 7 days of payment</li>
                        <li>Technical issues preventing access to paid services</li>
                        <li>Duplicate payment made in error</li>
                        <li>Cancellation within 24 hours of purchase (for consultation services)</li>
                    </ul>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Non-Refundable Services
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                        The following services are non-refundable:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
                        <li>Services already rendered or reports already generated</li>
                        <li>Consultation services after the session has been conducted</li>
                        <li>Subscription fees after the subscription period has started</li>
                    </ul>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Refund Process
                    </h3>
                    <ol className="list-decimal pl-6 text-gray-700 mb-8 space-y-2">
                        <li>Submit a refund request to support@creditklick.com with your order details</li>
                        <li>Our team will review your request within 3-5 business days</li>
                        <li>If approved, refund will be processed within 7-10 business days</li>
                        <li>Refund will be credited to the original payment method</li>
                    </ol>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Contact Us
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        For refund-related queries, please contact us at:{' '}
                        <a href="mailto:support@creditklick.com" className="text-blue-600 hover:underline">support@creditklick.com</a>
                    </p>

                    <p className="text-sm text-gray-500 italic">
                        Last updated: January 2025
                    </p>
                </motion.div>
            </div>
        </>
    )
}
