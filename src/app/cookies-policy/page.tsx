import { Metadata } from 'next'
import CookiesPolicyClient from './CookiesPolicyClient'

export const metadata: Metadata = {
    title: 'Cookies Policy | CreditKlick',
    description: 'Understand how CreditKlick uses cookies to enhance your experience, analyze site traffic, and provide personalized services.',
    keywords: ['cookies policy', 'browser cookies', 'data tracking', 'creditklick cookies'],
    openGraph: {
        title: 'Cookies Policy - CreditKlick',
        description: 'How we use cookies to improve your user experience.',
    }
}

export default function CookiesPolicyPage() {
    return <CookiesPolicyClient />
}
