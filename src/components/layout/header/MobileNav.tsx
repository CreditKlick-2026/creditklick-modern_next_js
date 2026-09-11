"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Search, Zap, FileText } from 'lucide-react'

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
    const [expandedBlogCategory, setExpandedBlogCategory] = useState<string | null>('cibil')

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

                            {/* Mobile Blog Accordion */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMobileExpandedItem(mobileExpandedItem === 'Blog' ? null : 'Blog')
                                        fetchBlogDataIfNeeded()
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 text-gray-900"
                                >
                                    <span>Blog</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${
                                            mobileExpandedItem === 'Blog' ? 'rotate-180 text-blue-600' : ''
                                        }`}
                                    />
                                </button>

                                {mobileExpandedItem === 'Blog' && (
                                    <div className="ml-2 pl-3 py-2 space-y-3 border-l-2 border-blue-100">
                                        {/* Quick Category Capsule Pills (Image 2 style) */}
                                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar -mx-1 px-1">
                                            {defaultBlogCategoryGroups.map((group) => {
                                                const isSelected = expandedBlogCategory === group.key
                                                return (
                                                    <button
                                                        key={group.key}
                                                        type="button"
                                                        onClick={() => {
                                                            setExpandedBlogCategory(expandedBlogCategory === group.key ? null : group.key)
                                                        }}
                                                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs active:scale-95 ${
                                                            isSelected
                                                                ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 border border-blue-600'
                                                                : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-400'
                                                        }`}
                                                    >
                                                        <span>{group.label}</span>
                                                        <span className={`text-[11px] font-medium ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                                                            ({group.count})
                                                        </span>
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        {/* Categories as Headers, each displaying its Blog Heading Names */}
                                        <div className="space-y-2">
                                            {defaultBlogCategoryGroups.map((group) => {
                                                const isHeaderOpen = expandedBlogCategory === group.key || expandedBlogCategory === 'ALL'
                                                return (
                                                    <div
                                                        key={group.key}
                                                        className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-2xs transition-all"
                                                    >
                                                        {/* Category Header */}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setExpandedBlogCategory(expandedBlogCategory === group.key ? null : group.key)
                                                            }}
                                                            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50/70 hover:bg-blue-50/40 transition-colors text-left"
                                                        >
                                                            <div className="flex items-center gap-2 min-w-0">
                                                                {group.icon && (
                                                                    <Image
                                                                        src={group.icon}
                                                                        alt=""
                                                                        width={20}
                                                                        height={20}
                                                                        className="w-5 h-5 object-contain mix-blend-multiply flex-shrink-0"
                                                                    />
                                                                )}
                                                                <span className="text-xs font-bold text-gray-800 truncate">
                                                                    {group.label}
                                                                </span>
                                                                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-100 flex-shrink-0">
                                                                    {group.count}
                                                                </span>
                                                            </div>
                                                            <ChevronDown
                                                                className={`w-3.5 h-3.5 text-gray-400 transition-transform flex-shrink-0 ${
                                                                    isHeaderOpen ? 'rotate-180 text-blue-600' : ''
                                                                }`}
                                                            />
                                                        </button>

                                                        {/* Blog Heading Names list inside this Category Header */}
                                                        {isHeaderOpen && (
                                                            <div className="px-3.5 py-2.5 bg-white border-t border-gray-100 space-y-2">
                                                                <ul className="space-y-1.5 pl-2 border-l-2 border-blue-200">
                                                                    {group.posts.map((post) => (
                                                                        <li key={post.slug}>
                                                                            <Link
                                                                                href={`/blog/${post.slug}`}
                                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                                className="group flex items-start gap-2 py-1 text-xs text-gray-700 hover:text-blue-600 transition-colors leading-snug font-medium"
                                                                            >
                                                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0 group-hover:bg-blue-600 group-hover:scale-125 transition-all" />
                                                                                <span className="line-clamp-2 group-hover:underline">
                                                                                    {post.title}
                                                                                </span>
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>

                                                                <div className="pt-1 flex items-center justify-between border-t border-gray-50 text-[11px]">
                                                                    <Link
                                                                        href={group.href}
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                        className="font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
                                                                    >
                                                                        <span>View all in {group.label}</span>
                                                                        <span>→</span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {/* Bottom Direct Link to All Blogs */}
                                        <div className="pt-1">
                                            <Link
                                                href="/blog"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block text-center py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-lg transition-colors"
                                            >
                                                Explore Full Blog Portal →
                                            </Link>
                                        </div>
                                    </div>
                                )}
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
