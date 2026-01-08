'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface InternalLink {
    href: string
    label: string
    description?: string
}

// Define internal linking structure for SEO
export const INTERNAL_LINKS = {
    loans: [
        { href: '/loan/personal-loan', label: 'Personal Loan', description: 'Quick personal loans with low interest' },
        { href: '/loan/home-loan', label: 'Home Loan', description: 'Affordable home loan options' },
        { href: '/loan/business-loan', label: 'Business Loan', description: 'Funds for your business growth' },
        { href: '/loan/gold-loan', label: 'Gold Loan', description: 'Instant loan against gold' },
    ],
    creditCards: [
        { href: '/credit-card/au-bank', label: 'AU Bank Credit Cards', description: 'AU Bank card offers' },
        { href: '/credit-card/idfc-bank', label: 'IDFC FIRST Bank Credit Cards', description: 'IDFC card benefits' },
        { href: '/credit-card/sbi-bank', label: 'SBI Credit Cards', description: 'SBI credit card offers' },
        { href: '/credit-card/yes-bank', label: 'YES Bank Credit Cards', description: 'YES Bank card benefits' },
    ],
    calculators: [
        { href: '/calculator/emi-calculator', label: 'EMI Calculator', description: 'Calculate your loan EMI' },
        { href: '/calculator/nps-calculator', label: 'NPS Calculator', description: 'Plan your retirement' },
        { href: '/emi', label: 'Advanced EMI Calculator', description: 'Detailed loan calculations' },
    ],
    services: [
        { href: '/credit-score', label: 'Check Credit Score', description: 'Free credit score check' },
        { href: '/refine', label: 'Credit Refine', description: 'Improve your credit score' },
        { href: '/blog', label: 'Financial Blog', description: 'Expert financial tips' },
    ],
    company: [
        { href: '/about', label: 'About Us', description: 'Learn about CreditKlick' },
        { href: '/contact', label: 'Contact Us', description: 'Get in touch' },
    ],
    legal: [
        { href: '/privacy-policy', label: 'Privacy Policy', description: 'Our privacy practices' },
        { href: '/terms-conditions', label: 'Terms & Conditions', description: 'Terms of service' },
        { href: '/return-refund', label: 'Return & Refund', description: 'Refund policy' },
    ],
} as const

interface RelatedLinksProps {
    category: keyof typeof INTERNAL_LINKS
    title?: string
    excludeCurrent?: boolean
    maxLinks?: number
    className?: string
}

/**
 * Related Links Component for SEO Internal Linking
 * Use this component at the bottom of pages to boost internal link equity
 */
export function RelatedLinks({
    category,
    title = 'Related Links',
    excludeCurrent = true,
    maxLinks = 4,
    className = '',
}: RelatedLinksProps) {
    const pathname = usePathname()

    let links = [...INTERNAL_LINKS[category]] as InternalLink[]

    if (excludeCurrent) {
        links = links.filter(link => link.href !== pathname)
    }

    links = links.slice(0, maxLinks)

    if (links.length === 0) return null

    return (
        <div className={`bg-gray-50 rounded-xl p-6 ${className}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-600 transition-colors" />
                            <span className="font-medium">{link.label}</span>
                        </Link>
                        {link.description && (
                            <p className="text-sm text-gray-500 ml-4">{link.description}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

/**
 * Cross-Category Links for maximum internal linking
 * Shows links from multiple categories
 */
export function CrossCategoryLinks({ className = '' }: { className?: string }) {
    const pathname = usePathname()

    // Get 2 links from each category (excluding current page)
    const allLinks: InternalLink[] = []

    Object.values(INTERNAL_LINKS).forEach((categoryLinks) => {
        const filtered = ([...categoryLinks] as InternalLink[])
            .filter(link => link.href !== pathname)
            .slice(0, 2)
        allLinks.push(...filtered)
    })

    // Shuffle and take 8
    const shuffled = allLinks.sort(() => Math.random() - 0.5).slice(0, 8)

    return (
        <div className={`bg-blue-50 rounded-xl p-6 ${className}`}>
            <h3 className="text-lg font-bold text-blue-900 mb-4">Explore More</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {shuffled.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-sm text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

/**
 * Breadcrumb Component for SEO
 */
interface BreadcrumbItem {
    label: string
    href?: string
}

export function Breadcrumb({ items, className = '' }: { items: BreadcrumbItem[], className?: string }) {
    return (
        <nav aria-label="Breadcrumb" className={`text-sm text-gray-500 ${className}`}>
            <ol className="flex items-center flex-wrap gap-2">
                <li>
                    <Link href="/" className="hover:text-blue-600 transition-colors">
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <span className="text-gray-300">/</span>
                        {item.href ? (
                            <Link href={item.href} className="hover:text-blue-600 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-700">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
