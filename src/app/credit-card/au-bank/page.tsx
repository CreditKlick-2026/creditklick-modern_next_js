import { Metadata } from 'next'
import AUBankClient from './AUBankClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = {
    title: 'AU Small Finance Bank Credit Cards - Apply Online | CreditKlick',
    description: 'Explore and apply for AU Small Finance Bank credit cards including Altura, LIT, Zenith, and Vetta. Get rewarding benefits, cashback, and lounge access.',
    keywords: ['AU Bank credit card', 'AU Altura card', 'AU LIT card', 'AU Zenith credit card', 'apply for AU bank credit card online'],
    openGraph: {
        title: 'AU Bank Credit Cards - Rewarding Benefits & Easy Application',
        description: 'Compare and apply for the best AU Bank credit cards tailored to your lifestyle.',
        images: ['/assets/cards/aum.png'],
    },
    alternates: {
        canonical: '/credit-card/au-bank',
    }
}

export default function AUCardsPage() {
    return <AUBankClient />
}
