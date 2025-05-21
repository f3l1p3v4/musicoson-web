import { create } from 'zustand'

interface Attendance {
  id: string
  status: 'PRESENT' | 'ABSENT'
  date: string
  studentId: string
  instructorId: string
  classNumber: number | null
}

interface StudentAttendance {
  id: string
  group: string
  date: string
  subject: string
  page: string
  exercise: string
  attendance: Attendance | null
}

interface AttendanceResponse {
  message?: string
  attendance?: Attendance
}

interface StudentHistoryStore {
  studentHistory: StudentAttendance[]
  message: string | null
  isLoading: boolean
  error: string | null

  // Funções para buscar e gerenciar histórico
  fetchStudentHistory: (studentId: string, token: string) => Promise<void>

  // Função para registrar presença
  registerAttendance: (
    data: {
      date: string
      studentId: string
      instructorId: string
      status: 'PRESENT' | 'ABSENT'
    },
    token: string,
  ) => Promise<AttendanceResponse | null>

  // Função para limpar mensagens
  clearMessage: () => void
  clearError: () => void
}

export const useStudentHistoryStore = create<StudentHistoryStore>((set) => ({
  studentHistory: [],
  message: null,
  isLoading: false,
  error: null,

  fetchStudentHistory: async (studentId, token) => {
    try {
      set({ isLoading: true, error: null })

      const response = await fetch(
        `http://localhost:3333/attendance/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || 'Erro ao buscar histórico do aluno',
        )
      }

      const data = await response.json()
      set({ studentHistory: data, isLoading: false })
    } catch (error) {
      console.error(error)
      set({
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        isLoading: false,
      })
    }
  },

  registerAttendance: async (data, token) => {
    try {
      set({ isLoading: true, error: null, message: null })

      const response = await fetch('http://localhost:3333/attendance', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      // Mesmo se for status 200 (já registrado), queremos capturar a mensagem
      if (response.ok) {
        set({
          message: responseData.message || 'Presença registrada com sucesso',
          isLoading: false,
        })
        return responseData
      } else {
        throw new Error(responseData.message || 'Erro ao registrar presença')
      }
    } catch (error) {
      console.error(error)
      set({
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        isLoading: false,
      })
      return null
    }
  },

  clearMessage: () => set({ message: null }),
  clearError: () => set({ error: null }),
}))
