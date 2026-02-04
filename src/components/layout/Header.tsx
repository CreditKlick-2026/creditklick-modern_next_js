"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LogOut, MessageCircle, Loader2, Search } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { verificationAPI, postsAPI } from '@/services/api'
import Cookies from 'js-cookie'
import Image from 'next/image'

const navItems = [
    {
        label: 'Credit Card',
        href: '/credit-cards',
        icon: '/assets/icons/3d/credit-card.png',
        children: [
            { label: 'AU Bank Credit Card', href: '/credit-card/au-bank', icon: '/assets/icons/3d/au-credit-card.png' },
            { label: 'IDFC First Credit Card', href: '/credit-card/idfc-bank', icon: '/assets/icons/3d/idfc-credit-card.png' },
            { label: 'SBI Credit Cards', href: '/credit-card/sbi-bank', icon: '/assets/icons/3d/sbi-credit-card.png' },
            { label: 'Yes Bank Credit Cards', href: '/credit-card/yes-bank', icon: '/assets/icons/3d/yes-credit-card.png' },
        ]
    },
    {
        label: 'Loans',
        href: '/loans',
        icon: '/assets/icons/3d/loans.png',
        children: [
            { label: 'Personal Loan', href: '/loan/personal-loan', icon: '/assets/icons/3d/personal-loan.png' },
            { label: 'Home Loan', href: '/loan/home-loan', icon: '/assets/icons/3d/home-loan.png' },
            { label: 'Business Loan', href: '/loan/business-loan', icon: '/assets/icons/3d/business-loan.png' },
        ]
    },
    { label: 'Credit Refine', href: '/refine', icon: '/assets/icons/3d/credit-refine.png' },
    {
        label: 'Calculators',
        href: '/calculators',
        icon: '/assets/icons/3d/calculator_v2.png',
        children: [
            { label: 'EMI Calculator', href: '/emi', icon: '/assets/icons/3d/emi-calculator.png' },
            { label: 'AU Value Calculator', href: '/calculator/au', icon: '/assets/icons/3d/au-calculator.png' },
            { label: 'IDFC Value Calculator', href: '/calculator/idfc', icon: '/assets/icons/3d/idfc-calculator.png' },
            { label: 'SBI Simply Save', href: '/calculator/sbi-save', icon: '/assets/icons/3d/sbi-save-calculator.png' },
            { label: 'SBI Simply Click', href: '/calculator/sbi-click', icon: '/assets/icons/3d/sbi-click-calculator.png' },
            { label: 'Yes Bank Value', href: '/calculator/yes', icon: '/assets/icons/3d/yes-calculator.png' },
        ]
    },
]

const blogCategoryIcons: { [key: string]: string } = {
    'loans': '/assets/icons/3d/loans.png',
    'Loans': '/assets/icons/3d/loans.png',
    'credit-cards': '/assets/icons/3d/credit-card.png',
    'Credit Cards': '/assets/icons/3d/credit-card.png',
    'Credit Card': '/assets/icons/3d/credit-card.png',
    'cibil': '/assets/icons/3d/cibil.png',
    'CIBIL': '/assets/icons/3d/cibil.png',
    'Cibil': '/assets/icons/3d/cibil.png',
    'Credit Score': '/assets/icons/3d/cibil.png',
    'tips': '/assets/icons/3d/tips.png',
    'Tips': '/assets/icons/3d/tips.png',
    'guides': '/assets/icons/3d/guides.png',
    'Guides': '/assets/icons/3d/guides.png',
    'calculators': '/assets/icons/3d/calculator_v2.png',
    'Calculators': '/assets/icons/3d/calculator_v2.png'
}

const categoryLabels: { [key: string]: string } = {
    'cibil': 'Credit Score',
    'CIBIL': 'Credit Score',
    'credit-score': 'Credit Score',
    'loans': 'Loans',
    'credit-cards': 'Credit Cards',
    'tips': 'Tips & Guides',
    'guides': 'Tips & Guides',
    'calculators': 'Calculators'
}

interface Post {
    _id: string
    title: string
    slug: string
    category?: string
    featuredImage?: { url: string }
}

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [profileDropdown, setProfileDropdown] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [blogCategories, setBlogCategories] = useState<{ label: string, href: string }[]>([])
    const [latestPosts, setLatestPosts] = useState<Post[]>([]) // Latest 6 posts for dropdown
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchResults, setSearchResults] = useState<Post[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null)
    const searchRef = useRef<HTMLDivElement>(null)

    const pathname = usePathname()
    const router = useRouter()

    // Login Flow States
    const [mobileNumber, setMobileNumber] = useState('')
    const [mobileError, setMobileError] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Debounced Search Effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.trim() && searchQuery.length >= 2) {
                setIsSearching(true)
                try {
                    const { data } = await postsAPI.getAll({ search: searchQuery, limit: 5, status: 'published' })
                    if (data.success) {
                        setSearchResults(data.data.posts)
                    }
                } catch (error) {
                    console.error("Search error", error)
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
        window.addEventListener('scroll', handleScroll)

        const fetchCategories = async () => {
            try {
                const response = await postsAPI.getCategories()
                if (response.data.success && response.data.data) {
                    setBlogCategories(response.data.data.map((cat: { category: string }) => ({
                        label: categoryLabels[cat.category] || cat.category,
                        href: `/blog?category=${encodeURIComponent(cat.category)}`
                    })))
                }
            } catch (error) {
                console.error("Failed to fetch blog categories", error)
            }
        }

        // Fetch latest 6 posts for dropdown
        const fetchLatestPosts = async () => {
            try {
                const response = await postsAPI.getAll({ limit: 6, status: 'published' })
                if (response.data.success && response.data.data?.posts) {
                    setLatestPosts(response.data.data.posts)
                }
            } catch (error) {
                console.error("Failed to fetch latest posts", error)
            }
        }

        fetchCategories()
        fetchLatestPosts()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsLoggedIn(!!Cookies.get('user'))
    }, [pathname])

    useEffect(() => {
        setIsMobileMenuOpen(false)
        setOpenDropdown(null)
    }, [pathname])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowLoginModal(false)
        }
        if (showLoginModal) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [showLoginModal])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false)
            }
        }

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSearchOpen])

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
        setMobileNumber('')
        setMobileError('')
        setOtpSent(false)
        setOtp('')
    }

    const handleSendOTP = async () => {
        if (!mobileNumber || mobileNumber.length !== 10) {
            setMobileError('Please enter a valid 10-digit mobile number')
            return
        }
        setMobileError('')
        setIsLoading(true)

        try {
            const response = await verificationAPI.init({ mobile: mobileNumber, isLogin: true })
            const data = response.data

            if (data.requireSignup) {
                toast.error("User not found. Please Sign Up.")
            } else if (data.success) {
                setOtpSent(true)
                toast.success("OTP Sent Successfully")
            } else {
                setMobileError(data.error || "Failed to send OTP")
            }
        } catch (error: unknown) {
            console.error('Login Init Error:', error)
            const err = error as { response?: { data?: { error?: string } } }
            setMobileError(err.response?.data?.error || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setMobileError('Please enter valid 6-digit OTP')
            return
        }
        setIsLoading(true)
        try {
            const response = await verificationAPI.submit({ mobile: mobileNumber, otp: otp, flow: 'MTALKZ' })
            const data = response.data

            if (data.success) {
                Cookies.set('user', JSON.stringify(data.user), { expires: 7 })
                if (data.token) Cookies.set('accessToken', data.token, { expires: 7 })
                if (data.report) Cookies.set('cibil', JSON.stringify(data.report), { expires: 7 })

                toast.success('Login Successful!')
                setIsLoggedIn(true)
                setShowLoginModal(false)
                router.push('/report-analysis')
            } else {
                setMobileError(data.error || "Invalid OTP")
            }
        } catch (error: unknown) {
            console.error('OTP Verify Error:', error)
            const err = error as { response?: { data?: { error?: string } } }
            setMobileError(err.response?.data?.error || "Verification failed")
        } finally {
            setIsLoading(false)
        }
    }

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10)
        setMobileNumber(value)
        if (value.length === 10) setMobileError('')
    }

    return (
        <>
            {/* Preload all dropdown icons - hidden but loads images on page load */}
            <div className="hidden" aria-hidden="true">
                {navItems.map(item => (
                    <div key={item.label}>
                        {item.icon && <Image src={item.icon} alt="" width={1} height={1} priority />}
                        {item.children?.map(child => (
                            child.icon && <Image key={child.href} src={child.icon} alt="" width={1} height={1} priority />
                        ))}
                    </div>
                ))}
                {/* Blog icons */}
                <Image src="/assets/icons/3d/blog.png" alt="" width={1} height={1} priority />
                {Object.values(blogCategoryIcons).map((icon, i) => (
                    <Image key={i} src={icon} alt="" width={1} height={1} priority />
                ))}
            </div>

            {/* Desktop Header */}
            <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden lg:block', isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-lg')}>
                <div className="container-custom">
                    <nav className="flex items-center justify-between h-20 py-2">
                        <Link href="/" className="flex items-center">
                            <Image src="/assets/Images/creditklic_next_gen_transparent.png" alt="CreditKlick" width={96} height={40} className="max-w-24 h-auto" priority />
                        </Link>

                        <div className="flex items-center">
                            <ul className="flex items-center ">
                                {navItems.map((item) => (
                                    <li key={item.label} className="relative px-4" onMouseEnter={() => item.children && setOpenDropdown(item.label)} onMouseLeave={() => setOpenDropdown(null)}>
                                        <Link href={item.href} className={`flex items-center py-2 font-semibold uppercase tracking-wider text-sm transition-colors ${item.label === 'Credit Refine' ? 'text-blue-600' : 'hover:text-blue-600'}`}>
                                            {item.label}
                                            {item.children && <ChevronDown className="ml-1 h-4 w-4" />}
                                        </Link>
                                        <AnimatePresence>
                                            {item.children && openDropdown === item.label && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute top-full left-0 mt-3 bg-white rounded-2xl shadow-xl border-2 border-black ${item.label === 'Loans' ? 'w-64' : item.label === 'Calculators' ? 'w-[450px]' : 'w-72'}`}>
                                                    <div className="absolute -top-[9px] left-8 w-4 h-4 bg-white border-t-2 border-l-2 border-black rotate-45"></div>
                                                    <ul className={`py-1 px-1 relative bg-white rounded-xl ${item.label === 'Calculators' ? 'grid grid-flow-col grid-rows-3 gap-2' : 'space-y-1'}`}>
                                                        {item.children.map((child) => (
                                                            <li key={child.href}>
                                                                <Link href={child.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-bold text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all">
                                                                    {child.icon && <Image src={child.icon} alt="" width={32} height={32} className="w-8 h-8 object-contain mix-blend-multiply" />}
                                                                    <span>{child.label}</span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                ))}


                                {/* Blog Menu */}
                                <li className="relative px-4" onMouseEnter={() => setOpenDropdown('Blogs')} onMouseLeave={() => setOpenDropdown(null)}>
                                    <Link href="/blog" className="flex items-center py-2 font-semibold uppercase tracking-wider text-sm hover:text-blue-600 transition-colors">
                                        Read Blog
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    </Link>
                                    <AnimatePresence>
                                        {openDropdown === 'Blogs' && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full -left-20 mt-3 w-[520px] bg-white rounded-2xl shadow-xl border-2 border-black p-4">
                                                <div className="absolute -top-[9px] left-28 w-4 h-4 bg-white border-t-2 border-l-2 border-black rotate-45"></div>

                                                {/* Header with Categories */}
                                                <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mr-auto">Latest Posts</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {blogCategories.slice(0, 4).map((cat, i) => (
                                                            <Link
                                                                key={i}
                                                                href={cat.href}
                                                                className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors font-medium whitespace-nowrap"
                                                            >
                                                                {cat.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Latest Posts Grid - 2 columns with proper spacing */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    {latestPosts.slice(0, 6).map((post) => (
                                                        <Link
                                                            key={post._id}
                                                            href={`/blog/${post.slug}`}
                                                            className="flex items-start gap-3 p-2 rounded-xl hover:bg-blue-50 transition-all group"
                                                        >
                                                            <div className="w-20 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                                {post.featuredImage?.url ? (
                                                                    <Image
                                                                        src={post.featuredImage.url}
                                                                        alt={post.title}
                                                                        width={80}
                                                                        height={56}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                                                        <Image src="/assets/icons/3d/blog.png" alt="" width={28} height={28} className="w-7 h-7 opacity-50" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h5 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                                                    {post.title}
                                                                </h5>
                                                                {post.category && (
                                                                    <span className="text-[11px] text-blue-500 font-medium uppercase mt-1.5 block">
                                                                        {categoryLabels[post.category] || post.category}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>

                                                {/* View All Button */}
                                                <div className="mt-4 pt-3 border-t border-gray-100">
                                                    <Link
                                                        href="/blog"
                                                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
                                                    >
                                                        View All Blogs
                                                        <ChevronDown className="w-4 h-4 -rotate-90" />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            </ul>
                        </div>

                        {/* Search and Auth Container */}
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="relative z-50" ref={searchRef}>
                                <AnimatePresence>
                                    {isSearchOpen && (
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                                            <motion.form initial={{ width: 0, opacity: 0 }} animate={{ width: 200, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.3 }} onSubmit={handleSearch} className="overflow-hidden bg-white shadow-sm rounded-lg">
                                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search blogs..." className="w-full pl-3 pr-8 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white" autoFocus />
                                                {isSearching && <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-blue-500" />}
                                            </motion.form>
                                        </div>
                                    )}
                                </AnimatePresence>

                                {isSearchOpen && searchQuery.length >= 2 && searchResults.length > 0 && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-2 z-[60]">
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100 mb-1">Top Results</div>
                                        {searchResults.map((post) => (
                                            <div key={post._id} onClick={() => handleResultClick(post.slug)} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-start gap-3 transition-colors">
                                                <div><h4 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{post.title}</h4><span className="text-xs text-blue-500">{post.category}</span></div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`p-2 rounded-full transition-colors z-50 relative ${isSearchOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Auth */}
                            <div className="flex items-center space-x-4">
                                {isLoggedIn ? (
                                    <div className="relative" onMouseEnter={() => setProfileDropdown(true)} onMouseLeave={() => setProfileDropdown(false)}>
                                        <Link href="/profile" className="flex items-center cursor-pointer">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                        </Link>
                                        <AnimatePresence>
                                            {profileDropdown && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border overflow-hidden">
                                                    <ul className="py-2 font-semibold">
                                                        <li><Link href="/profile" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">PROFILE</Link></li>
                                                        <li><Link href="/report-analysis" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">REPORT ANALYSIS</Link></li>
                                                        <li className="border-t border-gray-100 mt-1"><button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 text-red-500 transition-colors">LOG OUT</button></li>
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <button className="font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-800 cursor-pointer" onClick={handleLoginClick}>Log In</button>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white shadow-lg">
                <div className="flex items-center justify-between px-4 h-16">
                    <Link href="/"><Image src="/assets/Images/creditklic_next_gen_transparent.png" alt="CreditKlick" width={80} height={32} className="max-w-[80px] h-auto mt-1" priority /></Link>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3">
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-white border-t">
                            <div className="py-4 px-4 space-y-2">
                                <form onSubmit={handleSearch} className="mb-6 relative">
                                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search blogs..." className="w-full pl-10 pr-10 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-gray-50 shadow-sm" />
                                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    {isSearching && <Loader2 className="absolute right-3 top-3.5 h-5 w-5 animate-spin text-blue-500" />}

                                    {/* Mobile Search Results Dropdown */}
                                    {searchQuery.length >= 2 && searchResults.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-64 overflow-y-auto">
                                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                                                Top Results
                                            </div>
                                            {searchResults.map((post) => (
                                                <div
                                                    key={post._id}
                                                    onClick={() => handleResultClick(post.slug)}
                                                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0"
                                                >
                                                    <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{post.title}</h4>
                                                    {post.category && <span className="text-xs text-blue-500">{post.category}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </form>

                                {navItems.map((item) => (
                                    <div key={item.label}>
                                        {item.children ? (
                                            <>
                                                <button onClick={() => setMobileExpandedItem(mobileExpandedItem === item.label ? null : item.label)} className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold hover:bg-gray-50">
                                                    {item.label}
                                                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedItem === item.label ? 'rotate-180' : ''}`} />
                                                </button>
                                                {mobileExpandedItem === item.label && (
                                                    <div className={`ml-4 border-l-2 border-blue-100 pl-4 py-2 ${item.label === 'Calculators' ? 'grid grid-cols-2 gap-2 pr-2' : 'space-y-1'}`}>
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.label}
                                                                href={child.href}
                                                                className={
                                                                    item.label === 'Calculators'
                                                                        ? "flex flex-col items-center justify-center gap-1 p-2 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors"
                                                                        : "flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
                                                                }
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                            >
                                                                {child.icon && (
                                                                    <Image
                                                                        src={child.icon}
                                                                        alt=""
                                                                        width={32}
                                                                        height={32}
                                                                        className={`object-contain mix-blend-multiply ${item.label === 'Calculators' ? 'w-10 h-10 mb-1' : 'w-8 h-8'}`}
                                                                    />
                                                                )}
                                                                <span className={item.label === 'Calculators' ? "text-[10px] font-bold text-center leading-tight uppercase text-gray-700" : ""}>
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
                                            <Link href={item.href} className="block px-4 py-3 rounded-lg font-semibold hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>
                                        )}
                                    </div>
                                ))}

                                {/* Blog for Mobile */}
                                <div>
                                    <button onClick={() => setMobileExpandedItem(mobileExpandedItem === 'Blog' ? null : 'Blog')} className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold hover:bg-gray-50">
                                        Read Blog
                                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedItem === 'Blog' ? 'rotate-180' : ''}`} />
                                    </button>
                                    {mobileExpandedItem === 'Blog' && (
                                        <div className="ml-4 border-l-2 border-blue-100 pl-4 py-2 space-y-1">
                                            <Link href="/blog" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                                                <Image src="/assets/icons/3d/blog.png" alt="" width={32} height={32} className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                                                <span>All Posts</span>
                                            </Link>
                                            {blogCategories.map((cat, i) => (
                                                <Link key={i} href={cat.href} className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all capitalize" onClick={() => setIsMobileMenuOpen(false)}>
                                                    {blogCategoryIcons[cat.label] && <Image src={blogCategoryIcons[cat.label]} alt="" width={32} height={32} className="w-8 h-8 rounded-lg object-cover shadow-sm" />}
                                                    <span>{cat.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 mt-4 border-t">
                                    {isLoggedIn ? (
                                        <>
                                            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}><Button variant="default" className="w-full mb-2 bg-blue-600 hover:bg-blue-700 text-white">Go to Profile</Button></Link>
                                            <Button variant="default" className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}>Logout</Button>
                                        </>
                                    ) : (
                                        <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => { setIsMobileMenuOpen(false); handleLoginClick(); }}>Log In</Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Login Modal */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4" onClick={(e) => e.target === e.currentTarget && setShowLoginModal(false)}>
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8 hidden md:flex">
                                    <Image src="/assets/Images/creditlogin.png" alt="Login" width={300} height={300} className="object-contain w-full max-w-xs" />
                                </div>
                                <div className="md:w-1/2 p-6 sm:p-12 relative w-full">
                                    <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="h-5 w-5 text-gray-500" /></button>
                                    <div className="w-full">
                                        {!otpSent ? (
                                            <>
                                                <h2 className="text-2xl font-bold mb-6 text-center">Login to CreditKlick</h2>
                                                <div className="mb-4">
                                                    <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
                                                    <input type="tel" value={mobileNumber} onChange={handleMobileChange} placeholder="Enter 10 digit Mobile Number" className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" maxLength={10} />
                                                    {mobileError && <p className="mt-2 text-sm text-red-500">{mobileError}</p>}
                                                </div>
                                                <p className="text-sm text-center mb-4">New user? <Link href="/credit-score" onClick={() => setShowLoginModal(false)} className="text-blue-600 hover:underline">Sign Up</Link></p>
                                                <Button onClick={handleSendOTP} disabled={isLoading} className="w-full">{isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}Send OTP</Button>
                                            </>
                                        ) : (
                                            <>
                                                <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
                                                <div className="mb-4">
                                                    <label className="block mb-2 text-sm font-medium text-gray-700">Enter OTP</label>
                                                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="Enter 6 digit OTP" className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 tracking-widest text-center text-lg" maxLength={6} />
                                                    {mobileError && <p className="mt-2 text-sm text-red-500">{mobileError}</p>}
                                                </div>
                                                <Button onClick={handleVerifyOTP} disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">{isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}Verify OTP</Button>
                                                <button onClick={() => { setOtpSent(false); setOtp(''); }} className="w-full text-sm text-gray-500 hover:text-blue-600 underline mt-4">Change Mobile Number</button>
                                            </>
                                        )}
                                        <div className="mt-6 text-center">
                                            <p className="text-sm text-gray-500">Need help? <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"><MessageCircle className="h-4 w-4 mr-1" />WhatsApp</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
