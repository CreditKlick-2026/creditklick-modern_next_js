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
