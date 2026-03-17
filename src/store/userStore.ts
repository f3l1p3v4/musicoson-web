import { AxiosError } from 'axios'
import { create } from 'zustand'

import { api } from '@/lib/api'

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
      const response = await api.get<User[]>('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const sortedUsers = response.data.sort((a, b) =>
        a.name.localeCompare(b.name),
      )

      set({ users: sortedUsers })
    } catch (error) {
      console.error('Error fetching users:', error)
      // throw removido para evitar Uncaught in Promise (ex: erro 403 para alunos)
    }
  },

  createUser: async (data: CreateUserInput, token: string) => {
    try {
      const response = await api.post('/users/register', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      return response.status === 201
    } catch (error) {
      console.error('Error creating user:', error)
      if (error instanceof AxiosError) {
        console.error('Server response:', error.response?.data)
      }
      return false
    }
  },

  updateUser: async (data: UpdateUserInput, token: string) => {
    try {
      const response = await api.put(`/users/${data.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      return response.status === 200
    } catch (error) {
      console.error('Error updating user:', error)
      if (error instanceof AxiosError) {
        console.error('Server response:', error.response?.data)
      }
      return false
    }
  },
}))
