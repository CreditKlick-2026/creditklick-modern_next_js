import { Metadata } from 'next'
import IDFCBankClient from './IDFCBankClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
    title: 'IDFC FIRST Bank Credit Cards - Apply Online | CreditKlick',
    description: 'Discover IDFC FIRST Bank credit cards including FIRST Classic, Millennia, Select, and Wealth. Earn lifetime free benefits, cashback, and lounge access.',
    keywords: ['IDFC credit card', 'IDFC Millennia card', 'IDFC FIRST Classic', 'apply for IDFC credit card', 'lifetime free credit card'],
    openGraph: {
        title: 'IDFC FIRST Bank Credit Cards - Lifetime Free Benefits',
        description: 'Apply for IDFC credit cards with zero joining fee and never-expiring rewards.',
        images: ['/assets/cards/idfcm.png'],
    },
    alternates: {
        canonical: '/credit-card/idfc-bank',
    }
}

export default function IDFCCardsPage() {
    return <IDFCBankClient />
}
