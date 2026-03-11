// SSR - Server-rendered blog page with data fetched at request time
import { Metadata } from 'next'
import BlogClient from '@/app/blog/BlogClient'

export const metadata: Metadata = {
    title: 'Blogs - Financial Tips, Credit Cards & Loans | CreditKlick',
    description: 'Read expert articles on credit scores, credit cards, loans, and financial planning to make informed decisions.',
    keywords: ['financial blogs', 'credit score tips', 'credit card guide', 'loan advice', 'personal finance', 'money management'],
    openGraph: {
        title: 'Financial Insights & Expert Advice | CreditKlick Blog',
        description: 'Expert articles on credit scores, loans, and credit cards to help you make smart financial decisions.',
    }
}

// SSR - data is fetched at request time
export const dynamic = 'force-dynamic'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://betaversion-creditklickapp.onrender.com/api/v1'

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

// Fetch posts on server
async function getPosts(category?: string, search?: string, page: number = 1) {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: '20',
            status: 'published'
        })
        if (category && category !== 'All') params.append('category', category)
        if (search) params.append('search', search)

        const res = await fetch(`${API_BASE_URL}/posts?${params}`, {
            next: { revalidate: 60 } // Cache for 60 seconds (ISR)
        })

        if (!res.ok) throw new Error('Failed to fetch posts')
        const data = await res.json()
        return data.success ? data.data : { posts: [], pagination: { pages: 1 } }
    } catch (error) {
        console.error('SSR getPosts error:', error)
        return { posts: [], pagination: { pages: 1 } }
    }
}

async function getCategories() {
    try {
        const res = await fetch(`${API_BASE_URL}/posts/categories`, {
            next: { revalidate: 300 } // Cache categories for 5 minutes
        })

        if (!res.ok) throw new Error('Failed to fetch categories')
        const data = await res.json()
        return data.success ? data.data : []
    } catch (error) {
        console.error('SSR getCategories error:', error)
        return []
    }
}

interface PageProps {
    searchParams: Promise<{ category?: string; search?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: PageProps) {
    const params = await searchParams
    const category = params?.category || 'All'
    const search = params?.search || ''
    const page = parseInt(params?.page || '1', 10)

    // Parallel fetch on server
    const [postsData, categories] = await Promise.all([
        getPosts(category, search, page),
        getCategories()
    ])

    return (
        <BlogClient
            initialPosts={postsData.posts as Post[]}
            initialCategories={categories as Category[]}
            initialTotalPages={postsData.pagination?.pages || 1}
            initialCategory={category}
            initialSearch={search}
            initialPage={page}
        />
    )
}
