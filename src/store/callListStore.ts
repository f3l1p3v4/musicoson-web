import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import * as XLSX from 'xlsx'

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
  exportAttendance: (params: {
    year: string;
    period: string;
    token: string 
  }) => Promise<void>
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
              Authorization: `Bearer ${token}`,
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

      exportAttendance: async ({ year, period, token }) => {
        try {
          const startMonth = period === '1' ? 0 : 6;
          const endMonth = period === '1' ? 5 : 11;
          const endDay = period === '1' ? 30 : 31;

          const startDate = new Date(parseInt(year), startMonth, 1);
          const endDate = new Date(parseInt(year), endMonth, endDay, 23, 59, 59);

          const response = await api.get('/attendance/students', {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
            },
          });

          const studentsData: Student[] = response.data;

          const allDates = new Set<string>();
          studentsData.forEach(student => {
            student.studentAttendance?.forEach(att => {
              const dateFormatted = new Date(att.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                timeZone: 'UTC'
              });
              allDates.add(dateFormatted);
            });
          });

          const sortedDates = Array.from(allDates).sort((a, b) => {
            const [dayA, monthA] = a.split('/').map(Number);
            const [dayB, monthB] = b.split('/').map(Number);
            return monthA - monthB || dayA - dayB;
          });

          const formattedData = studentsData.map((student) => {
            const row: any = {
              'Nome do Aluno': student.name,
              'Instrumento': student.instrument,
              'Grupo': student.group,
            };

            sortedDates.forEach(dateStr => {
              const attendance = student.studentAttendance?.find(att => {
                const attDate = new Date(att.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  timeZone: 'UTC'
                });
                return attDate === dateStr;
              });

              row[dateStr] = attendance 
                ? (attendance.status === 'PRESENT' ? 'P' : 'F') 
                : '-';
            });

            row['Total P'] = student.studentAttendance?.filter(a => a.status === 'PRESENT').length || 0;
            row['Total F'] = student.studentAttendance?.filter(a => a.status === 'ABSENT').length || 0;

            return row;
          });

          const worksheet = XLSX.utils.json_to_sheet(formattedData);

          // AJUSTE DE LARGURA: Define larguras específicas para as colunas
          const wscols = [
            { wch: 35 }, // Nome do Aluno
            { wch: 20 }, // Instrumento
            { wch: 15 }, // Grupo
            ...sortedDates.map(() => ({ wch: 8 })), // Colunas de Datas (P/F)
            { wch: 10 }, // Total P
            { wch: 10 }, // Total F
          ];
          worksheet['!cols'] = wscols;

          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Chamada');

          XLSX.writeFile(workbook, `chamada_periodo_${period}_${year}.xlsx`);

        } catch (error) {
          console.error('Erro ao exportar Excel:', error);
          throw error;
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