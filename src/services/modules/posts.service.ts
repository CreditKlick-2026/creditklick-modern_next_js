import { api } from '../client'

export const postsAPI = {
    getAll: (params?: Record<string, unknown>) => api.get('/posts', { params }),
    getBySlug: (slug: string) => api.get(`/posts/${slug}`),
    getCategories: () => api.get('/posts/categories'),
    getRelated: (slug: string, limit?: number) => api.get(`/posts/${slug}/related`, { params: { limit } }),
    create: (data: FormData) => api.post('/posts', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000 // 2 minutes for large image uploads
    }),
    update: (id: string, data: FormData) => api.put(`/posts/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000 // 2 minutes for large image uploads
    }),
    delete: (id: string) => api.delete(`/posts/${id}`),
}
