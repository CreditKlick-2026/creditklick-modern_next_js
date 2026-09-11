import { api } from '../client'

// CRIF Infosec Audit Compliant Consent Management
export const consentAPI = {
    accept: (data: { phone: string; pan?: string; bureau?: string; otpTransactionId?: string }) =>
        api.post('/consent/accept', data),
    withdraw: (data: { phone?: string; bureau?: string; reason?: string }) =>
        api.post('/consent/withdraw', data),
    getStatus: (params?: { phone?: string; bureau?: string }) =>
        api.get('/consent/status', { params }),
    getTexts: () => api.get('/consent/texts'),
}

export const userAPI = {
    revokeConsent: (data: { phone?: string; email?: string; reason?: string }) =>
        api.post('/consent/withdraw', data),
    logConsent: (data: {
        phone: string
        userId?: string
        bureauName?: string
        consentType?: 'SHORT_CONSENT' | 'LONG_CONSENT'
        otpTransactionId?: string
    }) => api.post('/consent/accept', data),
}
