import axios from 'axios'
import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
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
      const response = await axios.get<User>(
        `http://31.97.26.156:3333/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      set({ user: response.data, loading: false })
    } catch (error) {
      set({ error: 'Erro ao carregar perfil', loading: false })
      console.error('Erro ao buscar usuário:', error)
    }
  },
}))
