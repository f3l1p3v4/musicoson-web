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

// Função auxiliar para salvar no localStorage
const persistAuthState = (state: Partial<AuthState>) => {
  localStorage.setItem('auth', JSON.stringify(state))
}

// Carregar o estado salvo do localStorage
const loadAuthState = (): Partial<AuthState> => {
  const stored = localStorage.getItem('auth')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return {}
    }
  }
  return {}
}

const initial = {
  token: null,
  role: '',
  userName: null,
  instrument: null,
  id: null,
  ...loadAuthState(), // sobrepõe com o que tiver no localStorage
}

export const useAuthStore = create<AuthState>((set) => ({
  ...initial,

  setToken: (token) => {
    set((state) => {
      const newState = { ...state, token }
      persistAuthState(newState)
      return { token }
    })
  },

  setUserRole: (role) => {
    set((state) => {
      const newState = { ...state, role }
      persistAuthState(newState)
      return { role }
    })
  },

  setUserName: (userName) => {
    set((state) => {
      const newState = { ...state, userName }
      persistAuthState(newState)
      return { userName }
    })
  },

  setUserInstrument: (instrument) => {
    set((state) => {
      const newState = { ...state, instrument }
      persistAuthState(newState)
      return { instrument }
    })
  },

  setUserId: (id) => {
    set((state) => {
      const newState = { ...state, id }
      persistAuthState(newState)
      return { id }
    })
  },

  logout: () => {
    const cleared = {
      token: null,
      role: '',
      userName: null,
      instrument: null,
      id: null,
    }
    localStorage.removeItem('auth')
    set(cleared)
  },
}))
