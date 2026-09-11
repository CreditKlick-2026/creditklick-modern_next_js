

// App Shell Container - Updated v2
"use client"

import { usePathname } from 'next/navigation'
import { Header } from './header'
import { Footer } from './footer'
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
            <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden relative">
                <ScrollProgress />
                <Header />
                <main className="flex-1 pt-16 lg:pt-24 w-full max-w-full overflow-x-hidden">
                    {children}
                </main>
                <Footer />

                <FloatingActions />
                <TawkToChat />
            </div>
        </SmoothScroll>
    )
}
