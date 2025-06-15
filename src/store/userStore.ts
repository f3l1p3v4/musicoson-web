import { create } from 'zustand'

interface User {
  id: string
  name: string
  instrument?: string
  group?: string
  role: string
  email: string
  phone?: string
  practical_level?: string
}

interface CreateUserInput {
  name: string
  instrument: string
  group: string
  role: string
  email: string
  phone: string
  password: string
  practical_level: string
}

interface UpdateUserInput {
  id: string
  name: string
  instrument?: string
  group?: string
  role: string
  phone?: string
  practical_level?: string
}

interface UserStore {
  users: User[]
  fetchUsers: (token: string) => Promise<void>
  createUser: (data: CreateUserInput, token: string) => Promise<boolean>
  updateUser: (data: UpdateUserInput, token: string) => Promise<boolean>
}

export const userStore = create<UserStore>((set) => ({
  users: [],

  fetchUsers: async (token: string) => {
    try {
      const response = await fetch('http://31.97.26.156:3333/users', {
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

  createUser: async (data: CreateUserInput, token: string) => {
    try {
      const response = await fetch('http://31.97.26.156:3333/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      return response.ok
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
      return false
    }
  },

  updateUser: async (data: UpdateUserInput, token: string) => {
    try {
      const response = await fetch(`http://31.97.26.156:3333/users/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      return response.ok
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      return false
    }
  }
}))
