// Direct Cloudinary upload from browser (bypasses server timeout)
export const uploadToCloudinary = async (file: File): Promise<{ url: string; publicId: string }> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpqkkdcmh'
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'creditklick_unsigned'

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)
    formData.append('folder', 'Creditklick_office_next_gen/blog')

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
    })

    if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary')
    }

    const data = await response.json()
    return {
        url: data.secure_url,
        publicId: data.public_id
    }
}

/**
 * Inject Cloudinary transformations into an existing Cloudinary URL.
 * - f_auto  → auto format (WebP for Chrome, AVIF for supported browsers)
 * - q_auto  → auto quality (Cloudinary picks best quality/size tradeoff)
 * - w_{width} → resize to requested width
 * - dpr_auto → serve 2x for retina screens automatically
 *
 * Non-Cloudinary URLs (e.g. Unsplash fallback) are returned unchanged.
 */
export const getOptimizedImageUrl = (url: string, width: number = 800): string => {
    if (!url) return url
    // Only transform Cloudinary URLs
    if (!url.includes('res.cloudinary.com')) return url

    // Insert transformation after /upload/
    // e.g. https://res.cloudinary.com/dpqkkdcmh/image/upload/v123/abc.jpg
    //   → https://res.cloudinary.com/dpqkkdcmh/image/upload/f_auto,q_auto,w_800,dpr_auto/v123/abc.jpg
    return url.replace(
        '/upload/',
        `/upload/f_auto,q_auto,w_${width},dpr_auto/`
    )
}

/**
 * Context-aware Cloudinary image URL builder for blog images.
 * @param url    - Raw Cloudinary URL from API
 * @param context - 'thumbnail' | 'featured' | 'related' | 'og'
 */
export const getBlogImageUrl = (url: string, context: 'thumbnail' | 'featured' | 'related' | 'og' = 'thumbnail'): string => {
    const widthMap = {
        thumbnail: 600,   // Blog listing cards
        featured: 1200,   // Full article hero image
        related: 400,     // Related posts grid
        og: 1200,         // OG meta image
    }
    return getOptimizedImageUrl(url, widthMap[context])
}
