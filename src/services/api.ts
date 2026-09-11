import { api } from './client'

// Re-export base client and types
export { api, API_BASE_URL } from './client'

// Re-export all modular domain services
export * from './modules'

// Default export for backward compatibility
export default api
