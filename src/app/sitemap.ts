import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://creditklick.com'
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://betaversion-creditklickapp.onrender.com/api/v1'

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

    // Dynamic Blog Posts
    let blogSitemap: any[] = []
    try {
        const res = await fetch(`${API_BASE_URL}/posts?limit=100&status=published`, {
            next: { revalidate: 3600 }
        })
        const data = await res.json()
        if (data.success && data.data && data.data.posts) {
            blogSitemap = data.data.posts.map((post: any) => ({
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: new Date(post.updatedAt || post.createdAt),
                changeFrequency: 'daily' as any,
                priority: 0.7,
            }))
        }
    } catch (error) {
        console.error('Sitemap blog error:', error)
    }

    return [...staticSitemap, ...blogSitemap]
}
