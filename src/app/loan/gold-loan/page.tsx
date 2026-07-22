import { Metadata } from 'next'
import GoldLoanClient from './GoldLoanClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
    title: 'Gold Loan - Get Instant Cash Against Your Gold | CreditKlick',
    description: 'Apply for instant gold loan with CreditKlick at just 0.75% interest. Highest per gram rate, 100% insured storage, doorstep service, and disbursal in 30 minutes.',
    keywords: ['gold loan', 'gold loan online', 'instant gold loan', 'loan against gold', 'gold loan interest rate', 'CreditKlick gold loan'],
    openGraph: {
        title: 'Gold Loan - Safe. Instant. Digital. | CreditKlick',
        description: 'Get funds instantly against your gold with highest LTV and safe bank locker storage.',
        images: ['/assets/goldloan/gold_loan_hero.png'],
    },
    alternates: {
        canonical: '/loan/gold-loan',
    }
}

export default function GoldLoanPage() {
    return <GoldLoanClient />
}
