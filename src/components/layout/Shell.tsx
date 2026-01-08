"use client"

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingActions } from './FloatingActions'
import { TawkToChat } from './TawkToChat'
import { ScrollProgress } from './ScrollProgress'
import { SmoothScroll } from './SmoothScroll'

export function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    // Check if path starts with /admin (but NOT if it is just /admin if that redirects... wait, /admin* covers all)
    const isAdmin = pathname?.startsWith('/admin')

    if (isAdmin) {
        return <>{children}</>
    }

    return (
        <SmoothScroll>
            <div className="min-h-screen flex flex-col">
                <ScrollProgress />
                <Header />
                <main className="flex-1 pt-16 lg:pt-20">
                    {children}
                </main>
                <Footer />
                <FloatingActions />
                <TawkToChat />
            </div>
        </SmoothScroll>
    )
}
