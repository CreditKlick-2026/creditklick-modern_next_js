import { MetadataRoute } from 'next'
import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/Post'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://creditklick.com'

    const routes = [
        { path: '', priority: 1.0 },
        { path: '/about', priority: 0.8 },
        { path: '/contact', priority: 0.7 },
        { path: '/calculators', priority: 0.9 },
        { path: '/loans', priority: 0.9 },
        { path: '/credit-cards', priority: 0.9 },
        { path: '/credit-score', priority: 1.0 },
        { path: '/blog', priority: 0.8 },
        { path: '/privacy-policy', priority: 0.3 },
        { path: '/terms-conditions', priority: 0.3 },
        { path: '/return-refund', priority: 0.3 },
        { path: '/posh-policy', priority: 0.3 },
        { path: '/cookies-policy', priority: 0.3 },

        { path: '/refine', priority: 0.8 },
        { path: '/loan/personal-loan', priority: 0.9 },
        { path: '/loan/home-loan', priority: 0.9 },
        { path: '/loan/business-loan', priority: 0.9 },
        { path: '/loan/gold-loan', priority: 0.9 },
        { path: '/credit-card/au-bank', priority: 0.8 },
        { path: '/credit-card/idfc-bank', priority: 0.8 },
        { path: '/credit-card/sbi-bank', priority: 0.8 },
        { path: '/credit-card/yes-bank', priority: 0.8 },
        { path: '/calculator/emi-calculator', priority: 0.7 },
        { path: '/calculator/nps-calculator', priority: 0.7 },
        { path: '/calculator/au', priority: 0.6 },
        { path: '/calculator/idfc', priority: 0.6 },
        { path: '/calculator/yes', priority: 0.6 },
        { path: '/calculator/sbi-click', priority: 0.6 },
        { path: '/calculator/sbi-save', priority: 0.6 },
        { path: '/emi', priority: 0.8 },
    ]

    const staticSitemap = routes.map((route) => ({
        url: `${baseUrl}${route.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route.priority,
    }))

    // Dynamic Blog Posts direct from DB
    let blogSitemap: MetadataRoute.Sitemap = []
    try {
        await connectToDatabase()
        const posts = await Post.find({ status: 'published' }).select('slug createdAt updatedAt').lean()

        if (posts && posts.length > 0) {
            blogSitemap = posts.map((post) => ({
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: new Date(post.updatedAt || post.createdAt),
                changeFrequency: 'daily' as const,
                priority: 0.7,
            }))
        }
    } catch (error) {
        console.error('Sitemap blog error:', error)
    }

    return [...staticSitemap, ...blogSitemap]
}
