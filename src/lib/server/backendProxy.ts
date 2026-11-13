import 'server-only'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Forward a request from a Next.js route handler to the CreditKlick backend
 * (Creditklick_Backend_Web+App), which owns all partner integrations.
 *
 * - BACKEND_API_URL: backend base incl. /api/v1 (e.g. https://api.creditklick.com/api/v1)
 * - INTERNAL_PROXY_SECRET: shared secret so the backend trusts X-Client-IP
 *   (the customer's IP) for rate limiting and consent records.
 */
const BACKEND = (process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '')
const SECRET = process.env.INTERNAL_PROXY_SECRET || ''
const TIMEOUT_MS = 45_000 // partner UAT can take ~30s

const clientIp = (req: NextRequest) =>
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || ''

export async function proxyToBackend(req: NextRequest, path: string, method: 'GET' | 'POST' = req.method as 'GET' | 'POST') {
    if (!BACKEND) {
        console.error('[proxy] BACKEND_API_URL is not set')
        return NextResponse.json({ success: false, error: 'Service temporarily unavailable' }, { status: 503 })
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'User-Agent': req.headers.get('user-agent') || 'creditklick-web',
        'X-Platform': 'web',
    }
    const auth = req.headers.get('authorization')
    if (auth) headers.Authorization = auth
    if (SECRET) {
        headers['X-Internal-Proxy-Secret'] = SECRET
        const ip = clientIp(req)
        if (ip) headers['X-Client-IP'] = ip
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    try {
        const res = await fetch(`${BACKEND}${path}`, {
            method,
            headers,
            body: method === 'GET' ? undefined : await req.text(),
            signal: controller.signal,
            cache: 'no-store',
        })
        const body = await res.text()
        return new NextResponse(body, {
            status: res.status,
            headers: { 'Content-Type': res.headers.get('content-type') || 'application/json', 'Cache-Control': 'no-store' },
        })
    } catch (err) {
        const timedOut = (err as Error).name === 'AbortError'
        console.error('[proxy]', path, timedOut ? 'timeout' : (err as Error).message)
        return NextResponse.json(
            { success: false, error: timedOut ? 'Lenders are taking too long to respond. Please try again.' : 'Service temporarily unavailable' },
            { status: timedOut ? 504 : 502 }
        )
    } finally {
        clearTimeout(timer)
    }
}
