"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Zap } from 'lucide-react'

export const USER_MENU_VERSION = 3;

interface UserMenuProps {
    isLoggedIn: boolean
    onLoginClick?: () => void
    onLogout: () => void
}

export function UserMenu({ isLoggedIn, onLogout }: UserMenuProps) {
    const [profileDropdown, setProfileDropdown] = useState(false)

    if (isLoggedIn) {
        return (
            <div
                className="relative"
                onMouseEnter={() => setProfileDropdown(true)}
                onMouseLeave={() => setProfileDropdown(false)}
            >
                <Link href="/profile" className="flex items-center cursor-pointer">
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                        <User className="h-4 w-4 text-blue-600" />
                    </div>
                </Link>
                <AnimatePresence>
                    {profileDropdown && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                            <ul className="py-2 text-xs font-semibold">
                                <li>
                                    <Link href="/profile" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        PROFILE
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/report-analysis" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        REPORT ANALYSIS
                                    </Link>
                                </li>
                                <li className="border-t border-gray-100 mt-1">
                                    <button
                                        onClick={onLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 text-red-500 transition-colors"
                                    >
                                        LOG OUT
                                    </button>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    return (
        <div className="flex items-center">
            <Link
                href="/credit-score"
                className="zet-btn-cta group"
            >
                <Zap className="w-3.5 h-3.5 text-white flex-shrink-0 zet-icon-zap" />
                <span className="whitespace-nowrap font-semibold relative z-10">Check Score</span>
                <span className="zet-btn-spark-shimmer" aria-hidden="true" />
                <span className="zet-btn-spark-star" aria-hidden="true" />
            </Link>
        </div>
    )
}


