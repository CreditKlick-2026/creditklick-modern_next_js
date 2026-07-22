import { Metadata } from 'next'
import CalculatorsClient from './CalculatorsClient'

export const metadata: Metadata = {
    title: 'Financial Calculators - EMI, Personal Loan & Credit Card | CreditKlick',
    description: 'Use our free financial calculators to estimate your loan EMIs, credit card rewards, and debt payoffs. Accurate tools to help you plan your financial future.',
    keywords: ['emi calculator', 'loan emi calculator', 'credit card reward calculator', 'financial tools', 'personal loan emi', 'home loan emi calculator'],
    openGraph: {
        title: 'Free Financial Calculators Online | CreditKlick',
        description: 'Plan your finances with precision. Calculate EMIs and credit card benefits instantly.',
        images: ['/assets/calci/EMIcalc.png'],
    }
}

export default function CalculatorsPage() {
    return <CalculatorsClient />
}
