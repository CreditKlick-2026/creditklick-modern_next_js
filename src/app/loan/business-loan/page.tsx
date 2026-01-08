import { Metadata } from 'next'
import BusinessLoanClient from './BusinessLoanClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
    title: 'Business Loans for Small Businesses & Startups | CreditKlick',
    description: 'Empower your business with easy and quick business loans through CreditKlick. Get unsecured business loans up to ₹50 Lakhs with minimum documentation and competitive interest rates.',
    keywords: ['business loan india', 'unsecured business loan', 'msme loan', 'startup loan', 'business loan eligibility', 'working capital loan'],
    openGraph: {
        title: 'Apply for Business Loan Online - Quick Approval | CreditKlick',
        description: 'Get the funding your business needs to grow. Instant approval and competitive rates from top lenders.',
        images: ['/assets/Images/businessloan.png'],
    },
    alternates: {
        canonical: '/loan/business-loan',
    }
}

export default function BusinessLoanPage() {
    return <BusinessLoanClient />
}
