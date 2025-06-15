import axios from 'axios'

import { useAuthStore } from '@/store/authStore'

export const api = axios.create({
  baseURL: 'http://31.97.26.156:3333',
})

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
