import { Metadata } from 'next'
import { ContactClient } from './ContactClient'

export const metadata: Metadata = {
    title: 'Contact Us - Connect With CreditKlick',
    description: 'Get in touch with CreditKlick for any credit-related queries. Our team is here to help you improve your credit health and find the best financial offers.',
    keywords: ['contact creditklick', 'credit support india', 'loan assistance', 'credit card help', 'customer support financial'],
    openGraph: {
        title: 'Contact CreditKlick - We are here to help',
        description: 'Need help with your credit score or loans? Reach out to our experts today.',
        images: ['/assets/Images/creditklic_next_gen.png'],
    }
}

export default function ContactPage() {
    return <ContactClient />
}
