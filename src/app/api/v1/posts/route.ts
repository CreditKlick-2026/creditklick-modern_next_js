import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/Post'

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase()

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1', 10)
        const limit = parseInt(searchParams.get('limit') || '20', 10)
        const category = searchParams.get('category')
        const status = searchParams.get('status') || 'published'
        const search = searchParams.get('search')
        const sortBy = searchParams.get('sortBy') || 'createdAt'
        const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1

        // Build query
        const query: Record<string, unknown> = {}

        if (status !== 'all') {
            query.status = status
        }

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

        // Execute parallel queries for data & total count
        const [posts, total] = await Promise.all([
            Post.find(query)
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(limit)
                .lean(),
            Post.countDocuments(query),
        ])

        const totalPages = Math.ceil(total / limit) || 1

        return NextResponse.json({
            success: true,
            data: {
                posts,
                pagination: {
                    total,
                    pages: totalPages,
                    page,
                    limit,
                    hasMore: page < totalPages,
                },
            },
        })
    } catch (error) {
        console.error('Error fetching posts in Next.js API:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to fetch posts', error: String(error) },
            { status: 500 }
        )
    }
}
