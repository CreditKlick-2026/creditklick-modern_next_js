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

import { getFAQSchema, getFinancialProductSchema } from '@/lib/seo'

export default function CreditRefinePage() {
    const faqSchema = getFAQSchema([
        {
            question: "What is CreditKlick Credit Refine service?",
            answer: "Credit Refine is CreditKlick's specialized credit improvement service that analyzes your credit report, identifies errors or negative remarks, and provides a customized action plan to boost your credit score."
        },
        {
            question: "How fast can Credit Refine improve my credit score?",
            answer: "Many clients start seeing credit score improvements within 30 to 90 days as dispute resolutions and credit optimization steps take effect with credit bureaus."
        }
    ]);

    const productSchema = getFinancialProductSchema({
        name: "CreditKlick Credit Refine Program",
        description: "Expert guidance and credit report dispute resolution to improve your credit score.",
        provider: "CreditKlick India",
        category: "Loan"
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, productSchema]) }}
            />
            <CreditRefineClient />
        </>
    );
}
