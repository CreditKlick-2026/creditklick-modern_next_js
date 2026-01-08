"use client"

import { motion } from 'framer-motion'

export default function PoshPolicyClient() {
    return (
        <>
            {/* Hero / Parallax */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-blue-50">
                <div
                    className="absolute inset-0 bg-fixed bg-center bg-cover"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
                    }}
                ></div>
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
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
                    <h2 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Prevention of Sexual Harassment (POSH)
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 mb-8">
                        CreditKlick (IMSPL) is committed to providing a safe working environment, free from sexual harassment
                        or any form of workplace discrimination. This policy is in compliance with the Sexual Harassment of
                        Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Policy Statement
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        We have zero tolerance for sexual harassment in any form at the workplace. All employees, contractors,
                        vendors, and visitors are expected to conduct themselves professionally and respectfully at all times.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        What Constitutes Sexual Harassment
                    </h3>
                    <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
                        <li>Physical contact and advances</li>
                        <li>A demand or request for sexual favors</li>
                        <li>Sexually colored remarks</li>
                        <li>Showing pornography</li>
                        <li>Any other unwelcome physical, verbal or non-verbal conduct of sexual nature</li>
                    </ul>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Internal Complaints Committee (ICC)
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        We have constituted an Internal Complaints Committee (ICC) as per the statutory requirements to address
                        complaints of sexual harassment. The ICC comprises of senior employees and an external member to ensure
                        fair and impartial handling of complaints.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Complaint Process
                    </h3>
                    <ol className="list-decimal pl-6 text-gray-700 mb-8 space-y-2">
                        <li>Written complaint to be submitted to the ICC within 3 months of the incident</li>
                        <li>ICC will complete the inquiry within 90 days</li>
                        <li>Report to be submitted within 10 days of completion of inquiry</li>
                        <li>Action to be taken within 60 days of receiving the report</li>
                    </ol>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Confidentiality
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        All complaints and proceedings are kept strictly confidential. Any breach of confidentiality will be
                        treated as misconduct and disciplinary action will be taken.
                    </p>

                    <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-4 uppercase">
                        Contact
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        For any concerns or complaints, please contact the ICC at:{' '}
                        <a href="mailto:posh@creditklick.com" className="text-blue-600 hover:underline">posh@creditklick.com</a>
                    </p>

                    <p className="text-sm text-gray-500 italic">
                        Last updated: January 2025
                    </p>
                </motion.div>
            </div>
        </>
    )
}
