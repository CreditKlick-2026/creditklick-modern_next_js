"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { cn } from '@/lib/utils'
import { postsAPI } from '@/services/api'
import { Post } from '@/types'
import { LoginModal } from '../LoginModal'
import { navItems, blogCategoryIcons, categoryLabels } from './header.data'
import { DesktopNav, DESKTOP_NAV_VERSION } from './DesktopNav'
import { MobileNav } from './MobileNav'
import { HeaderSearch } from './HeaderSearch'
import { UserMenu, USER_MENU_VERSION } from './UserMenu'

// Header Version 2 (DesktopNav: v2, UserMenu: v2)
export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [blogCategories, setBlogCategories] = useState<{ label: string; href: string }[]>([])
    const [latestPosts, setLatestPosts] = useState<Post[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchResults, setSearchResults] = useState<Post[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null)
    const hasFetchedBlogRef = useRef(false)

    const pathname = usePathname()
    const router = useRouter()

    // Fetch blog categories and latest posts for dropdown (cached to avoid duplicate network calls)
    const fetchBlogDataIfNeeded = useCallback(async () => {
        if (hasFetchedBlogRef.current && latestPosts.length > 0) return
        hasFetchedBlogRef.current = true
        try {
            const [catRes, postsRes] = await Promise.all([
                postsAPI.getCategories(),
                postsAPI.getAll({ limit: 6, status: 'published' })
            ])
            if (catRes.data?.success && catRes.data?.data) {
                setBlogCategories(
                    catRes.data.data.map((cat: { category: string }) => ({
                        label: categoryLabels[cat.category] || cat.category,
                        href: `/blog?category=${encodeURIComponent(cat.category)}`
                    }))
                )
            }
            if (postsRes.data?.success && postsRes.data?.data?.posts) {
                setLatestPosts(postsRes.data.data.posts)
            }
        } catch (error) {
            console.error('Failed to fetch blog dropdown data', error)
            hasFetchedBlogRef.current = false
        }
    }, [latestPosts.length])

    // Debounced Search Effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.trim() && searchQuery.length >= 2) {
                setIsSearching(true)
                try {
                    const { data } = await postsAPI.getAll({
                        search: searchQuery,
                        limit: 5,
                        status: 'published'
                    })
                    if (data.success) {
                        setSearchResults(data.data.posts)
                    }
                } catch (error) {
                    console.error('Search error', error)
                } finally {
                    setIsSearching(false)
                }
            } else {
                setSearchResults([])
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsLoggedIn(!!Cookies.get('user'))
    }, [pathname])

    useEffect(() => {
        setIsMobileMenuOpen(false)
        setOpenDropdown(null)
    }, [pathname])

    const handleLogout = () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('user')
        Cookies.remove('cibil')
        setIsLoggedIn(false)
        router.push('/')
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/blog?search=${encodeURIComponent(searchQuery)}`)
            setIsSearchOpen(false)
            setIsMobileMenuOpen(false)
            setSearchQuery('')
            setSearchResults([])
        }
    }

    const handleResultClick = (slug: string) => {
        router.push(`/blog/${slug}`)
        setIsSearchOpen(false)
        setIsMobileMenuOpen(false)
        setSearchQuery('')
        setSearchResults([])
    }

    const handleLoginClick = () => {
        setShowLoginModal(true)
    }

    return (
        <>
            {/* Desktop Header - Clean Solid White Fixed Navbar with No Lines & No Color Difference */}
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 hidden lg:block bg-white transition-all duration-200 clean-header-outer border-none shadow-none',
                    isScrolled ? 'scrolled pt-2 pb-2' : 'pt-4 pb-3'
                )}
                style={{ backgroundColor: '#ffffff', backdropFilter: 'none', WebkitBackdropFilter: 'none', borderBottom: 'none', boxShadow: 'none' }}
            >
                <div className="zet-header-container">
                    {/* Brand Logo on Left */}
                    <Link href="/" className="flex items-center flex-shrink-0">
                        <Image
                            src="/assets/creditklic_next_gen_transparent.png"
                            alt="CreditKlick"
                            width={76}
                            height={42}
                            className="zet-logo-img h-[42px] w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Right-aligned ZET Floating Pill Capsule with all navigation & actions */}
                    <DesktopNav
                        pathname={pathname}
                        navItems={navItems}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        blogCategories={blogCategories}
                        latestPosts={latestPosts}
                        fetchBlogDataIfNeeded={fetchBlogDataIfNeeded}
                    >
                        {/* Subtle divider */}
                        <div className="h-4 w-[1px] bg-gray-200/80 mx-1" />

                        {/* Auth / Score Button */}
                        <UserMenu
                            isLoggedIn={isLoggedIn}
                            onLoginClick={handleLoginClick}
                            onLogout={handleLogout}
                        />
                    </DesktopNav>
                </div>
            </header>

            {/* Mobile Header */}
            <MobileNav
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                mobileExpandedItem={mobileExpandedItem}
                setMobileExpandedItem={setMobileExpandedItem}
                navItems={navItems}
                blogCategories={blogCategories}
                blogCategoryIcons={blogCategoryIcons}
                fetchBlogDataIfNeeded={fetchBlogDataIfNeeded}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                handleSearch={handleSearch}
                handleResultClick={handleResultClick}
                isLoggedIn={isLoggedIn}
                handleLoginClick={handleLoginClick}
                handleLogout={handleLogout}
            />

            {/* Dynamic Login Modal */}
            <LoginModal
                showLoginModal={showLoginModal}
                setShowLoginModal={setShowLoginModal}
                setIsLoggedIn={setIsLoggedIn}
            />
        </>
    )
}
