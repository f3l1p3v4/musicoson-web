import axios from 'axios'

import { useAuthStore } from '@/store/authStore'

// Configuração segura com fallback para desenvolvimento
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
})

// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor de resposta (recomendado adicionar)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Tratamento para token expirado/inválido
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  },
)
