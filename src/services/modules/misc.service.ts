import { api } from '../client'

// Upload API (cloudinary uploads via main backend)
export const uploadAPI = {
    uploadImage: (formData: FormData) => api.post('/posts/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    deleteImage: (publicId: string) => api.post('/posts/upload/delete', { publicId })
}

// Subscribers API
export const subscribersAPI = {
    subscribe: (email: string, source = 'website') => api.post('/subscribers/subscribe', { email, source }),
    unsubscribe: (email: string) => api.post('/subscribers/unsubscribe', { email }),
    getAll: (params?: Record<string, unknown>) => api.get('/subscribers', { params }),
    delete: (id: string) => api.delete(`/subscribers/${id}`)
}

// Admin System API
export const adminAPI = {
    clearCache: (data?: Record<string, unknown>) => api.post('/admin/clear-cache', data)
}

// Payment API
export const paymentAPI = {
    initiate: (data: Record<string, unknown>) => api.post('/payments/initiate', { data }),
    verify: (data: Record<string, unknown>) => api.post('/payments/verify', { data }),
}

// Refine Queries API
export const refineAPI = {
    submitQuery: (data: { name: string; email: string; phone?: string; query: string }) =>
        api.post('/refine/queries', data),
    getQueries: (params?: Record<string, unknown>) => api.get('/refine/queries', { params }),
}
