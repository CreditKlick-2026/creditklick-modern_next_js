import { Metadata } from 'next'
import HomeLoanClient from './HomeLoanClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
    title: 'Low Interest Home Loans - Compare & Apply Online | CreditKlick',
    description: 'Find the best home loan interest rates in India. Apply for a new home loan or transfer your existing home loan at lower rates with CreditKlick. 30-year flexible tenure.',
    keywords: ['home loan india', 'lowest home loan interest rate', 'housing loan', 'home loan transfer', 'apply for home loan online', 'home loan eligibility'],
    openGraph: {
        title: 'Instant Home Loan Approval Online | CreditKlick',
        description: 'Get up to 90% funding for your dream home with quick digital processing and long repayment tenures.',
        images: ['/assets/authloan.png'],
    },
    alternates: {
        canonical: '/loan/home-loan',
    }
}

export default function HomeLoanPage() {
    return <HomeLoanClient />
}
