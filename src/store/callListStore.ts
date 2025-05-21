import { create } from 'zustand'

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

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  students: null,

  fetchStudentsAttendance: async (token) => {
    try {
      const response = await fetch(
        'http://localhost:3333/attendance/students',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
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

  markAttendance: async ({ date, studentId, instructorId, status, token }) => {
    try {
      const response = await fetch('http://localhost:3333/attendance', {
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

      return { success: true, responseData, responseStatus }
    } catch (error) {
      console.error('Erro ao registrar chamada:', error)
      return {
        success: false,
        responseData: { message: 'Erro ao registrar chamada' },
        responseStatus: 500,
      }
    }
  },

  updateAttendance: async ({
    attendanceId,
    status,
    token,
  }: {
    attendanceId: string
    status: string
    token: string
  }): Promise<{
    success: boolean
    responseData: { message: string }
    responseStatus: number
  }> => {
    try {
      const response = await fetch(
        `http://localhost:3333/attendance/${attendanceId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        },
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
}))
