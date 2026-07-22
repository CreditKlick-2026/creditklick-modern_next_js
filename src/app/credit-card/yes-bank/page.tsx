import { Metadata } from 'next'
import YESBankClient from './YESBankClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
    title: 'YES Bank Credit Cards - Apply Online | CreditKlick',
    description: 'Explore YES Bank credit cards including Rewards Plus, Prosperity Edge, and Premia. Earn never-expiring reward points and enjoy annual bonuses.',
    keywords: ['YES Bank credit card', 'YES Rewards Plus card', 'YES Prosperity Edge', 'YES Premia card', 'apply for YES bank credit card'],
    openGraph: {
        title: 'YES Bank Credit Cards - Never Expiring Rewards',
        description: 'Apply for YES Bank credit cards with exclusive annual bonuses and lounge access.',
        images: ['/assets/cards/yesm.png'],
    },
    alternates: {
        canonical: '/credit-card/yes-bank',
    }
}

export default function YesCardsPage() {
    return <YESBankClient />
}
