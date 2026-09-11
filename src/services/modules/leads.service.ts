import { api } from '../client'

export const leadsAPI = {
    create: (data: Record<string, unknown>) => api.post('/leads', data),
    getAll: (params?: Record<string, unknown>) => api.get('/leads', { params }),
    getById: (id: string) => api.get(`/leads/${id}`),
    getStats: (params?: Record<string, unknown>) => api.get('/leads/stats', { params }),
    update: (id: string, data: Record<string, unknown>) => api.put(`/leads/${id}`, data),
    addNote: (id: string, text: string) => api.post(`/leads/${id}/notes`, { text }),
    assign: (id: string, userId: string) => api.post(`/leads/${id}/assign`, { userId }),
    delete: (id: string) => api.delete(`/leads/${id}`),
}
