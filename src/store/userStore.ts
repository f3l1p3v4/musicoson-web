import { create } from 'zustand'

interface User {
  id: string
  name: string
  instrument?: string
  group?: string
  role: string
  email: string
  phone?: string
}

interface UserStore {
  users: User[]
  fetchUsers: (token: string) => Promise<void>
}

export const userStore = create<UserStore>((set) => ({
  users: [],
  fetchUsers: async (token) => {
    try {
      const response = await fetch('http://localhost:3333/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Erro ao buscar usuários')
      }

      const data = await response.json()
      set({ users: data })
    } catch (error) {
      console.error(error)
    }
  },
}))
