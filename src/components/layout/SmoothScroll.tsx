"use client"

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
    children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2, // Scroll animation duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })
        lenisRef.current = lenis

        let rafId: number | null = null
        let idleTimer: NodeJS.Timeout | null = null

        function raf(time: number) {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }

        const onScrollActivity = () => {
            if (!rafId) {
                rafId = requestAnimationFrame(raf)
            }
            if (idleTimer) clearTimeout(idleTimer)
            idleTimer = setTimeout(() => {
                if (rafId && !lenis.isScrolling) {
                    cancelAnimationFrame(rafId)
                    rafId = null
                }
            }, 1500)
        }

        // Trigger RAF loop on user interaction
        window.addEventListener('wheel', onScrollActivity, { passive: true })
        window.addEventListener('touchstart', onScrollActivity, { passive: true })
        window.addEventListener('touchmove', onScrollActivity, { passive: true })
        window.addEventListener('keydown', onScrollActivity, { passive: true })
        window.addEventListener('scroll', onScrollActivity, { passive: true })

        // Initial tick
        onScrollActivity()

        return () => {
            if (rafId) cancelAnimationFrame(rafId)
            if (idleTimer) clearTimeout(idleTimer)
            window.removeEventListener('wheel', onScrollActivity)
            window.removeEventListener('touchstart', onScrollActivity)
            window.removeEventListener('touchmove', onScrollActivity)
            window.removeEventListener('keydown', onScrollActivity)
            window.removeEventListener('scroll', onScrollActivity)
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}

