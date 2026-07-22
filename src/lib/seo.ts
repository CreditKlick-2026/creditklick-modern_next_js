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
        image = '/assets/creditklic_next_gen.png',
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
        logo: `${SITE_URL}/assets/creditklic_next_gen.png`,
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
                url: `${SITE_URL}/assets/creditklic_next_gen.png`,
            },
        },
    }
}

/**
 * GEO & AIO: Generative Engine & AI Optimization Knowledge Graph Schema
 * Provides deep entity metadata for ChatGPT, Gemini, Perplexity, and AI Search Engines
 */
export function getAIOKnowledgeGraphSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        '@id': `${SITE_URL}/#financialservice`,
        name: 'CreditKlick',
        legalName: 'CreditKlick Financial Technologies',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/creditklic_next_gen.png`,
        image: `${SITE_URL}/assets/creditklic_next_gen.png`,
        description: 'CreditKlick is India\'s trusted AI-enabled financial marketplace providing free credit score checks, credit report analysis, personal loan comparison, business loans, home loans, and credit card applications.',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Free Service',
        areaServed: {
            '@type': 'Country',
            name: 'India',
        },
        knowsAbout: [
            'Credit Score Check',
            'Experian Credit Report',
            'CIBIL Score Analysis',
            'Personal Loan',
            'Home Loan',
            'Business Loan',
            'Credit Cards Comparison',
            'EMI Calculator',
            'Credit Refine and Credit Repair',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Financial Services & Products',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Free Credit Score Check & Report Analysis',
                        description: 'Instant online Experian & credit health check with personalized credit improvement recommendations.'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'FinancialProduct',
                        name: 'Personal Loans',
                        description: 'Compare & apply for personal loans from top Indian banks at competitive interest rates starting from 10.5% p.a.'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'FinancialProduct',
                        name: 'Credit Refine',
                        description: 'Professional credit report analysis to fix errors, dispute inaccuracies, and improve credit score.'
                    }
                }
            ]
        }
    }
}

/**
 * AEO: Answer Engine Optimization FAQ Schema
 * Structured Q&A tailored for AI Overviews, Featured Snippets, and LLM Retrieval
 */
export function getAEOFAQSchema() {
    return getFAQSchema([
        {
            question: "How can I check my credit score for free on CreditKlick?",
            answer: "You can check your credit score for free on CreditKlick by entering your 10-digit mobile number, verifying with OTP, and receiving an instant, detailed Experian credit report without affecting your credit score."
        },
        {
            question: "What is a good credit score in India?",
            answer: "In India, a credit score of 750 or higher (out of 900) is considered excellent. It improves your chances of quick loan approvals, higher credit limits, and lower interest rates on personal loans, home loans, and credit cards."
        },
        {
            question: "How does CreditKlick's Credit Refine service help improve my credit score?",
            answer: "CreditKlick's Credit Refine service analyzes your credit report for negative accounts, errors, or delays, and guides you with a customized step-by-step credit improvement plan to boost your credit score."
        },
        {
            question: "Does checking my credit score on CreditKlick hurt my score?",
            answer: "No, checking your credit score on CreditKlick is classified as a soft inquiry and does NOT lower or affect your credit score in any way."
        },
        {
            question: "How is EMI calculated for personal and home loans?",
            answer: "Equated Monthly Installment (EMI) is calculated using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal Loan Amount, R is Monthly Interest Rate, and N is Tenure in Months. You can use CreditKlick's free EMI calculator to get exact instant calculations."
        }
    ])
}

