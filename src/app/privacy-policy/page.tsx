import { Metadata } from 'next'
import PrivacyPolicyClient from './PrivacyPolicyClient'

export const metadata: Metadata = {
    title: 'Privacy Policy | CreditKlick',
    description: 'Learn how CreditKlick collects, uses, and protects your personal and financial information. We are committed to maintaining your privacy and data security.',
    keywords: ['privacy policy', 'data protection', 'creditklick privacy', 'information security'],
    openGraph: {
        title: 'Privacy Policy - How We Protect Your Data | CreditKlick',
        description: 'Read our privacy policy to understand our commitment to your data privacy and security.',
    }
}

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyClient />
}
