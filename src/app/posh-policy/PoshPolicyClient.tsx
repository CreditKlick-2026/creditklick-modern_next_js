"use client"

import { motion } from 'framer-motion'

export default function PoshPolicyClient() {
    return (
        <>
            {/* Hero / Parallax */}
            {/* Hero / Gradient */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl md:text-6xl text-blue-900 font-semibold tracking-widest uppercase text-center px-4">
                        POSH POLICY
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
                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Contact
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        For any concerns or complaints, please contact the ICC at:{' '}
                        <a href="mailto:support@creditklick.com" className="text-blue-600 hover:underline">support@creditklick.com</a>
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Gender Neutral POSH Policy 2026
                    </h3>
                    <div className="mb-4">
                        <a
                            href="/documents/gender-neutral-posh-policy-2026.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="inline-block rounded-lg bg-[#155dfc] px-5 py-2.5 text-white font-medium hover:opacity-90 no-underline"
                        >
                            Download PDF
                        </a>
                    </div>
                    <iframe
                        src="/documents/gender-neutral-posh-policy-2026.pdf"
                        title="Gender Neutral POSH Policy 2026"
                        className="w-full h-[600px] md:h-[900px] border border-gray-200 rounded-lg mb-8"
                    />

                    <p className="text-sm text-gray-500 italic">
                        Last updated: January 2026
                    </p>
                </motion.div>
            </div>
        </>
    )
}
