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

        if (!slug) {
            return NextResponse.json({ success: false, message: 'Slug is required' }, { status: 400 })
        }

        // Find post by slug
        const post = await Post.findOneAndUpdate(
            { slug, status: 'published' },
            { $inc: { views: 1 } },
            { new: true }
        ).lean()

        if (!post) {
            return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: post,
        })
    } catch (error) {
        console.error('Error fetching single post in Next.js API:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to fetch post', error: String(error) },
            { status: 500 }
        )
    }
}
