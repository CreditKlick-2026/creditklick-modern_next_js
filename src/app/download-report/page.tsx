import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Download Credit Report PDF | CreditKlick',
    description: 'Download your detailed credit report as PDF. Get a comprehensive analysis of your credit score and history.',
    robots: {
        index: false,
        follow: false,
    }
}

export default function DownloadReportPage() {
    return (
        <div className="section-padding">
            <div className="container-custom">
                <h1 className="heading-1 text-center mb-8">Download Report</h1>
                <p className="text-center text-gray-600 max-w-2xl mx-auto">
                    Download your credit report as PDF.
                </p>
            </div>
        </div>
    )
}
