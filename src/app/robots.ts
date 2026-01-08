import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://creditklick.com'

    return {
        rules: {
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
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
