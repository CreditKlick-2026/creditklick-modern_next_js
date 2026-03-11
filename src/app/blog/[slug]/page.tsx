import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'

interface Post {
    _id: string
    title: string
    slug: string
    content: string
    category: string
    authorName?: string
    subDescription?: string
    excerpt?: string
    createdAt: string
    updatedAt: string
    readTime?: number
    featuredImage?: { url: string } | string
    author?: {
        _id?: string
        fullName?: string
        name?: { first?: string; last?: string } | string
        avatar?: { url: string }
    }
    seo?: {
        metaTitle?: string
        metaDescription?: string
        metaKeywords?: string[]
        focusKeyword?: string
        keywords?: string[]
        canonicalUrl?: string
        ogImage?: { url: string; publicId?: string }
        noIndex?: boolean
        noFollow?: boolean
    }
    tags?: string[]
    faqs?: { question: string; answer: string }[]
    ctaBanner?: any // Using any for simplicity as structure is defined in BlogPostClient
}

export const dynamic = 'force-dynamic'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://betaversion-creditklickapp.onrender.com/api/v1'

async function getPost(slug: string): Promise<Post | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/posts/${slug}`, {
            cache: 'no-store' // Disable cache for immediate updates
        })
        if (!res.ok) return null
        const data = await res.json()
        return data.success ? data.data : null
    } catch (error) {
        console.error('Failed to fetch post:', error)
        return null
    }
}

async function getRelatedPosts(category: string, currentSlug: string): Promise<Post[]> {
    try {
        // Fetch related blogs based on category (limit 20 for sidebar)
        const res = await fetch(`${API_BASE_URL}/posts?limit=20&status=published&category=${encodeURIComponent(category)}`, {
            cache: 'no-store'
        })
        if (!res.ok) return []
        const data = await res.json()
        if (data.success) {
            // Return all posts except current one
            return data.data.posts.filter((p: Post) => p.slug !== currentSlug)
        }
        return []
    } catch (error) {
        return []
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)
    if (!post) return { title: 'Post Not Found' }

    const metaTitle = post.seo?.metaTitle || post.title
    const description = post.seo?.metaDescription || post.excerpt || post.title
    const keywords = post.seo?.keywords?.join(', ') || post.seo?.metaKeywords?.join(', ') || post.tags?.join(', ')
    const imageUrl = post.seo?.ogImage?.url || (typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.url) || 'https://creditklick.com/assets/Images/creditklic_next_gen.png'

    return {
        title: metaTitle,
        description: description,
        keywords: keywords,
        openGraph: {
            title: metaTitle,
            description: description,
            type: 'article',
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            authors: [post.author?.fullName || 'CreditKlick'],
            images: [{ url: imageUrl }],
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: description,
            images: [imageUrl],
        },
        alternates: {
            canonical: post.seo?.canonicalUrl || `/blog/${post.slug}`,
        },
        robots: {
            index: !post.seo?.noIndex,
            follow: !post.seo?.noFollow,
        }
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = await getRelatedPosts(post.category, post.slug)

    // Generate JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.seo?.ogImage?.url || (typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.url),
        "datePublished": post.createdAt,
        "dateModified": post.updatedAt,
        "author": {
            "@type": "Person",
            "name": post.author?.fullName || "CreditKlick Team"
        },
        "description": post.seo?.metaDescription || post.excerpt
    }

    // FAQ Schema if exists
    const faqSchema = post.faqs && post.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faqs.map((f: any) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    } : null

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <BlogPostClient post={post} relatedPosts={relatedPosts} />
        </>
    )
}
