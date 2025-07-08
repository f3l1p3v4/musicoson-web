import { create } from 'zustand'

import { api } from '@/lib/api' // Import your configured axios instance

interface Meeting {
  name: string
}

interface ProgramMinimum {
  instrument: string
  meetings: Meeting[]
  cults: Meeting[]
  officialization: Meeting[]
}

interface ProgramMinimumStore {
  programMinimum: ProgramMinimum[] | null
  fetchProgramMinimum: (token: string) => Promise<void>
}

export const useProgramMinimumStore = create<ProgramMinimumStore>((set) => ({
  programMinimum: null,

  fetchProgramMinimum: async (token) => {
    try {
      const response = await api.get('/program-minimum', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      // Ensure the data is an array
      set({
        programMinimum: Array.isArray(response.data)
          ? response.data
          : [response.data],
      })
    } catch (error) {
      console.error('Error fetching Program Minimum:', error)
      throw new Error('Failed to fetch Program Minimum data')
    }
  },
}))
