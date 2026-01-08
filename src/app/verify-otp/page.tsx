import { Metadata } from 'next'
import VerifyOTPClient from '@/app/verify-otp/VerifyOTPClient'

export const metadata: Metadata = {
    title: 'Verify OTP - Complete Your Registration | CreditKlick',
    description: 'Verify your OTP to complete registration and access your credit score.',
    robots: {
        index: false,
        follow: false,
    }
}

export const dynamic = 'force-dynamic'

export default function VerifyOTPPage() {
    return <VerifyOTPClient />
}
