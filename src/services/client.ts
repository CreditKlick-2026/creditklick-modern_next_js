import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

const isClient = typeof window !== 'undefined'
export const API_BASE_URL = isClient
    ? '/api/v1'
    : (process.env.NEXT_PUBLIC_API_URL || 'https://betaversion-creditklickapp.onrender.com/api/v1')

// Create axios instance for main CreditKlick backend
export const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor - add auth token for main api
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
        if (error.response?.status === 401 && !originalRequest?._retry) {
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
                } catch {
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
            const retryDelay = error.response.data.retryAfter * 1000 // Convert to ms
            console.log(`Backend 503: Retrying request in ${retryDelay}ms...`)

            await new Promise((resolve) => setTimeout(resolve, retryDelay))
            return api(originalRequest)
        }

        return Promise.reject(error)
    }
)

export default api
