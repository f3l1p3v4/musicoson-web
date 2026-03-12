import { create } from 'zustand'

import { api } from '@/lib/api' // Importe sua instância do axios configurada

interface ClassPlan {
  id: string
  group: string
  date: string
  subject: string
  page: string
  exercise: string
  method: string
  classNumber: number
  semester: string
  ano: number
}

type ClassPlanCreatePayload = Omit<ClassPlan, 'id'>

interface ClassPlanStore {
  classPlans: ClassPlan[]
  selectedGroup: string
  setClassPlans: (classPlans: ClassPlan[]) => void
  setSelectedGroup: (group: string) => void
  fetchClassPlans: (token: string) => Promise<void>
  createClassPlan: (
    payload: ClassPlanCreatePayload,
    token: string,
  ) => Promise<boolean>
}

export const useClassPlanStore = create<ClassPlanStore>((set) => ({
  classPlans: [],
  selectedGroup: 'GROUP_01',
  setClassPlans: (classPlans) => set({ classPlans }),
  setSelectedGroup: (group) => set({ selectedGroup: group }),

  fetchClassPlans: async (token) => {
    try {
      const response = await api.get('/class-plan', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      set({ classPlans: response.data })
    } catch (error) {
      console.error('Erro ao buscar os planos de aula:', error)
      throw new Error('Erro ao buscar os planos de aula')
    }
  },

  createClassPlan: async (payload, token) => {
    try {
      const response = await api.post('/class-plan', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      return response.status === 201
    } catch (error) {
      console.error('Erro ao criar plano de aula:', error)
      return false
    }
  },
}))
