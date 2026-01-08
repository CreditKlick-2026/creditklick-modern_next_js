"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                >
                    404
                </motion.div>

                {/* Message */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-4"
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 text-lg mb-8 max-w-md mx-auto"
                >
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </motion.p>

                {/* Illustration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-8xl mb-8"
                >
                    🔍
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/">
                        <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                            <Home className="mr-2 w-5 h-5" />
                            Go Home
                        </Button>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
                    >
                        <ArrowLeft className="mr-2 w-5 h-5" />
                        Go Back
                    </button>
                </motion.div>

                {/* Helpful Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-gray-500"
                >
                    <p className="mb-4">You might find these links helpful:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/credit-score" className="text-blue-600 hover:underline">Check Credit Score</Link>
                        <span className="text-gray-300">•</span>
                        <Link href="/credit-cards" className="text-blue-600 hover:underline">Credit Cards</Link>
                        <span className="text-gray-300">•</span>
                        <Link href="/loans" className="text-blue-600 hover:underline">Loans</Link>
                        <span className="text-gray-300">•</span>
                        <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
