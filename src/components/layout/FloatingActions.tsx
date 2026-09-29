"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function FloatingActions() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 200) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener('scroll', toggleVisibility, { passive: true })
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <>

            {/* Go to Top Icon - Bottom Right (Exact Legacy Position) */}
            <AnimatePresence>
                {isVisible && (
                    <div className="fixed right-4 bottom-8 z-[9999]">
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            onClick={scrollToTop}
                            className="bg-blue-100 text-blue-600 border border-blue-200 p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="w-5 h-5" />
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
