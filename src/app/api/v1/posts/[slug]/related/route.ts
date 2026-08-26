import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/Post'

interface RouteParams {
    params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await connectToDatabase()
        const { slug } = await params
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '3', 10)

        // Find current post to get its category
        const currentPost = await Post.findOne({ slug, status: 'published' }).select('category tags').lean()

        if (!currentPost) {
            return NextResponse.json({ success: true, data: [] })
        }

        // Find related posts in same category excluding current post
        const related = await Post.find({
            slug: { $ne: slug },
            status: 'published',
            category: currentPost.category,
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean()

        return NextResponse.json({
            success: true,
            data: related,
        })
    } catch (error) {
        console.error('Error fetching related posts in Next.js API:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to fetch related posts', error: String(error) },
            { status: 500 }
        )
    }
}
