"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Search, Zap } from 'lucide-react'

import { Button, GlobalButton } from '@/components/ui'
import { NavItem, Post } from '@/types'
import { defaultBlogCategoryGroups } from './header.data'

interface MobileNavProps {
    isMobileMenuOpen: boolean
    setIsMobileMenuOpen: (open: boolean) => void
    mobileExpandedItem: string | null
    setMobileExpandedItem: (item: string | null) => void
    navItems: NavItem[]
    blogCategories: { label: string; href: string }[]
    blogCategoryIcons: Record<string, string>
    fetchBlogDataIfNeeded: () => void
    searchQuery: string
    setSearchQuery: (val: string) => void
    searchResults: Post[]
    handleSearch: (e: React.FormEvent) => void
    handleResultClick: (slug: string) => void
    isLoggedIn: boolean
    handleLoginClick: () => void
    handleLogout: () => void
}

export function MobileNav({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    mobileExpandedItem,
    setMobileExpandedItem,
    navItems,
    blogCategories,
    blogCategoryIcons,
    fetchBlogDataIfNeeded,
    searchQuery,
    setSearchQuery,
    searchResults,
    handleSearch,
    handleResultClick,
    isLoggedIn,
    handleLoginClick,
    handleLogout
}: MobileNavProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white shadow-lg">
            <div className="flex items-center justify-between px-4 h-16">
                <Link href="/">
                    <Image
                        src="/assets/creditklic_next_gen_transparent.png"
                        alt="CreditKlick"
                        width={80}
                        height={32}
                        className="max-w-[80px] h-auto mt-1"
                        priority
                    />
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 cursor-pointer"
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white border-t"
                    >
                        <div className="py-4 px-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
                            {/* Category Capsule Pills (Top Row) */}
                            <div className="pb-3 mb-2 border-b border-gray-100">
                                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar -mx-1 px-1">
                                    {defaultBlogCategoryGroups.map((group, idx) => (
                                        <Link
                                            key={group.key}
                                            href={group.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs active:scale-95 flex-shrink-0 ${
                                                idx === 0
                                                    ? 'bg-blue-600 text-white border border-blue-600 shadow-sm shadow-blue-200'
                                                    : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                                            }`}
                                        >
                                            {group.icon && (
                                                <Image
                                                    src={group.icon}
                                                    alt=""
                                                    width={16}
                                                    height={16}
                                                    className={`w-4 h-4 object-contain mix-blend-multiply flex-shrink-0 ${
                                                        idx === 0 ? 'brightness-0 invert' : ''
                                                    }`}
                                                />
                                            )}
                                            <span>{group.label}</span>
                                            <span className={`text-[11px] font-medium ${idx === 0 ? 'text-blue-100' : 'text-gray-400'}`}>
                                                ({group.count})
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Nav Items */}
                            {navItems.map((item) => (
                                <div key={item.label}>
                                    {item.children ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setMobileExpandedItem(
                                                        mobileExpandedItem === item.label ? null : item.label
                                                    )
                                                }
                                                className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold hover:bg-gray-50"
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform ${
                                                        mobileExpandedItem === item.label ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </button>
                                            {mobileExpandedItem === item.label && (
                                                <div
                                                    className={`ml-4 border-l-2 border-blue-100 pl-4 py-2 ${
                                                        item.label === 'Calculators'
                                                            ? 'grid grid-cols-2 gap-2 pr-2'
                                                            : 'space-y-1'
                                                    }`}
                                                >
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.label}
                                                            href={child.href}
                                                            className={
                                                                item.label === 'Calculators'
                                                                    ? 'flex flex-col items-center justify-center gap-1 p-2 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors'
                                                                    : 'flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all'
                                                            }
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {child.icon && (
                                                                <Image
                                                                    src={child.icon}
                                                                    alt=""
                                                                    width={32}
                                                                    height={32}
                                                                    className={`object-contain mix-blend-multiply ${
                                                                        item.label === 'Calculators'
                                                                            ? 'w-10 h-10 mb-1'
                                                                            : 'w-8 h-8'
                                                                    }`}
                                                                />
                                                            )}
                                                            <span
                                                                className={
                                                                    item.label === 'Calculators'
                                                                        ? 'text-[10px] font-bold text-center leading-tight uppercase text-gray-700'
                                                                        : ''
                                                                }
                                                            >
                                                                {item.label === 'Calculators'
                                                                    ? child.label.replace(/Calculator|Value/g, '').trim()
                                                                    : child.label}
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="block px-4 py-3 rounded-lg font-semibold hover:bg-gray-50"
                                            onClick={(e) => {
                                                setIsMobileMenuOpen(false);
                                                if (item.href.includes('#')) {
                                                    const [targetPath, hash] = item.href.split('#');
                                                    if (!targetPath || targetPath === '/' || window.location.pathname === '/') {
                                                        const el = document.getElementById(hash);
                                                        if (el) {
                                                            e.preventDefault();
                                                            setTimeout(() => {
                                                                el.scrollIntoView({ behavior: 'smooth' });
                                                            }, 150);
                                                            window.history.pushState(null, '', `#${hash}`);
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            {/* Mobile Blog Link */}
                            <div>
                                <Link
                                    href="/blog"
                                    className="block px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 text-gray-900"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Blog
                                </Link>
                            </div>

                            {/* Auth Actions in Mobile */}
                            <div className="pt-4 mt-4 border-t">
                                {isLoggedIn ? (
                                    <>
                                        <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button
                                                variant="default"
                                                className="w-full mb-2 bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                Go to Profile
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="default"
                                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                                            onClick={() => {
                                                setIsMobileMenuOpen(false)
                                                handleLogout()
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <GlobalButton
                                        href="/credit-score"
                                        color="blue"
                                        variant="shine"
                                        size="lg"
                                        fullWidth
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="gap-2 font-bold"
                                    >
                                        <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse flex-shrink-0" />
                                        <span>Check Free Credit Score</span>
                                    </GlobalButton>
                                )}


                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
