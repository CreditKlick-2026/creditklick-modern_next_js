import { NextRequest } from 'next/server'
import { proxyToBackend } from '@/lib/server/backendProxy'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Consent withdrawal → CreditKlick backend (purges the user's credit information)
export async function POST(request: NextRequest) {
    return proxyToBackend(request, '/consent/withdraw', 'POST')
}
