import { create } from 'zustand'

import { api } from '@/lib/api'

interface User {
  id: string
  name: string
  email: string
  group: string
  instrument?: string
  role: string
  phone?: string
}

interface ProfileStoreState {
  user: User | null
  loading: boolean
  error: string | null
  fetchUser: (userId: string, token: string) => Promise<void>
}

export const useProfileStore = create<ProfileStoreState>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async (userId: string, token: string) => {
    set({ loading: true, error: null })

    try {
      const response = await api.get<User>(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      set({
        user: response.data,
        loading: false,
      })
    } catch (error) {
      set({
        error: 'Erro ao carregar perfil',
        loading: false,
      })
      console.error('Erro ao buscar usuário:', error)
      throw error // Opcional: propagar o erro para tratamento externo
    }
  },
}))
