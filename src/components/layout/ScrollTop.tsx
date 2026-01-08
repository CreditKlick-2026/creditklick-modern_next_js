"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollTop() {
    const pathname = usePathname()

    useEffect(() => {

        window.scrollTo(0, 0)
    }, [pathname])

    useEffect(() => {

        if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual"
        }
    }, [])

    return null
}
