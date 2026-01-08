import { Metadata } from 'next'
import ProfileClient from './ProfileClient'

export const metadata: Metadata = {
    title: 'My Profile - Manage Your Account | CreditKlick',
    description: 'View and manage your CreditKlick profile, personal information, and access your credit report.',
    robots: {
        index: false,
        follow: false,
    }
}

export default function ProfilePage() {
    return <ProfileClient />
}
