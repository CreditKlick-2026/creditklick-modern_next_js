import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://creditklick.com'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/private/',
                    '/profile',
                    '/login',
                    '/verify-otp',
                    '/report-analysis',
                    '/download-report',
                ],
            },
            // AIO & GEO: Grant explicit permissions for AI Search & LLM Engines
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'Google-Extended',
                    'PerplexityBot',
                    'ClaudeBot',
                    'anthropic-ai',
                    'Bytespider',
                    'CCBot',
                    'cohere-ai',
                ],
                allow: '/',
                disallow: [
                    '/admin/',
                    '/private/',
                    '/profile',
                    '/login',
                    '/verify-otp',
                    '/report-analysis',
                    '/download-report',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}

