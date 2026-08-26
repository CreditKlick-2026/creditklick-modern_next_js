import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import BlogPostClient from './BlogPostClient'
import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/Post'

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 3600 // Revalidate once per hour

// Memoize getPost using React.cache so generateMetadata & BlogPostPage share the exact same execution
const getPost = cache(async (slug: string) => {
    try {
        await connectToDatabase()
        const post = await Post.findOneAndUpdate(
            { slug, status: 'published' },
            { $inc: { views: 1 } },
            { new: true }
        ).lean()

        if (!post) return null
        return JSON.parse(JSON.stringify(post))
    } catch (error) {
        console.error('Failed to fetch post from DB:', error)
        return null
    }
})

const getRelatedPosts = cache(async (category: string, currentSlug: string) => {
    try {
        await connectToDatabase()
        const related = await Post.find({
            slug: { $ne: currentSlug },
            status: 'published',
            category: category,
        })
            .sort({ createdAt: -1 })
            .limit(6)
            .lean()

        return JSON.parse(JSON.stringify(related))
    } catch (error) {
        console.error('Failed to fetch related posts from DB:', error)
        return []
    }
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)
    if (!post) return { title: 'Post Not Found' }

    const metaTitle = post.seo?.metaTitle || post.title
    const description = post.seo?.metaDescription || post.excerpt || post.title
    const keywords = post.seo?.keywords?.join(', ') || post.seo?.metaKeywords?.join(', ') || post.tags?.join(', ')
    const imageUrl = post.seo?.ogImage?.url || (typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.url) || 'https://creditklick.com/assets/creditklic_next_gen.png'

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
