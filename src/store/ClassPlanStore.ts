import { create } from 'zustand'

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
  createClassPlan: (payload: ClassPlanCreatePayload, token: string) => Promise<boolean>
}

export const useClassPlanStore = create<ClassPlanStore>((set) => ({
  classPlans: [],
  selectedGroup: 'GROUP_01',
  setClassPlans: (classPlans) => set({ classPlans }),
  setSelectedGroup: (group) => set({ selectedGroup: group }),

  fetchClassPlans: async (token) => {
    try {
      const response = await fetch('http://31.97.26.156:3333/class-plan', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Erro ao buscar os planos de aula')
      }

      const data = await response.json()
      set({ classPlans: data })
    } catch (error) {
      console.error(error)
    }
  },

  createClassPlan: async (payload, token) => {
    try {
      const response = await fetch('http://31.97.26.156:3333/class-plan', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Erro ao criar plano de aula')

      return true
    } catch (error) {
      console.error('Erro ao criar aula:', error)
      return false
    }
  },
}))
