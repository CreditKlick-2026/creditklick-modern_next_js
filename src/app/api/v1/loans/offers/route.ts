import { NextRequest } from 'next/server'
import { proxyToBackend } from '@/lib/server/backendProxy'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Personal-loan offers — handled by the CreditKlick backend (Great.Cards partner integration)
export async function POST(request: NextRequest) {
    return proxyToBackend(request, '/loans/offers', 'POST')
}
