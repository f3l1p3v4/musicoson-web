import { create } from 'zustand'

interface ClassPlan {
  id: string
  group: string
  date: string
  subject: string
  page: string
  exercise: string
}

interface ClassPlanStore {
  classPlans: ClassPlan[]
  selectedGroup: string
  setClassPlans: (classPlans: ClassPlan[]) => void
  setSelectedGroup: (group: string) => void
  fetchClassPlans: (token: string) => Promise<void>
}

export const useClassPlanStore = create<ClassPlanStore>((set) => ({
  classPlans: [],
  selectedGroup: 'GROUP_01', // Default group
  setClassPlans: (classPlans) => set({ classPlans }),
  setSelectedGroup: (group) => set({ selectedGroup: group }),

  fetchClassPlans: async (token) => {
    try {
      const response = await fetch('http://localhost:3333/class-plan', {
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
}))
