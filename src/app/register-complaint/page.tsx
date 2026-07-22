import { Metadata } from 'next'
import RegisterComplaintClient from './RegisterComplaintClient'

export const metadata: Metadata = {
    title: 'Register a Complaint | Customer Grievance Portal | CreditKlick',
    description: 'Submit your complaint or grievance directly to CreditKlick. 24-48 Hour resolution guarantee under RBI & DPDP regulatory guidelines.',
    keywords: ['creditklick complaint', 'register complaint', 'grievance redressal', 'creditklick support ticket', 'credit score complaint'],
    openGraph: {
        title: 'Register a Complaint | CreditKlick Grievance Portal',
        description: 'Formal customer complaint registration portal. Track and resolve your queries with CreditKlick.',
        type: 'website',
        url: 'https://www.creditklick.com/register-complaint',
    },
}

export default function RegisterComplaintPage() {
    return <RegisterComplaintClient />
}
