import { Metadata } from 'next'

const SITE_URL = 'https://creditklick.com'
const SITE_NAME = 'CreditKlick'

export interface SEOConfig {
    title: string
    description: string
    keywords?: string[]
    path: string
    image?: string
    noIndex?: boolean
    type?: 'website' | 'article'
    publishedTime?: string
    modifiedTime?: string
    author?: string
}

/**
 * Generate comprehensive metadata with auto-canonical URL
 * Use this for consistent SEO across all pages
 */
export function generateMetadata(config: SEOConfig): Metadata {
    const {
        title,
        description,
        keywords = [],
        path,
        image = '/assets/Images/creditklic_next_gen.png',
        noIndex = false,
        type = 'website',
        publishedTime,
        modifiedTime,
        author = 'CreditKlick',
    } = config

    const canonicalUrl = `${SITE_URL}${path}`
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

    return {
        title,
        description,
        keywords,
        authors: [{ name: author }],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: SITE_NAME,
            type,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_IN',
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
        robots: noIndex
            ? { index: false, follow: false }
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
    }
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CreditKlick',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/Images/creditklic_next_gen.png`,
        sameAs: [
            'https://www.facebook.com/creditklick',
            'https://twitter.com/creditklick',
            'https://www.linkedin.com/company/creditklick',
            'https://www.instagram.com/creditklick',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-9876543210',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi'],
        },
    }
}

/**
 * Generate JSON-LD structured data for WebSite with SearchAction
 */
export function getWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CreditKlick',
        url: SITE_URL,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }
}

/**
 * Generate JSON-LD for Breadcrumb navigation
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.url}`,
        })),
    }
}

/**
 * Generate JSON-LD for FAQ page
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}

/**
 * Generate JSON-LD for Financial Product (Loan/Credit Card)
 */
export function getFinancialProductSchema(config: {
    name: string
    description: string
    provider: string
    interestRate?: string
    category: 'Loan' | 'Credit Card'
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FinancialProduct',
        name: config.name,
        description: config.description,
        provider: {
            '@type': 'FinancialService',
            name: config.provider,
        },
        ...(config.interestRate && {
            annualPercentageRate: config.interestRate,
        }),
        category: config.category,
    }
}

/**
 * Generate JSON-LD for Article/Blog Post
 */
export function getArticleSchema(config: {
    title: string
    description: string
    url: string
    image: string
    datePublished: string
    dateModified?: string
    author?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: config.title,
        description: config.description,
        image: config.image.startsWith('http') ? config.image : `${SITE_URL}${config.image}`,
        url: config.url.startsWith('http') ? config.url : `${SITE_URL}${config.url}`,
        datePublished: config.datePublished,
        dateModified: config.dateModified || config.datePublished,
        author: {
            '@type': 'Organization',
            name: config.author || 'CreditKlick',
        },
        publisher: {
            '@type': 'Organization',
            name: 'CreditKlick',
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/assets/Images/creditklic_next_gen.png`,
            },
        },
    }
}
