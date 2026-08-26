import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/Post'

export async function GET() {
    try {
        await connectToDatabase()

        const categories = await Post.aggregate([
            { $match: { status: 'published' } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $project: { _id: 0, category: '$_id', count: 1 } },
            { $sort: { count: -1 } },
        ])

        return NextResponse.json({
            success: true,
            data: categories,
        })
    } catch (error) {
        console.error('Error fetching categories in Next.js API:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to fetch categories', error: String(error) },
            { status: 500 }
        )
    }
}
