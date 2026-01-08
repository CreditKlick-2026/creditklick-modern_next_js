import { Metadata } from 'next'
import AboutClient from './AboutClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
    title: 'About Us - Our Mission & Vision | CreditKlick',
    description: 'Learn about CreditKlick, organized with the goal of making financial products like loans and credit cards accessible, transparent, and easy to understand for everyone in India.',
    keywords: ['about creditklick', 'financial marketplace india', 'credit score mission', 'creditklick story'],
    openGraph: {
        title: 'About CreditKlick - Making Finance Transparent',
        description: 'Discover how CreditKlick is revolutionizing the financial landscape in India.',
        images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'],
    },
    alternates: {
        canonical: '/about',
    }
}

export default function AboutPage() {
    return <AboutClient />
}
