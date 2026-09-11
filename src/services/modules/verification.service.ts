import { api } from '../client'
import Cookies from 'js-cookie'

export const verificationAPI = {
    // Step 1: Check if user exists and has fresh report
    checkUser: (phone: string) => api.get(`/verification/check/${phone}`),

    // Step 2: Initiate verification (sends OTP via Fonada or Experian)
    init: (data: Record<string, unknown>) => api.post('/verification/init', data),

    // Step 3: Submit OTP and get report
    submit: (data: Record<string, unknown>) => api.post('/verification/submit', data),

    // Get credit report by phone
    getReport: (phone: string) => api.get(`/verification/report/${phone}`),
}

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
