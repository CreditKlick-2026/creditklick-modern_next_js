import { Metadata } from 'next'
import CreditRefineClient from './CreditRefineClient'

export const metadata: Metadata = {
    title: 'Credit Refine - Boost Your Credit Score | CreditKlick',
    description: 'Improve your credit score with expert guidance. CreditKlick Credit Refine service helps you identify and resolve discrepancies in your credit report.',
    keywords: ['credit repair', 'improve credit score', 'credit score booster', 'credit report analysis', 'credit klick refine'],
    openGraph: {
        title: 'Credit Refine - Boost Your Credit Score',
        description: 'Improve your credit score with expert guidance from CreditKlick.',
        images: ['/assets/expertise.gif'],
    }
}

export default function CreditRefinePage() {
    return <CreditRefineClient />
}
