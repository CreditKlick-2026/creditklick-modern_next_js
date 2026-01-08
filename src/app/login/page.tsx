import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login to CreditKlick - Access Your Account',
    description: 'Login to your CreditKlick account to check your credit score, manage credit cards, and access personalized financial insights.',
    robots: {
        index: false,
        follow: false,
    }
}

export default function LoginPage() {
    return (
        <div className="section-padding">
            <div className="container-custom">
                <h1 className="heading-1 text-center mb-8">Login</h1>
                <p className="text-center text-gray-600 max-w-2xl mx-auto">
                    Login to your CreditKlick account.
                </p>
            </div>
        </div>
    )
}
