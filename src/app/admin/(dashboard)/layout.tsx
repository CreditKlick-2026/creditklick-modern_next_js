"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    LucideIcon
} from 'lucide-react'

// Asset path
const Logo = '/assets/creditklic_next_gen.png'

interface SidebarItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

const sidebarItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FileText, label: 'Posts', href: '/admin/posts' },
    { icon: Users, label: 'Leads', href: '/admin/leads' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: LayoutDashboard, label: 'Analytics', href: '/admin/analytics' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        const token = Cookies.get('accessToken')
        if (!token) {
            router.push('/admin/login')
        } else {
            setIsAuthorized(true)
        }
    }, [pathname, router])

    const handleLogout = () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('user')
        router.push('/admin/login')
    }

    if (!isAuthorized) {
        return null; // Or a loading spinner
    }

    const hideChatStyles = `
        div[class*="tawk"], 
        iframe[title*="chat"], 
        .widget-visible-frame, 
        iframe[src*="tawk.to"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            z-index: -9999 !important;
        }
    `

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <style jsx global>{hideChatStyles}</style>
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300
                lg:relative lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
                    <Link href="/admin/posts">
                        <img src={Logo} alt="CreditKlick" className="h-8 brightness-0 invert" />
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                    ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }
                                `}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="text-sm font-medium">{item.label}</span>
                                {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
                {/* Top Bar */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <span className="text-sm text-gray-600 font-medium">Admin Panel</span>
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 p-4 lg:p-6 overflow-x-hidden"
                >
                    {children}
                </motion.main>
            </div>
        </div>
    )
}
