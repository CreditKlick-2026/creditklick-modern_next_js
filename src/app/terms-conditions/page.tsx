import { Metadata } from 'next'
import TermsConditionsClient from './TermsConditionsClient'

export const metadata: Metadata = {
    title: 'Terms and Conditions | CreditKlick',
    description: 'Read the terms and conditions for using CreditKlick services. Understand your rights and responsibilities when using our financial marketplace and tools.',
    keywords: ['terms and conditions', 'user agreement', 'legal terms', 'creditklick terms'],
    openGraph: {
        title: 'Terms and Conditions - CreditKlick',
        description: 'The legal framework for using our website and services.',
    }
}

export default function TermsConditionsPage() {
    return <TermsConditionsClient />
}
