import { Metadata } from 'next'
import AUCalculatorClient from './AUCalculatorClient'

export const metadata: Metadata = {
    title: 'AU Bank Credit Card Value Calculator | CreditKlick',
    description: 'Calculate the potential reward points and benefits you can earn with AU Bank Vetta credit card based on your monthly spending.',
    keywords: ['AU Bank credit card calculator', 'Vetta card rewards', 'credit card value calculator', 'AU credit card benefits'],
    openGraph: {
        title: 'AU Bank Credit Card Value Calculator | CreditKlick',
        description: 'Discover how much you can save with AU Bank credit cards.',
    }
}

export default function AUCalculatorPage() {
    return <AUCalculatorClient />
}
