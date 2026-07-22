import { Metadata } from 'next'
import PersonalLoanClient from './PersonalLoanClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
    title: 'Instant Personal Loan Online - Low Interest Rates | CreditKlick',
    description: 'Apply for instant personal loans online with CreditKlick. Get unsecured loans for medical emergencies, home renovation, or travel with minimal documentation and quick disbursal.',
    keywords: ['instant personal loan', 'online personal loan', 'unsecured loan india', 'personal loan eligibility', 'low interest personal loan', 'best bank for personal loan'],
    openGraph: {
        title: 'Apply for Personal Loan Online at Best Rates | CreditKlick',
        description: 'Instant digital processing and quick disbursement on personal loans through our top banking partners.',
        images: ['/assets/pers.png'],
    },
    alternates: {
        canonical: '/loan/personal-loan',
    }
}

export default function PersonalLoanPage() {
    return <PersonalLoanClient />
}
