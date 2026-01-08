import { Metadata } from 'next'
import EMIClient from './EMIClient'

export const metadata: Metadata = {
    title: 'Advanced EMI Calculator - Home, Personal, Business & Car Loan | CreditKlick',
    description: 'Calculate EMI for Home Loan, Personal Loan, Business Loan, and Car Loan with detailed amortization schedule and visual charts. Plan your finances effectively.',
    keywords: ['EMI calculator', 'loan EMI calculator', 'home loan EMI', 'personal loan EMI', 'car loan EMI', 'business loan EMI', 'amortization schedule'],
    openGraph: {
        title: 'Advanced EMI Calculator | CreditKlick',
        description: 'Calculate EMI for all types of loans with detailed year-wise breakdown.',
    }
}

export default function EMIPage() {
    return <EMIClient />
}
