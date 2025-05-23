'use client'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useAuthStore } from '@/store/authStore'
import { useAttendanceStore } from '@/store/callListStore'

import { Confirmation } from './confirmation'

export function CallList() {
  const { students, fetchStudentsAttendance, markAttendance } =
    useAttendanceStore()
  const { token, id } = useAuthStore()
  const [selectedStudent, setSelectedStudent] = useState<{
    id: string
    name: string
    group: string
    instrument: string
    studentAttendance: { id: string; date: string; status: string }[]
  } | null>(null)

  useEffect(() => {
    if (token) {
      fetchStudentsAttendance(token)
    }
  }, [fetchStudentsAttendance, token])

  function handleOpenDialog(student: {
    id: string
    name: string
    group: string
    instrument: string
    studentAttendance: { date: string; status: string }[]
  }) {
    setSelectedStudent({
      ...student,
      studentAttendance: student.studentAttendance.map((attendance, index) => ({
        id: `${student.id}-${index}`,
        ...attendance,
      })),
    })
  }

  return (
    <section className="grid gap-2">
      <h1 className="mb-6 text-center text-3xl font-bold">Lista de Chamada</h1>

      {students && students.length > 0 ? (
        students.map((student) => (
          <Dialog key={student.id}>
            <DialogTrigger asChild>
              <Card
                className="w-full cursor-pointer"
                onClick={() => handleOpenDialog(student)}
              >
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-sm font-medium">
                    {student.group}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-md mt-1 font-bold">{student.name}</p>
                  <p className="mt-2 text-xs">{student.instrument}</p>
                  <section className="flex gap-2">
                    {student.studentAttendance.length > 0 ? (
                      student.studentAttendance.map((attendance) => (
                        <Badge
                          key={attendance.date}
                          variant="default"
                          className={
                            attendance.status === 'PRESENT'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }
                        >
                          {new Date(attendance.date).toLocaleDateString(
                            'pt-BR',
                            {
                              day: '2-digit',
                              month: '2-digit',
                            },
                          )}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        Nenhuma presença registrada
                      </p>
                    )}
                  </section>
                </CardContent>
              </Card>
            </DialogTrigger>

            {selectedStudent && (
              <Confirmation
                student={{
                  id: selectedStudent.id,
                  name: selectedStudent.name,
                  attendanceId: selectedStudent.studentAttendance[0]?.id,
                  currentStatus: selectedStudent.studentAttendance[0]?.status,
                }}
                instructorId={id || ''}
                token={token || ''}
                markAttendance={(data) =>
                  markAttendance({ ...data, token: token || '' })
                }
                onSuccessClose={() => setSelectedStudent(null)}
              />
            )}
          </Dialog>
        ))
      ) : (
        <p className="text-center text-gray-500">Nenhum aluno encontrado.</p>
      )}
    </section>
  )
}
