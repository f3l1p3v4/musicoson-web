import { AxiosError } from 'axios'
import { create } from 'zustand'

import { api } from '@/lib/api'

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

interface ApiErrorResponse {
  message?: string
  error?: string
  statusCode?: number
}

interface StudentHistoryStore {
  studentHistory: StudentAttendance[]
  message: string | null
  isLoading: boolean
  error: string | null

  fetchStudentHistory: (studentId: string, token: string) => Promise<void>
  registerAttendance: (
    data: {
      date: string
      studentId: string
      instructorId: string
      status: 'PRESENT' | 'ABSENT'
    },
    token: string,
  ) => Promise<AttendanceResponse | null>
  clearMessage: () => void
  clearError: () => void
}

export const useStudentHistoryStore = create<StudentHistoryStore>((set) => ({
  studentHistory: [],
  message: null,
  isLoading: false,
  error: null,

  fetchStudentHistory: async (studentId, token) => {
    set({ isLoading: true, error: null })

    try {
      const response = await api.get<StudentAttendance[]>(
        `/attendance/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      set({ studentHistory: response.data, isLoading: false })
    } catch (error) {
      let errorMessage = 'Erro ao buscar histórico do aluno'

      if (error instanceof AxiosError) {
        const serverError = error.response?.data as ApiErrorResponse
        errorMessage = serverError?.message || error.message || errorMessage
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      set({
        error: errorMessage,
        isLoading: false,
      })
      console.error('fetchStudentHistory error:', error)
    }
  },

  registerAttendance: async (data, token) => {
    set({ isLoading: true, error: null, message: null })

    try {
      const response = await api.post<AttendanceResponse>('/attendance', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      set({
        message: response.data.message || 'Presença registrada com sucesso',
        isLoading: false,
      })

      return response.data
    } catch (error) {
      let errorMessage = 'Erro ao registrar presença'

      if (error instanceof AxiosError) {
        const serverError = error.response?.data as ApiErrorResponse
        errorMessage = serverError?.message || error.message || errorMessage
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      set({
        error: errorMessage,
        isLoading: false,
      })
      console.error('registerAttendance error:', error)
      return null
    }
  },

  clearMessage: () => set({ message: null }),
  clearError: () => set({ error: null }),
}))
