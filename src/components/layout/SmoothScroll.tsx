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
        lenisRef.current = new Lenis({
            duration: 1.2, // Scroll animation duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        // Animation frame loop
        function raf(time: number) {
            lenisRef.current?.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Cleanup on unmount
        return () => {
            lenisRef.current?.destroy()
        }
    }, [])

    return <>{children}</>
}
