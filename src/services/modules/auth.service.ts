import { api } from '../client'

export const authAPI = {
    sendOTP: (phone: string) => api.post('/auth/send-otp', { phone }),
    verifyOTP: (phone: string, otp: string, name?: string) => api.post('/auth/verify-otp', { phone, otp, name }),
    adminLogin: (email: string, password: string) => api.post('/auth/admin/login', { email, password }, { timeout: 60000 }),
    refreshToken: (refreshToken: string) => api.post('/auth/refresh-token', { refreshToken }),
    logout: (refreshToken: string) => api.post('/auth/logout', { refreshToken }),
    getMe: () => api.get('/auth/me'),
}
