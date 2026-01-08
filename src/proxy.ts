import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const DOMAIN = 'https://creditklick.com'

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone()
    const { pathname, search, host } = url

    // Skip static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/assets') ||
        pathname.includes('.') // Static files like .ico, .png, etc.
    ) {
        return NextResponse.next()
    }

    // 1. WWW to Non-WWW Redirect
    if (host.startsWith('www.')) {
        const newHost = host.replace('www.', '')
        return NextResponse.redirect(
            new URL(`https://${newHost}${pathname}${search}`),
            { status: 301 }
        )
    }

    // 2. Remove Trailing Slash (except root)
    if (pathname !== '/' && pathname.endsWith('/')) {
        const newPath = pathname.slice(0, -1)
        return NextResponse.redirect(
            new URL(`${newPath}${search}`, request.url),
            { status: 301 }
        )
    }

    // 3. Lowercase URL enforcement (for consistency)
    const lowerPath = pathname.toLowerCase()
    if (pathname !== lowerPath && pathname !== '/') {
        return NextResponse.redirect(
            new URL(`${lowerPath}${search}`, request.url),
            { status: 301 }
        )
    }

    // Add canonical header for response
    const response = NextResponse.next()

    // Set canonical URL in header for programmatic access
    const canonicalUrl = `${DOMAIN}${pathname}`
    response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`)

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|assets|.*\\..*|api).*)',
    ],
}
