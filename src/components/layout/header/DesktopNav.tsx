"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NavItem, Post } from '@/types'
import { RollingText } from './RollingText'

export const DESKTOP_NAV_VERSION = 2;

// Modern ZET App Navigation with Rolling Text

interface DesktopNavProps {
    pathname: string
    navItems: NavItem[]
    openDropdown: string | null
    setOpenDropdown: (val: string | null) => void
    blogCategories: { label: string; href: string }[]
    latestPosts: Post[]
    fetchBlogDataIfNeeded: () => void
    children?: React.ReactNode
}

export function DesktopNav({
    pathname,
    navItems,
    openDropdown,
    setOpenDropdown,
    blogCategories,
    latestPosts,
    fetchBlogDataIfNeeded,
    children
}: DesktopNavProps) {
    const router = useRouter()

    return (
        <nav
            className="zet-nav-pill !bg-white"
            style={{ backgroundColor: '#ffffff', backdropFilter: 'none', WebkitBackdropFilter: 'none' }}
        >
            <Link
                href="/about"
                className={cn('zet-nav-link', pathname === '/about' && 'active')}
            >
                <RollingText text="About Us" />
            </Link>

            {navItems.map((item) => (
                <div
                    key={item.label}
                    className="zet-nav-item"
                    onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <Link
                        href={item.href}
                        onClick={(e) => {
                            if (item.href.includes('#')) {
                                const [targetPath, hash] = item.href.split('#');
                                if (!targetPath || targetPath === '/' || pathname === '/') {
                                    const el = document.getElementById(hash);
                                    if (el) {
                                        e.preventDefault();
                                        el.scrollIntoView({ behavior: 'smooth' });
                                        window.history.pushState(null, '', `#${hash}`);
                                    }
                                }
                            }
                        }}
                        className={cn(
                            'zet-nav-link',
                            (pathname === item.href ||
                                (item.children && item.children.some((c) => c.href === pathname))) &&
                                'active'
                        )}
                    >
                        <RollingText text={item.label} />
                        {item.children && (
                            <ChevronDown
                                className={cn(
                                    'h-5 w-5 transition-transform duration-200',
                                    openDropdown === item.label && 'rotate-180 text-blue-600'
                                )}
                            />
                        )}
                    </Link>

                    <AnimatePresence>
                        {item.children && openDropdown === item.label && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className={cn(
                                    'zet-dropdown-card',
                                    item.label === 'Loans'
                                        ? 'w-64'
                                        : item.label === 'Calculators'
                                        ? 'w-[440px]'
                                        : 'w-72'
                                )}
                            >
                                <ul
                                    className={
                                        item.label === 'Calculators'
                                            ? 'grid grid-flow-col grid-rows-3 gap-2'
                                            : 'space-y-1'
                                    }
                                >
                                    {item.children.map((child) => (
                                        <li key={child.href}>
                                            <Link href={child.href} prefetch={true} className="zet-dropdown-item">
                                                {child.icon && (
                                                    <Image
                                                        src={child.icon}
                                                        alt=""
                                                        width={24}
                                                        height={24}
                                                        className="w-6 h-6 object-contain mix-blend-multiply flex-shrink-0"
                                                    />
                                                )}
                                                <span>{child.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}

            {/* Blog Menu - Simple Normal Button */}
            <Link
                href="/blog"
                prefetch={true}
                className={cn('zet-nav-link', pathname.startsWith('/blog') && 'active')}
            >
                <RollingText text="Blog" />
            </Link>

            {/* Injected Action Items (Search & CTA) inside the pill */}
            {children}
        </nav>
    )
}
