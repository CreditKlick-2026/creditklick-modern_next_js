import { Metadata } from 'next'
import SBIClickCalculatorClient from './SBIClickCalculatorClient'

export const metadata: Metadata = {
    title: 'SBI SimplyCLICK Credit Card Value Calculator | CreditKlick',
    description: 'Calculate the potential rewards and benefits you can earn with SBI SimplyCLICK credit card based on your monthly spending on online and partner merchants.',
    keywords: ['SBI SimplyCLICK calculator', 'SBI credit card rewards', 'credit card value calculator', 'SBI card benefits for online shopping'],
    openGraph: {
        title: 'SBI SimplyCLICK Credit Card Calculator | CreditKlick',
        description: 'Discover your rewards with SBI SimplyCLICK credit card.',
    }
}

export default function SBIClickCalculatorPage() {
    return <SBIClickCalculatorClient />
}
