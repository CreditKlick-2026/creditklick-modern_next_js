import { Metadata } from 'next'
import CreditScoreClient from './CreditScoreClient'

// Static generation for performance
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
    title: 'Check Free Credit Score Online | Experian Credit Report - CreditKlick',
    description: 'Get your free credit score and detailed credit report online from Experian. Monitor your credit health, get personalized loan offers, and insights to improve your score at CreditKlick.',
    keywords: ['free credit score check', 'check cibil score free', 'experian credit report india', 'online credit score', 'improve credit score', 'credit monitoring service'],
    openGraph: {
        title: 'Check Your Credit Score Online for Free | CreditKlick',
        description: 'Instant access to your Experian credit report. Join 200K+ users who trust CreditKlick for their financial health monitoring.',
        images: ['/assets/Cibil/scoremeter.png'],
    },
    alternates: {
        canonical: '/credit-score',
    }
}

import { getFAQSchema, getFinancialProductSchema } from '@/lib/seo'

export default function CreditScorePage() {
    const faqSchema = getFAQSchema([
        {
            question: "How can I check my credit score for free on CreditKlick?",
            answer: "You can check your free Experian credit score on CreditKlick by entering your mobile number and basic personal details. It takes less than 2 minutes and has zero impact on your credit score."
        },
        {
            question: "Does checking my credit score on CreditKlick lower my score?",
            answer: "No. Checking your own credit score on CreditKlick is classified as a soft inquiry, which does not affect or lower your credit score."
        }
    ]);

    const productSchema = getFinancialProductSchema({
        name: "Free Experian Credit Score Check",
        description: "Get instant free credit score and detailed credit report analysis from Experian with zero credit impact.",
        provider: "CreditKlick India",
        category: "Credit Card"
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, productSchema]) }}
            />
            <CreditScoreClient />
        </>
    );
}
