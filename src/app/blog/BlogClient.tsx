"use client"

import { useState, useEffect } from "react"
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

export default function BlogClient() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search')

    const [posts, setPosts] = useState<Post[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState("All")

    // Pagination State
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const LIMIT = 20

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
        if (typeof post.featuredImage === 'string') return post.featuredImage
        return "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=max&q=80&w=1000"
    }

    const getAuthorName = (author: Post['author']) => {
        if (!author) return 'CreditKlick Team'
        if (author.fullName) return author.fullName
        if (author.name && typeof author.name === 'object' && author.name.first) return `${author.name.first} ${author.name.last || ''}`
        if (typeof author.name === 'string') return author.name
        return 'CreditKlick Team'
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        CreditKlick Insights
                    </motion.h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Expert financial advice, latest news, and guides to help you make smarter money decisions.
                    </p>
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
                            {cat.category} <span className="text-xs opacity-70 ml-1">({cat.count})</span>
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
                                        <div className="relative w-full aspect-video overflow-hidden bg-white">
                                            <img
                                                src={getImageUrl(post)}
                                                alt={post.title}
                                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                                                    {post.category}
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
