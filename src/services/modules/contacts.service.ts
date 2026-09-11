import { api } from '../client'

export const contactsAPI = {
    // Public - submit contact form
    submit: (data: {
        name: string
        phone: string
        email?: string
        message: string
        subject?: string
        sourcePage?: string
    }) => api.post('/contacts', data),

    // Admin - get all contacts
    getAll: (params?: Record<string, unknown>) => api.get('/contacts', { params }),

    // Admin - get single contact
    getById: (id: string) => api.get(`/contacts/${id}`),

    // Admin - get unread count
    getUnreadCount: () => api.get('/contacts/unread-count'),

    // Admin - update status
    updateStatus: (id: string, data: { status?: string; assignedTo?: string }) =>
        api.patch(`/contacts/${id}/status`, data),

    // Admin - reply to contact
    reply: (id: string, responseText: string) =>
        api.post(`/contacts/${id}/reply`, { responseText }),

    // Admin - delete contact
    delete: (id: string) => api.delete(`/contacts/${id}`),
}
