import { Metadata } from 'next'
import LoansClient from './LoansClient'

export const metadata: Metadata = {
    title: 'Compare & Apply for Loans Online - Best Interest Rates | CreditKlick',
    description: 'Compare and apply for personal loans, home loans, and business loans online with CreditKlick. Get the best interest rates from top banks in India.',
    keywords: ['personal loan', 'home loan', 'business loan', 'apply for loan online', 'lowest interest rate loan india', 'loan comparison'],
    openGraph: {
        title: 'Best Loan Offers in India - Apply Online at CreditKlick',
        description: 'Get instant approvals on loans with competitive interest rates. Compare top banking partners in one place.',
        images: ['/assets/Images/Loans/PL1.png'],
    }
}

export default function LoansPage() {
    return <LoansClient />
}
