// SSR - Server-rendered blog page directly connected to MongoDB
import { Metadata } from 'next'
import BlogClient from '@/app/blog/BlogClient'
import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/Post'

export const metadata: Metadata = {
    title: 'Blogs - Financial Tips, Credit Cards & Loans | CreditKlick',
    description: 'Read expert articles on credit scores, credit cards, loans, and financial planning to make informed decisions.',
    keywords: ['financial blogs', 'credit score tips', 'credit card guide', 'loan advice', 'personal finance', 'money management'],
    openGraph: {
        title: 'Financial Insights & Expert Advice | CreditKlick Blog',
        description: 'Expert articles on credit scores, loans, and credit cards to help you make smart financial decisions.',
    }
}

// ISR - revalidate every 60 seconds for fast caching
export const revalidate = 60

interface PageProps {
    searchParams: Promise<{ category?: string; search?: string; page?: string }>
}

async function getPosts(category?: string, search?: string, page: number = 1) {
    try {
        await connectToDatabase()
        const limit = 20
        const query: Record<string, unknown> = { status: 'published' }

        if (category && category !== 'All') {
            query.category = category
        }

        if (search && search.trim()) {
            query.$or = [
                { title: { $regex: search.trim(), $options: 'i' } },
                { excerpt: { $regex: search.trim(), $options: 'i' } },
                { category: { $regex: search.trim(), $options: 'i' } },
            ]
        }

        const skip = (page - 1) * limit
        const [posts, total] = await Promise.all([
            Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Post.countDocuments(query),
        ])

        const totalPages = Math.ceil(total / limit) || 1

        return {
            posts: JSON.parse(JSON.stringify(posts)),
            pagination: {
                total,
                pages: totalPages,
                page,
                limit,
                hasMore: page < totalPages,
            },
        }
    } catch (error) {
        console.error('getPosts direct DB error:', error)
        return { posts: [], pagination: { pages: 1 } }
    }
}

async function getCategories() {
    try {
        await connectToDatabase()
        const categories = await Post.aggregate([
            { $match: { status: 'published' } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $project: { _id: 0, category: '$_id', count: 1 } },
            { $sort: { count: -1 } },
        ])
        return JSON.parse(JSON.stringify(categories))
    } catch (error) {
        console.error('getCategories direct DB error:', error)
        return []
    }
}

export default async function BlogPage({ searchParams }: PageProps) {
    const params = await searchParams
    const category = params?.category || 'All'
    const search = params?.search || ''
    const page = parseInt(params?.page || '1', 10)

    // Parallel fetch direct from Database (0ms external latency)
    const [postsData, categories] = await Promise.all([
        getPosts(category, search, page),
        getCategories(),
    ])

    return (
        <BlogClient
            initialPosts={postsData.posts}
            initialCategories={categories}
            initialCategory={category}
            initialSearch={search}
            initialPage={page}
            initialTotalPages={postsData.pagination?.pages || 1}
        />
    )
}
