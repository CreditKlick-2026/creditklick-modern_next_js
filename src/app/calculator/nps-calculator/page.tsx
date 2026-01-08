import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'NPS Calculator - Calculate National Pension System Returns | CreditKlick',
    description: 'Plan your retirement with our free NPS calculator. Calculate your pension corpus and monthly pension based on your contributions.',
    keywords: ['NPS calculator', 'national pension system', 'retirement calculator', 'pension planning', 'NPS returns'],
    openGraph: {
        title: 'NPS Calculator - Plan Your Retirement | CreditKlick',
        description: 'Calculate your National Pension System returns and plan for a secure retirement.',
    }
}

export default function NPSCalculatorPage() {
    return (
        <div className="section-padding">
            <div className="container-custom">
                <h1 className="heading-1 text-center mb-8">NPS Calculator</h1>
                <p className="text-center text-gray-600 max-w-2xl mx-auto">
                    Calculate your National Pension System returns.
                </p>
            </div>
        </div>
    )
}
