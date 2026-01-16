import axios from 'axios'
import Cookies from 'js-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://creditklick-2026-backend-next-gen.onrender.com/api/v1'

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor - add auth token
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken') || Cookies.get('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor - handle errors and token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // Handle 401 - try refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const refreshToken = Cookies.get('refreshToken')

            if (refreshToken) {
                try {
                    const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
                        refreshToken
                    })

                    Cookies.set('accessToken', data.data.accessToken, { expires: 7 })
                    originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`

                    return api(originalRequest)
                } catch (refreshError) {
                    // Refresh failed - logout
                    Cookies.remove('accessToken')
                    Cookies.remove('refreshToken')
                    Cookies.remove('user')
                    Cookies.remove('token')
                    Cookies.remove('cibil')
                    if (typeof window !== 'undefined') {
                        window.location.href = '/credit-score'
                    }
                }
            }
        }

        // Handle 503 - Service Unavailable (Backend Starting)
        if (error.response?.status === 503 && error.response?.data?.retryAfter) {
            const retryDelay = error.response.data.retryAfter * 1000; // Convert to ms
            console.log(`Backend 503: Retrying request in ${retryDelay}ms...`)

            await new Promise(resolve => setTimeout(resolve, retryDelay));
            return api(originalRequest);
        }

        return Promise.reject(error)
    }
)

// Auth API
export const authAPI = {
    sendOTP: (phone: string) => api.post('/auth/send-otp', { phone }),
    verifyOTP: (phone: string, otp: string, name?: string) => api.post('/auth/verify-otp', { phone, otp, name }),
    adminLogin: (email: string, password: string) => api.post('/auth/admin/login', { email, password }),
    refreshToken: (refreshToken: string) => api.post('/auth/refresh-token', { refreshToken }),
    logout: (refreshToken: string) => api.post('/auth/logout', { refreshToken }),
    getMe: () => api.get('/auth/me'),
}

// Verification API (Credit Score flow)
export const verificationAPI = {
    // Step 1: Check if user exists and has fresh report
    checkUser: (phone: string) => api.get(`/verification/check/${phone}`),

    // Step 2: Initiate verification (sends OTP via Fonada or Experian)
    init: (data: any) => api.post('/verification/init', data),

    // Step 3: Submit OTP and get report
    submit: (data: any) => api.post('/verification/submit', data),

    // Get credit report by phone
    getReport: (phone: string) => api.get(`/verification/report/${phone}`),
}

// Credit Report API
export const creditReportAPI = {
    getByPhone: (phone: string) => api.get(`/verification/report/${phone}`),
    getLatest: () => {
        const userStr = Cookies.get('user')
        const user = userStr ? JSON.parse(userStr) : {}
        if (user.phone) {
            return api.get(`/verification/report/${user.phone}`)
        }
        return Promise.reject(new Error('No user logged in'))
    },
}

// Posts API
export const postsAPI = {
    getAll: (params?: Record<string, unknown>) => api.get('/posts', { params }),
    getBySlug: (slug: string) => api.get(`/posts/${slug}`),
    getCategories: () => api.get('/posts/categories'),
    getRelated: (slug: string, limit?: number) => api.get(`/posts/${slug}/related`, { params: { limit } }),
    create: (data: FormData) => api.post('/posts', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id: string, data: FormData) => api.put(`/posts/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id: string) => api.delete(`/posts/${id}`),
}

// Leads API
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

// Users API
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

// Upload API
export const uploadAPI = {
    uploadImage: (formData: FormData) => api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    deleteImage: (publicId: string) => api.post('/upload/delete', { publicId })
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
    initiate: (data: any) => api.post('/payments/initiate', { data }),
    verify: (data: any) => api.post('/payments/verify', { data }),
}

// Refine Queries API
export const refineAPI = {
    submitQuery: (data: { name: string; email: string; phone?: string; query: string }) =>
        api.post('/refine/queries', data),
    getQueries: (params?: Record<string, unknown>) => api.get('/refine/queries', { params }),
}

// Contacts API
export const contactsAPI = {
    // Public - submit contact form
    submit: (data: { name: string; phone: string; email?: string; message: string; subject?: string; sourcePage?: string }) =>
        api.post('/contacts', data),

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
    delete: (id: string) => api.delete(`/contacts/${id}`)
}

export default api
