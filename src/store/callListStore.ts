import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StudentAttendance {
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
          const response = await fetch(
            'http://31.97.26.156:3333/attendance/students',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          )

          if (!response.ok) {
            throw new Error('Erro ao buscar lista de chamada')
          }

          const data = await response.json()
          set({ students: Array.isArray(data) ? data : [data] })
        } catch (error) {
          console.error(error)
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
          const response = await fetch('http://31.97.26.156:3333/attendance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ date, studentId, instructorId, status }),
          })

          if (!response.ok) throw new Error('Erro ao marcar presença')

          const responseData = await response.json()
          const responseStatus = response.status

          if (responseStatus === 201) {
            set((state) => {
              if (!state.students) return { students: null }

              const updatedStudents = state.students.map((student) => {
                if (student.id === studentId) {
                  const newAttendance = {
                    date,
                    status,
                    classNumber: responseData.classNumber,
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

          return { success: true, responseData, responseStatus }
        } catch (error) {
          return {
            success: false,
            responseData: { message: 'Erro ao registrar chamada' },
            responseStatus: 500,
          }
        }
      },

      updateAttendance: async ({ attendanceId, status, token }) => {
        try {
          const response = await fetch(
            `http://31.97.26.156:3333/attendance/${attendanceId}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ status }),
            }
          )

          if (!response.ok) throw new Error('Erro ao atualizar presença')

          const responseData = await response.json()

          return {
            success: true,
            responseData,
            responseStatus: response.status,
          }
        } catch (error) {
          console.error('Erro ao atualizar chamada:', error)
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
    }
  )
)
