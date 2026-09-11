import { api } from '../client'

export const usersAPI = {
    getAll: (params?: Record<string, unknown>) => api.get('/users', { params }),
    getById: (id: string) => api.get(`/users/${id}`),
    getDetails: (id: string) => api.get(`/users/${id}/details`),
    getStats: () => api.get('/users/stats'),
    exportUsers: (params?: Record<string, unknown>) => api.get('/users/export', { params }),
    create: (data: Record<string, unknown>) => api.post('/users', data),
    update: (id: string, data: Record<string, unknown>) => api.put(`/users/${id}`, data),
    delete: (id: string) => api.delete(`/users/${id}`),
}
