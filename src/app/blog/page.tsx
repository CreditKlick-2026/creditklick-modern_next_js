// SSR - Dynamic page that fetches data on each request
import { Metadata } from 'next'
import BlogClient from '@/app/blog/BlogClient'

export const metadata: Metadata = {
    title: 'Blogs - Financial Tips, Credit Cards & Loans | CreditKlick',
    description: 'Read expert articles on credit scores, credit cards, loans, and financial planning to make informed decisions.',
    keywords: ['financial blogs', 'credit score tips', 'credit card guide', 'loan advice', 'personal finance', 'money management'],
    openGraph: {
        title: 'Financial Insights & Expert Advice | CreditKlick Blog',
        description: 'Expert articles on credit scores, loans, and credit cards to help you make smart financial decisions.',
    }
}

// SSR - data is fetched at request time
export const dynamic = 'force-dynamic'

export default function BlogPage() {
    return <BlogClient />

}
