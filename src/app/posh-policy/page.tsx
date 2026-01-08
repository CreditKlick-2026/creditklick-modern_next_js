import { Metadata } from 'next'
import PoshPolicyClient from './PoshPolicyClient'

export const metadata: Metadata = {
    title: 'POSH Policy | CreditKlick',
    description: 'Learn about CreditKlick’s commitment to providing a safe and respectful work environment through our Prevention of Sexual Harassment (POSH) policy.',
    keywords: ['posh policy', 'workplace safety', 'icc committee', 'sexual harassment prevention'],
    openGraph: {
        title: 'POSH Policy - Prevention of Sexual Harassment | CreditKlick',
        description: 'Our commitment to a safe and inclusive workplace.',
    }
}

export default function PoshPolicyPage() {
    return <PoshPolicyClient />
}
