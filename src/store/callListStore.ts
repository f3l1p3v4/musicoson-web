import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { api } from '@/lib/api'

interface StudentAttendance {
  id: string
  date: string
  status: string
  classNumber: number
}

interface Student {
  id: string
  name: string
  email: string
  phone: string
  instrument: string
  group: string
  practical_level: string | null
  studentAttendance: StudentAttendance[]
}

interface AttendanceStore {
  students: Student[] | null
  currentStudentIndex: number
  setCurrentStudentIndex: (index: number) => void
  setStudents: (students: Student[]) => void
  reset: () => void
  fetchStudentsAttendance: (token: string) => Promise<void>
  markAttendance: (params: {
    date: string
    studentId: string
    instructorId: string
    status: string
    token: string
  }) => Promise<{
    success: boolean
    responseData: { message: string }
    responseStatus: number
  }>
  updateAttendance: (params: {
    attendanceId: string
    status: string
    token: string
  }) => Promise<{
    success: boolean
    responseData: { message: string }
    responseStatus: number
  }>
}

export const useAttendanceStore = create<AttendanceStore>()(
  persist(
    (set) => ({
      students: null,
      currentStudentIndex: 0,

      setCurrentStudentIndex: (index) => set({ currentStudentIndex: index }),
      setStudents: (students) => set({ students }),
      reset: () => set({ students: null, currentStudentIndex: 0 }),

      fetchStudentsAttendance: async (token) => {
        try {
          const response = await api.get('/attendance/students', {
            headers: {
              Authorization: `Bearer ${token}`, // Uso explícito
            },
          })
          set({
            students: Array.isArray(response.data)
              ? response.data
              : [response.data],
          })
        } catch (error) {
          console.error('Erro ao buscar lista de chamada:', error)
          throw new Error('Erro ao buscar lista de chamada')
        }
      },

      markAttendance: async ({
        date,
        studentId,
        instructorId,
        status,
        token,
      }) => {
        try {
          const response = await api.post(
            '/attendance',
            {
              date,
              studentId,
              instructorId,
              status,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          if (response.status === 201) {
            set((state) => {
              if (!state.students) return { students: null }

              const updatedStudents = state.students.map((student) => {
                if (student.id === studentId) {
                  const newAttendance = {
                    id: response.data.attendanceId || '',
                    date,
                    status,
                    classNumber: response.data.classNumber,
                  }

                  return {
                    ...student,
                    studentAttendance: [
                      ...(student.studentAttendance ?? []),
                      newAttendance,
                    ],
                  }
                }
                return student
              })

              return { students: updatedStudents }
            })
          }

          return {
            success: true,
            responseData: response.data,
            responseStatus: response.status,
          }
        } catch (error) {
          console.error('Erro ao marcar presença:', error)
          return {
            success: false,
            responseData: { message: 'Erro ao registrar chamada' },
            responseStatus: 500,
          }
        }
      },

      updateAttendance: async ({ attendanceId, status, token }) => {
        try {
          const response = await api.put(
            `/attendance/${attendanceId}`,
            { status },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          if (response.status === 200) {
            set((state) => {
              if (!state.students) return { students: null }

              const updatedStudents = state.students.map((student) => {
                const attendanceIndex = student.studentAttendance.findIndex(
                  (att) => att.id === attendanceId,
                )

                if (attendanceIndex > -1) {
                  const updatedAttendance = [...student.studentAttendance]
                  updatedAttendance[attendanceIndex] = {
                    ...updatedAttendance[attendanceIndex],
                    status,
                  }

                  return {
                    ...student,
                    studentAttendance: updatedAttendance,
                  }
                }

                return student
              })

              return { students: updatedStudents }
            })
          }

          return {
            success: true,
            responseData: response.data,
            responseStatus: response.status,
          }
        } catch (error) {
          console.error('Erro ao atualizar presença:', error)
          return {
            success: false,
            responseData: { message: 'Erro ao atualizar presença' },
            responseStatus: 500,
          }
        }
      },
    }),
    {
      name: 'attendance-storage',
      partialize: (state) => ({
        currentStudentIndex: state.currentStudentIndex,
      }),
    },
  ),
)
