import { Metadata } from 'next'
import ReportAnalysisClient from '@/app/report-analysis/ReportAnalysisClient'

export const metadata: Metadata = {
    title: 'Credit Report Analysis | CreditKlick',
    description: 'Detailed analysis of your credit report, including payment history, credit utilization, account details and comprehensive financial insights.',
    robots: {
        index: false,
        follow: false,
    }
}

export default function ReportAnalysisPage() {
    return <ReportAnalysisClient />
}
