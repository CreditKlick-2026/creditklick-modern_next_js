import { Metadata } from 'next'
import RevokeConsentClient from './RevokeConsentClient'

export const metadata: Metadata = {
    title: 'Revoke Consent & User Data Deletion | CreditKlick',
    description: 'Exercise your Right to be Forgotten and revoke your data processing consent on CreditKlick in compliance with DPDP Act 2023.',
    keywords: ['revoke consent', 'data deletion', 'credit report deletion', 'dpdp act 2023', 'right to be forgotten india', 'creditklick privacy'],
    openGraph: {
        title: 'Revoke Consent & Delete Personal Data | CreditKlick',
        description: 'Revoke data processing consent and delete your stored profile and credit score records.',
    },
    alternates: {
        canonical: '/revoke-consent',
    }
}

export default function RevokeConsentPage() {
    return <RevokeConsentClient />
}
