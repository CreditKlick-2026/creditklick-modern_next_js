import { NextRequest } from 'next/server'
import { proxyToBackend } from '@/lib/server/backendProxy'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Logs the chosen offer and returns the lender's apply link (backend)
export async function POST(request: NextRequest) {
    return proxyToBackend(request, '/loans/apply', 'POST')
}
