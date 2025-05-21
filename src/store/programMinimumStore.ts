import { create } from 'zustand'

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
  programMinimum: ProgramMinimum[] | null // Alterado para array de ProgramMinimum
  fetchProgramMinimum: (token: string) => Promise<void>
}

export const useProgramMinimumStore = create<ProgramMinimumStore>((set) => ({
  programMinimum: null,

  fetchProgramMinimum: async (token) => {
    try {
      const response = await fetch(`http://localhost:3333/program-minimum`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Erro ao buscar dados do Programa Mínimo')
      }

      const data = await response.json()

      // Ajuste para garantir que os dados recebidos sejam um array
      set({ programMinimum: Array.isArray(data) ? data : [data] })
    } catch (error) {
      console.error(error)
    }
  },
}))
