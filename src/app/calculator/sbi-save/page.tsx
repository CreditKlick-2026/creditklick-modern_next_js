import { Metadata } from 'next'
import SBISaveCalculatorClient from './SBISaveCalculatorClient'

export const metadata: Metadata = {
    title: 'SBI SimplySAVE Credit Card Value Calculator | CreditKlick',
    description: 'Calculate the potential rewards and benefits you can earn with SBI SimplySAVE credit card based on your monthly spending on groceries, dining, and movies.',
    keywords: ['SBI SimplySAVE calculator', 'SBI credit card rewards', 'credit card value calculator', 'SBI card benefits for groceries'],
    openGraph: {
        title: 'SBI SimplySAVE Credit Card Calculator | CreditKlick',
        description: 'Discover your rewards with SBI SimplySAVE credit card.',
    }
}

export default function SBISaveCalculatorPage() {
    return <SBISaveCalculatorClient />
}
