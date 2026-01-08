import { Metadata } from 'next'
import YesCalculatorClient from './YesCalculatorClient'

export const metadata: Metadata = {
    title: 'YES Bank Credit Card Value Calculator | CreditKlick',
    description: 'Calculate the potential rewards and benefits you can earn with YES Bank Premia credit card based on your monthly spending.',
    keywords: ['YES Bank credit card calculator', 'Premia card rewards', 'credit card value calculator', 'YES Bank credit card benefits'],
    openGraph: {
        title: 'YES Bank Credit Card Value Calculator | CreditKlick',
        description: 'Discover how much you can save with YES Bank credit cards.',
    }
}

export default function YesCalculatorPage() {
    return <YesCalculatorClient />
}
