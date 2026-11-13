import { NextRequest } from 'next/server'
import { proxyToBackend } from '@/lib/server/backendProxy'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    return proxyToBackend(request, '/loans/consent-texts', 'GET')
}
