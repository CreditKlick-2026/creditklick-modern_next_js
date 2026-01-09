"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import {
    ArrowLeft, Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin,
    Phone, Shield, CheckCircle, TrendingUp, CreditCard, Landmark, FileText,
    ChevronRight, X
} from 'lucide-react'

// CTA Banner Interfaces
interface SidebarLink {
    text: string
    url: string
    isActive: boolean
}

interface CtaBanner {
    enabled: boolean
    title: string
    subtitle: string
    highlight: string
    offerText: string
    iconType: 'credit-score' | 'loan' | 'credit-card' | 'insurance' | 'custom'
    customIconUrl?: string
    formTitle: string
    formPlaceholder: string
    buttonText: string
    consentText: string
    redirectUrl: string
    sidebarTitle: string
    sidebarLinks: SidebarLink[]
    stickyBarEnabled: boolean
    stickyBarText: string
    stickyBarButtonText: string
}

interface Post {
    _id: string
    title: string
    slug: string
    content: string
    category: string
    excerpt?: string
    createdAt: string
    updatedAt: string
    readTime?: number
    featuredImage?: { url: string } | string
    authorName?: string // Dynamic author name from admin
    subDescription?: string // Sub-description shown below the main heading
    author?: {
        fullName?: string
        name?: { first?: string; last?: string } | string
        avatar?: { url: string }
    }
    seo?: { metaDescription?: string; metaKeywords?: string[] }
    tags?: string[]
    ctaBanner?: CtaBanner
}

// Utility function to process and clean content formatting
const processContentWithVideos = (content: string): string => {
    if (!content) return content;

    let processed = content;

    // 1. Replace all &nbsp; with regular spaces for better text flow
    processed = processed.replace(/&nbsp;/gi, ' ');

    // 2. Replace multiple consecutive spaces with single space
    processed = processed.replace(/\s{2,}/g, ' ');

    // 3. Clean up empty headings
    processed = processed.replace(/<h[1-6][^>]*>\s*<\/h[1-6]>/gi, '');

    // 4. Clean up empty paragraphs
    processed = processed.replace(/<p[^>]*>\s*<\/p>/gi, '');

    // 5. Remove <strong> tags inside headings (they're already bold)
    processed = processed.replace(/<(h[1-6])([^>]*)><strong>([^<]*)<\/strong><\/\1>/gi, '<$1$2>$3</$1>');

    // 6. Clean up headings with only strong inside
    processed = processed.replace(/<(h[1-6])>\s*<strong>([^<]+)<\/strong>\s*<\/\1>/gi, '<$1>$2</$1>');

    // 7. Add proper table styling classes
    processed = processed.replace(/<table/gi, '<table class="w-full border-collapse my-6 text-sm md:text-base"');
    processed = processed.replace(/<th/gi, '<th class="bg-blue-600 text-white px-4 py-3 text-left font-semibold border border-blue-500"');
    processed = processed.replace(/<td/gi, '<td class="px-4 py-3 border border-gray-200"');
    processed = processed.replace(/<tr>/gi, '<tr class="hover:bg-gray-50 transition-colors">');

    // 8. Style the first row of table as header if no th exists
    processed = processed.replace(
        /<tbody>\s*<tr[^>]*>\s*(<td[^>]*><strong>[^<]+<\/strong><\/td>\s*)+<\/tr>/gi,
        (match) => {
            return match
                .replace(/<td/gi, '<th class="bg-blue-600 text-white px-4 py-3 text-left font-semibold border border-blue-500"')
                .replace(/<\/td>/gi, '</th>');
        }
    );

    // 9. Add spacing classes to lists
    processed = processed.replace(/<ul>/gi, '<ul class="list-disc pl-6 my-4 space-y-2">');
    processed = processed.replace(/<ol>/gi, '<ol class="list-decimal pl-6 my-4 space-y-2">');
    processed = processed.replace(/<li>/gi, '<li class="text-gray-700 leading-relaxed">');

    // 10. Style blockquotes
    processed = processed.replace(/<blockquote>/gi, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700">');

    return processed;
};

// Default CTA Banner values
const defaultCtaBanner: CtaBanner = {
    enabled: true,
    title: 'Check CIBIL Score &',
    subtitle: 'Report worth ₹1,200',
    highlight: 'Absolutely FREE',
    offerText: 'Chance to get Accidental Cover up to ₹1Lakh & more',
    iconType: 'credit-score',
    formTitle: "Let's Get Started",
    formPlaceholder: 'Mobile Number',
    buttonText: 'Check Free Credit Score',
    consentText: 'I hereby appoint CreditKlick as my authorized representative to receive my credit information from Cibil / Equifax / Experian / CRIF Highmark (bureau).',
    redirectUrl: '/credit-score',
    sidebarTitle: 'CIBIL & CIBIL-related Info',
    sidebarLinks: [
        { text: 'CIBIL', url: '/blog/cibil', isActive: true },
        { text: 'How to Read CIBIL Report', url: '/blog/how-to-read-cibil-report', isActive: true },
        { text: 'CIBIL Score for Home Loan', url: '/blog/cibil-score-home-loan', isActive: true },
        { text: 'CIBIL Score for Personal Loan', url: '/blog/cibil-score-personal-loan', isActive: true },
        { text: 'CIBIL Score for Car Loan', url: '/blog/cibil-score-car-loan', isActive: true },
        { text: 'Check your Free CIBIL Score for SBI Loan Eligibility', url: '/blog/sbi-loan-eligibility', isActive: true },
        { text: 'CIBIL Score for Credit Card', url: '/blog/cibil-score-credit-card', isActive: true },
    ],
    stickyBarEnabled: false,
    stickyBarText: 'Check your Credit Score for FREE',
    stickyBarButtonText: 'Check Now'
}
// Icon Components - Shows custom uploaded icon OR default credit score meter
const CTAIcon = ({ customIconUrl }: { type?: string; customIconUrl?: string }) => {
    // If custom icon is uploaded, show it
    if (customIconUrl) {
        return (
            <div className="w-28 h-28 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={customIconUrl}
                    alt="Offer"
                    className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                />
            </div>
        )
    }

    // Default: Show Credit Score Meter
    return (
        <div className="relative w-32 h-28">
            {/* Credit Score Meter */}
            <svg viewBox="0 0 120 80" className="w-full h-full">
                {/* Meter Background */}
                <path
                    d="M 15 60 A 45 45 0 0 1 105 60"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                {/* Colored segments */}
                <path
                    d="M 15 60 A 45 45 0 0 1 35 25"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M 35 25 A 45 45 0 0 1 60 15"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M 60 15 A 45 45 0 0 1 85 25"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M 85 25 A 45 45 0 0 1 105 60"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                {/* Needle */}
                <motion.line
                    x1="60"
                    y1="60"
                    x2="60"
                    y2="25"
                    stroke="#1e40af"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ rotate: -60 }}
                    animate={{ rotate: 30 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ transformOrigin: '60px 60px' }}
                />
                <circle cx="60" cy="60" r="6" fill="#1e40af" />
            </svg>
            {/* Checkmark badge */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -right-2 -bottom-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            >
                <CheckCircle className="w-6 h-6 text-white" />
            </motion.div>
        </div>
    )
}

// CTA Banner Component
const CTABannerSection = ({ ctaBanner }: { ctaBanner: CtaBanner }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [agreed, setAgreed] = useState(false)
    const [error, setError] = useState('')

    const validatePhone = (phone: string) => {
        const phoneRegex = /^[6-9]\d{9}$/
        return phoneRegex.test(phone)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!phoneNumber) {
            setError('Please enter your mobile number')
            return
        }
        if (!validatePhone(phoneNumber)) {
            setError('Please enter a valid 10-digit mobile number')
            return
        }
        if (!agreed) {
            setError('Please agree to the terms')
            return
        }

        // Redirect to credit score page with phone
        window.location.href = `${ctaBanner.redirectUrl}?phone=${phoneNumber}`
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 via-blue-100 to-cyan-50 rounded-2xl overflow-hidden shadow-lg border border-blue-200 mb-8"
        >
            <div className="flex flex-col lg:flex-row">
                {/* Left Side - Content */}
                <div className="lg:w-3/5 p-6 lg:p-8 flex items-center justify-center gap-6">
                    <div className="max-w-md">
                        <h3 className="text-xl lg:text-2xl font-bold text-blue-800 mb-1 leading-tight">
                            {ctaBanner.title}
                            {ctaBanner.subtitle && <span className="text-gray-700"> {ctaBanner.subtitle}</span>}
                            {ctaBanner.highlight && <span className="text-green-600"> {ctaBanner.highlight}</span>}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                            <span className="inline-block w-2 h-2 bg-amber-400 rounded-full"></span>
                            {ctaBanner.offerText}
                        </p>
                    </div>
                    <div className="hidden md:block flex-shrink-0">
                        <CTAIcon type={ctaBanner.iconType} customIconUrl={ctaBanner.customIconUrl} />
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:w-2/5 bg-white p-6 lg:p-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">{ctaBanner.formTitle}</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                                    setPhoneNumber(value)
                                    setError('')
                                }}
                                placeholder={ctaBanner.formPlaceholder}
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <label className="flex items-start gap-2 mb-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => {
                                    setAgreed(e.target.checked)
                                    setError('')
                                }}
                                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-500 leading-relaxed">
                                {ctaBanner.consentText}
                                <span className="text-blue-600 ml-1 cursor-pointer hover:underline">+More</span>
                            </span>
                        </label>

                        {error && (
                            <p className="text-red-500 text-sm mb-3">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/30"
                        >
                            {ctaBanner.buttonText}
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

// Sidebar Links Component - Auto shows posts from same category
const SidebarLinks = ({ currentSlug, relatedPosts, currentCategory }: { ctaBanner?: CtaBanner, currentSlug: string, relatedPosts: Post[], currentCategory: string }) => {
    // Category display name mapping
    const categoryNames: { [key: string]: string } = {
        'credit-cards': 'Credit Cards',
        'loans': 'Loans',
        'cibil': 'CIBIL & Credit Score',
        'tips': 'Financial Tips',
        'news': 'News',
        'guides': 'Guides',
        'calculators': 'Calculators',
        'other': 'Related Articles'
    }
    const categoryDisplayName = categoryNames[currentCategory] || 'Related Articles'

    // Always use category-based posts (auto mode)
    const displayLinks = relatedPosts.map(post => ({
        text: post.title,
        url: `/blog/${post.slug}`,
        isActive: true,
        category: post.category
    }))

    const title = `${categoryDisplayName} Articles`
    const subtitle = `${relatedPosts.length} related articles`

    if (displayLinks.length === 0) return null

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-4">
                <h3 className="font-bold text-base flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    {title}
                </h3>
                {subtitle && <p className="text-blue-100 text-xs mt-1">{subtitle}</p>}
            </div>

            {/* List with custom scrollbar */}
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {displayLinks.map((link, index) => {
                    const isCurrentPage = link.url.includes(currentSlug) || link.url === currentSlug || (link.url.endsWith(currentSlug))
                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors group relative ${isCurrentPage ? 'bg-blue-50/50' : ''
                                }`}
                        >
                            {isCurrentPage && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                            )}
                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${isCurrentPage ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors'
                                }`}>
                                {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium leading-snug ${isCurrentPage ? 'text-blue-700' : 'text-gray-700 group-hover:text-blue-600 transition-colors'
                                    }`}>
                                    {link.text}
                                </p>
                            </div>
                        </Link>
                    )
                })}
                <div className="p-4 bg-gray-50 text-center sticky bottom-0 border-t border-gray-100 backdrop-blur-sm bg-gray-50/90">
                    <Link href={`/blog?category=${currentCategory}`} className="text-xs font-semibold text-blue-600 hover:text-blue-700 uppercase tracking-wide flex items-center justify-center gap-1">
                        View All {categoryDisplayName} <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>

            {displayLinks.length === 0 && (
                <div className="px-5 py-8 text-sm text-gray-400 text-center">
                    No articles in this category
                </div>
            )}
        </div>
    )
}

export default function BlogPostClient({ post, relatedPosts }: { post: Post, relatedPosts: Post[] }) {
    const [shareUrl, setShareUrl] = useState(`https://creditklick.com/blog/${post.slug}`)

    // Merge default CTA banner with post-specific settings
    const ctaBanner: CtaBanner = {
        ...defaultCtaBanner,
        ...(post.ctaBanner || {})
    }

    useEffect(() => {
        setShareUrl(window.location.href)
    }, [])

    const getImageUrl = (post: Post) => {
        if (post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url) return post.featuredImage.url
        if (typeof post.featuredImage === 'string') return post.featuredImage
        return "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1000"
    }

    const getAuthorName = (postData: Post) => {
        // First priority: Admin-controlled authorName field
        if (postData.authorName && postData.authorName.trim()) return postData.authorName
        // Fallback to author object if present
        const author = postData.author
        if (!author) return 'CreditKlick Team'
        if (author.fullName) return author.fullName
        if (author.name && typeof author.name === 'object' && author.name.first) return `${author.name.first} ${author.name.last || ''}`
        if (typeof author.name === 'string') return author.name
        return 'CreditKlick Team'
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Heading Section */}
            <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
                <div className="container mx-auto px-4 md:py-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Category & Read Time Badge */}
                        <div className="flex items-center">
                            <Link
                                href={`/blog?category=${post.category}`}
                                className="inline-flex items-center  px-3 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold hover:bg-blue-100 transition-colors"
                            >
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                {post.category}
                            </Link>

                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-[2.25rem] font-bold text-gray-900 leading-[1.2] tracking-tight text-center">
                            {post.title}
                        </h1>



                        {/* SubDescription */}
                        {post.subDescription && (
                            <p className="text-base sm:text-sm md:text-lg md:text-base text-gray-600 leading-relaxed font-light text-center max-w-3xl mx-auto mt-2">
                                {post.subDescription}
                            </p>
                        )}


                    </motion.div>
                </div>
            </div>

            {/* CTA Banner - First */}
            <div className="container max-w-6xl mx-auto flex justify-center items-center px-4 pt-2">
                {ctaBanner.enabled && <CTABannerSection ctaBanner={ctaBanner} />}
            </div>

            {/* Breadcrumb - Compact */}
            <div className="container mx-auto px-4 py-2 mt-1">
                <div className="flex items-center justify-between text-xs md:text-sm">
                    <div className="flex items-center gap-1.5">
                        <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                        <Link href="/blog" className="text-gray-500 hover:text-blue-600 transition-colors">Blog</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                        <span className="text-gray-700 font-medium truncate max-w-[180px] md:max-w-sm">{post.title}</span>
                    </div>
                    <span className="text-xs text-gray-400 hidden md:block">
                        Updated: {new Date(post.updatedAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </span>
                </div>
            </div>

            {/* Main Content with Right Sidebar Layout */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content - Left side (75%) */}
                    <div className="lg:w-3/4">

                        {/* Article Content */}
                        <article className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8">
                            {/* Featured Image */}
                            <div className="relative w-full h-auto mb-4 md:mb-6 rounded-lg md:rounded-xl overflow-hidden bg-gray-50 flex justify-center items-center">
                                <img
                                    src={getImageUrl(post)}
                                    alt={post.title}
                                    className="w-full h-auto max-h-[600px] object-contain"
                                />
                            </div>




                            {/* Meta - Compact professional layout */}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 pb-4 mb-6 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                        <User className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <span className="font-medium text-gray-800">{getAuthorName(post)}</span>
                                </div>
                                <span className="text-gray-300">•</span>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span>{new Date(post.createdAt).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <span className="text-gray-300">•</span>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span>{post.readTime || 5} min read</span>
                                </div>
                                <Link
                                    href={`/blog?category=${post.category}`}
                                    className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-xs font-medium ml-auto hover:bg-blue-700 transition-colors"
                                >
                                    {post.category}
                                </Link>
                            </div>

                            {/* Post Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: processContentWithVideos(post.content) }}
                            />

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-10 pt-8 border-t border-gray-200">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Tag className="w-4 h-4 text-gray-500" />
                                        {post.tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share */}
                            <div className="mt-10 pt-8 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(shareUrl);
                                        toast.success('Link copied to clipboard!');
                                    }}
                                    className="text-gray-600 mb-4 flex items-center gap-2 font-medium hover:text-blue-600 transition-colors group"
                                >
                                    <div className="bg-gray-100 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </div>
                                    <span className="underline decoration-dotted underline-offset-4">Share this article</span>
                                </button>
                                <div className="flex gap-4">
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/30">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Right Sidebar - All Blogs List (25%) */}
                    <div className="lg:w-1/4">
                        <SidebarLinks ctaBanner={ctaBanner} currentSlug={post.slug} relatedPosts={relatedPosts} currentCategory={post.category} />
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="mt-8 md:mt-12">
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-8">Related Articles</h2>
                        {/* Mobile: 2 columns, Tablet: 2 columns, Desktop: 3 columns */}
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {relatedPosts.slice(0, 6).map((relatedPost) => (
                                <Link key={relatedPost._id} href={`/blog/${relatedPost.slug}`} className="group">
                                    <div className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                        <div className="h-24 sm:h-32 md:h-40 overflow-hidden flex-shrink-0">
                                            <img
                                                src={getImageUrl(relatedPost)}
                                                alt={relatedPost.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col">
                                            <span className="text-[10px] sm:text-xs text-blue-600 font-medium">{relatedPost.category}</span>
                                            <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {relatedPost.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Sticky Bottom Bar - Removed as per request */}
            {/* {ctaBanner.stickyBarEnabled && <StickyBottomBar ctaBanner={ctaBanner} />} */}

            <style jsx global>{`
                .prose iframe, .ql-video {
                    width: 100%;
                    min-height: 350px;
                    aspect-ratio: 16/9;
                    border-radius: 0.75rem;
                    margin: 1.5rem 0;
                }
                @media (max-width: 640px) {
                    .prose iframe, .ql-video {
                        min-height: 200px;
                    }
                }
            `}</style>
        </div>
    )
}
