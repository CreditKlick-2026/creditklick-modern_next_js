import { Metadata } from 'next'
import EMICalculatorClient from './EMICalculatorClient'

export const metadata: Metadata = {
    title: 'EMI Calculator - Calculate Loan EMI Instantly | CreditKlick',
    description: 'Calculate your Equated Monthly Installment (EMI) for any loan. Use our free EMI calculator to plan your finances with adjustable loan amount, interest rate, and tenure.',
    keywords: ['EMI calculator', 'loan EMI', 'monthly installment calculator', 'personal loan EMI', 'home loan EMI calculator'],
    openGraph: {
        title: 'Free EMI Calculator Online | CreditKlick',
        description: 'Plan your loan repayments effectively with our accurate EMI calculator.',
    }
}

export default function EMICalculatorPage() {
    return <EMICalculatorClient />
}
