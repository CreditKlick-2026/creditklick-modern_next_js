"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Calendar, Clock } from "lucide-react"
import { postsAPI } from "@/services/api"

interface Post {
    _id: string
    title: string
    slug: string
    category: string
    excerpt?: string
    metaDescription?: string
    seo?: {
        metaDescription?: string
        metaTitle?: string
    }
    createdAt: string
    readTime?: number
    featuredImage?: { url: string } | string
    author?: {
        fullName?: string
        name?: { first?: string; last?: string } | string
    }
}

interface Category {
    category: string
    count: number
}

interface BlogClientProps {
    initialPosts?: Post[]
    initialCategories?: Category[]
    initialTotalPages?: number
    initialCategory?: string
    initialSearch?: string
    initialPage?: number
}

export default function BlogClient({
    initialPosts = [],
    initialCategories = [],
    initialTotalPages = 1,
    initialCategory = "All",
    initialSearch = "",
    initialPage = 1
}: BlogClientProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search')

    // Use SSR data as initial values - NO loading on first render!
    const [posts, setPosts] = useState<Post[]>(initialPosts)
    const [categories, setCategories] = useState<Category[]>(initialCategories)
    const [loading, setLoading] = useState(false) // Start with false since we have SSR data
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)

    // Pagination State
    const [page, setPage] = useState(initialPage)
    const [totalPages, setTotalPages] = useState(initialTotalPages)
    const LIMIT = 20

    // Track if this is the first mount (skip fetch if SSR data exists)
    const isFirstMount = useRef(true)

    // Sync URL param with state
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam)
        } else if (!searchParam) {
            setSelectedCategory("All")
        }
        setPage(1)
    }, [categoryParam, searchParam])

    useEffect(() => {
        // Skip API fetch on first mount if we have SSR data
        if (isFirstMount.current && initialPosts.length > 0) {
            isFirstMount.current = false
            return
        }
        isFirstMount.current = false

        async function loadData() {
            setLoading(true)
            try {
                const params: Record<string, string | number> = {
                    page,
                    limit: LIMIT,
                    status: 'published'
                }
                if (selectedCategory !== 'All') {
                    params.category = selectedCategory
                }
                if (searchParam) {
                    params.search = searchParam
                }

                const [postsRes, catsRes] = await Promise.all([
                    postsAPI.getAll(params),
                    postsAPI.getCategories()
                ])

                if (postsRes.data.success) {
                    setPosts(postsRes.data.data.posts)
                    setTotalPages(postsRes.data.data.pagination.pages)
                }
                if (catsRes.data.success) {
                    setCategories(catsRes.data.data)
                }
            } catch (error) {
                console.error("Failed to fetch blog data", error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [page, selectedCategory, searchParam])

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }



    const getImageUrl = (post: Post) => {
        if (post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url) return post.featuredImage.url
        if (typeof post.featuredImage === 'string' && post.featuredImage) return post.featuredImage
        if ((post as any).ctaBanner?.customIconUrl) return (post as any).ctaBanner.customIconUrl
        return "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=max&q=80&w=1000"
    }

    const getAuthorName = (author: Post['author']) => {
        if (!author) return 'CreditKlick Team'
        if (author.fullName) return author.fullName
        if (author.name && typeof author.name === 'object' && author.name.first) return `${author.name.first} ${author.name.last || ''}`
        if (typeof author.name === 'string') return author.name
        return 'CreditKlick Team'
    }

    // Category Mapping (Must match Admin Panel)
    const categoryLabels: Record<string, string> = {
        'credit-cards': 'Credit Cards',
        'loans': 'Loans',
        'cibil': 'Credit Score',
        'tips': 'Financial Tips',
        'news': 'News',
        'guides': 'Guides',
        'calculators': 'Calculators',
        'other': 'Other'
    }

    const getCategoryLabel = (catValue: string) => {
        return categoryLabels[catValue] || catValue.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            {/* Hero Section with Animation */}
            {/* Hero Section with Animation */}
            <div className="relative text-white py-20 overflow-hidden bg-blue-900">
                {/* Animated Background Gradient */}
                <motion.div
                    className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900"
                    animate={{
                        background: [
                            "linear-gradient(to bottom right, #1e3a8a, #3730a3, #1e3a8a)",
                            "linear-gradient(to bottom right, #1e40af, #4338ca, #1e40af)",
                            "linear-gradient(to bottom right, #1e3a8a, #3730a3, #1e3a8a)",
                        ],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />

                {/* Floating Shapes Animation */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
                    <motion.div
                        className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-screen blur-3xl opacity-20"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen blur-3xl opacity-20"
                        animate={{
                            x: [0, -100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                    <motion.div
                        className="absolute top-[20%] right-[20%] w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen blur-3xl opacity-20"
                        animate={{
                            x: [0, -50, 0],
                            y: [0, 100, 0],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md"
                    >
                        CreditKlick Insights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-blue-100 max-w-2xl mx-auto drop-shadow"
                    >
                        Expert financial advice, latest news, and guides to help you make smarter money decisions.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* Search Results Header */}
                {searchParam && (
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Search Results for <span className="text-blue-600">&quot;{searchParam}&quot;</span>
                        </h2>
                        <Link href="/blog" className="text-sm text-gray-500 hover:text-blue-600 underline">
                            Clear Search
                        </Link>
                    </div>
                )}

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 sticky top-20 z-20 bg-gray-50/80 backdrop-blur-md py-4 transition-all">
                    <button
                        onClick={() => {
                            setSelectedCategory("All")
                            router.push('/blog')
                            setPage(1)
                        }}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === "All"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            }`}
                    >
                        All Posts
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.category}
                            onClick={() => {
                                setSelectedCategory(cat.category)
                                router.push(`/blog?category=${cat.category}`)
                                setPage(1)
                            }}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.category
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                }`}
                        >
                            {getCategoryLabel(cat.category)} <span className="text-xs opacity-70 ml-1">({cat.count})</span>
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900">No posts found</h3>
                        <p className="text-gray-500 mt-2">Try selecting a different category or check back later.</p>
                    </div>
                ) : (
                    <>
                        {/* Posts Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post._id}
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                                >
                                    <Link href={`/blog/${post.slug}`}>
                                        <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                                            <img
                                                src={getImageUrl(post)}
                                                alt={post.title}
                                                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                                                    {getCategoryLabel(post.category)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.seo?.metaDescription || post.excerpt || 'Read more about this topic...'}</p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>{new Date(post.createdAt).toLocaleDateString('en-IN')}</span>
                                                <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Read More <ArrowRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-gray-600">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
