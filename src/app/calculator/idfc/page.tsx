import { Metadata } from 'next'
import IDFCCalculatorClient from './IDFCCalculatorClient'

export const metadata: Metadata = {
    title: 'IDFC FIRST Bank Credit Card Value Calculator | CreditKlick',
    description: 'Calculate the potential rewards and benefits you can earn with IDFC FIRST Bank Millennia credit card based on your monthly spending.',
    keywords: ['IDFC credit card calculator', 'Millennia card rewards', 'credit card value calculator', 'IDFC credit card benefits'],
    openGraph: {
        title: 'IDFC FIRST Bank Credit Card Value Calculator | CreditKlick',
        description: 'Discover how much you can save with IDFC FIRST Bank credit cards.',
    }
}

export default function IDFCCalculatorPage() {
    return <IDFCCalculatorClient />
}
