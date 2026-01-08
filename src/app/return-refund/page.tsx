import { Metadata } from 'next'
import ReturnRefundClient from './ReturnRefundClient'

export const metadata: Metadata = {
    title: 'Return and Refund Policy | CreditKlick',
    description: 'Learn about CreditKlick’s return and refund policy for paid services like Credit Refine and credit consultation.',
    keywords: ['refund policy', 'cancellation policy', 'creditklick returns', 'service refund'],
    openGraph: {
        title: 'Return and Refund Policy - CreditKlick',
        description: 'Conditions and procedures for service refunds.',
    }
}

export default function ReturnRefundPage() {
    return <ReturnRefundClient />
}
