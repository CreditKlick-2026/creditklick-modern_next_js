import { Metadata } from 'next'
import PersonalLoanClient from './PersonalLoanClient'

export const metadata: Metadata = {
    title: 'Personal Loan Offers - Compare Banks & NBFCs | CreditKlick',
    description:
        'Check personal loan eligibility across leading banks and NBFCs in one go. Compare interest rates, EMI, processing fees and the amount you get — then apply directly with the lender.',
    keywords: ['personal loan', 'personal loan eligibility', 'compare personal loan', 'instant personal loan', 'personal loan interest rate', 'CreditKlick personal loan'],
    openGraph: {
        title: 'Compare Personal Loan Offers | CreditKlick',
        description: 'One form, offers from multiple lenders — interest rate, EMI and fees side by side.',
    },
    alternates: {
        canonical: '/loan/personal-loan',
    },
}

export default function PersonalLoanPage() {
    return <PersonalLoanClient />
}
