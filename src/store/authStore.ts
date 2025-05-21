import { create } from 'zustand'

interface AuthState {
  token: string | null
  role: string
  userName: string | null
  instrument: string | null
  id: string | null
  setToken: (token: string) => void
  setUserRole: (role: string) => void
  setUserName: (name: string) => void
  setUserInstrument: (instrument: string) => void
  setUserId: (id: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: '',
  role: '',
  userName: '',
  instrument: '',
  id: '',

  setToken: (token) => {
    set({ token })
  },

  setUserRole: (role) => {
    set({ role })
  },

  setUserName: (name) => {
    set({ userName: name })
  },

  setUserInstrument: (instrument) => {
    set({ instrument })
  },

  setUserId: (id) => {
    set({ id })
  },

  logout: () => {
    set({ token: null, role: '', userName: null })
  },
}))
