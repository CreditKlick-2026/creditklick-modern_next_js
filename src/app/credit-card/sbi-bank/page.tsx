import { Metadata } from 'next'
import SBIBankClient from './SBIBankClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
    title: 'SBI Credit Cards - Compare & Apply Online | CreditKlick',
    description: 'Compare and apply for SBI credit cards including SimplyCLICK, SimplySAVE, and Prime. Enjoy cashback, travel rewards, and dining benefits.',
    keywords: ['SBI credit card', 'SBI SimplyCLICK card', 'SBI SimplySAVE card', 'apply SBI credit card online', 'best SBI credit cards'],
    openGraph: {
        title: 'SBI Credit Cards - Trusted Banking Benefits | CreditKlick',
        description: 'Apply for India\'s most popular credit cards from SBI with exclusive offers.',
        images: ['/assets/cards/sbim.png'],
    },
    alternates: {
        canonical: '/credit-card/sbi-bank',
    }
}

export default function SBICardsPage() {
    return <SBIBankClient />
}
