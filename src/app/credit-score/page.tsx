import { Metadata } from 'next'
import CreditScoreClient from './CreditScoreClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
    title: 'Check Free Credit Score Online | Experian Credit Report - CreditKlick',
    description: 'Get your free credit score and detailed credit report online from Experian. Monitor your credit health, get personalized loan offers, and insights to improve your score at CreditKlick.',
    keywords: ['free credit score check', 'check cibil score free', 'experian credit report india', 'online credit score', 'improve credit score', 'credit monitoring service'],
    openGraph: {
        title: 'Check Your Credit Score Online for Free | CreditKlick',
        description: 'Instant access to your Experian credit report. Join 200K+ users who trust CreditKlick for their financial health monitoring.',
        images: ['/assets/Images/Cibil/scoremeter.png'],
    },
    alternates: {
        canonical: '/credit-score',
    }
}

export default function CreditScorePage() {
    return <CreditScoreClient />
}
