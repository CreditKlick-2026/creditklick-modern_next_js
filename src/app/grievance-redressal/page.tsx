import { Metadata } from 'next'
import GrievanceRedressalClient from './GrievanceRedressalClient'

export const metadata: Metadata = {
    title: 'Grievance Redressal Policy & Nodal Officer | CreditKlick',
    description: 'Official Grievance Redressal mechanism, 3-tier escalation matrix, and Nodal Officer contact details for CreditKlick in compliance with RBI & DPDP Act guidelines.',
    keywords: ['grievance redressal policy', 'creditklick nodal officer', 'rbi ombudsman escalation', 'creditklick complaint escalation', 'dpdp grievance officer'],
    openGraph: {
        title: 'Grievance Redressal Mechanism | CreditKlick',
        description: '3-Tier Customer Grievance Redressal & Escalation Framework for CreditKlick users.',
        type: 'website',
        url: 'https://www.creditklick.com/grievance-redressal',
    },
}

export default function GrievanceRedressalPage() {
    return <GrievanceRedressalClient />
}
