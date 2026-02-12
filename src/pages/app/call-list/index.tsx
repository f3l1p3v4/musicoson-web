'use client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useAuthStore } from '@/store/authStore'
import { useAttendanceStore } from '@/store/callListStore'

import { Confirmation } from './confirmation'
import { ExportDialog } from './export-dialog'

export function CallList() {
  const {
    students,
    fetchStudentsAttendance,
    markAttendance,
    updateAttendance: updateAttendanceStore,
    currentStudentIndex,
    setCurrentStudentIndex,
  } = useAttendanceStore()
  const { token, id } = useAuthStore()
  const navigate = useNavigate()
  const [selectedStudent, setSelectedStudent] = useState<{
    id: string
    name: string
    group: string
    instrument: string
    studentAttendance: { id: string; date: string; status: string }[]
  } | null>(null)

  const [isCallFinished, setIsCallFinished] = useState(false)

  useEffect(() => {
    if (token) {
      fetchStudentsAttendance(token)
    }
  }, [fetchStudentsAttendance, token])

  useEffect(() => {
    if (students && students.length > 0) {
      const today = new Date().toISOString().split('T')[0]

      const allStudentsMarkedToday = students.every((student) => {
        const lastAttendance = student.studentAttendance.at(-1)
        if (!lastAttendance?.date) return false
        const attendanceDate = new Date(lastAttendance.date).toISOString().split('T')[0]
        return attendanceDate === today
      })

      if (allStudentsMarkedToday) {
        setIsCallFinished(true)
        setCurrentStudentIndex(students.length)
      } else {
        setIsCallFinished(false)
        const nextStudentIndex = students.findIndex((student) => {
          const lastAttendance = student.studentAttendance.at(-1)
          if (!lastAttendance?.date) return true
          const attendanceDate = new Date(lastAttendance.date).toISOString().split('T')[0]
          return attendanceDate !== today
        })
        setCurrentStudentIndex(nextStudentIndex >= 0 ? nextStudentIndex : 0)
      }
    }
  }, [students, setCurrentStudentIndex])

  useEffect(() => {
    if (students && currentStudentIndex >= students.length && !isCallFinished) {
      setIsCallFinished(true)
      toast.success('Chamada do dia finalizada!')
    }
  }, [currentStudentIndex, students, isCallFinished])

  function isTodaysCallFinished(): boolean {
    if (!students || students.length === 0) return false
    const today = new Date().toISOString().split('T')[0]
    return students.every((student) => {
      const lastAttendance = student.studentAttendance.at(-1)
      if (!lastAttendance?.date) return false
      return new Date(lastAttendance.date).toISOString().split('T')[0] === today
    })
  }

  function handleOpenDialog(
    student: {
      id: string
      name: string
      group: string
      instrument: string
      studentAttendance: { id: string; date: string; status: string }[]
    },
    index: number,
  ) {
    const today = new Date().toISOString().split('T')[0]
    const lastAttendance = student.studentAttendance.at(-1)
    const isMarkedToday = lastAttendance?.date
      ? new Date(lastAttendance.date).toISOString().split('T')[0] === today
      : false

    // Se já foi marcado hoje, permite abrir para edição livremente
    if (isMarkedToday) {
      setSelectedStudent({ ...student })
      return
    }

    // Regra de ordem para novos registros
    if (index !== currentStudentIndex) {
      if (index < currentStudentIndex) {
        toast.warning('Este aluno já teve sua presença registrada hoje.')
      } else {
        toast.error('Você precisa marcar presença dos alunos na ordem da lista.')
      }
      return
    }

    setSelectedStudent({ ...student })
  }

  function getCardStatus(student: any, index: number) {
    const today = new Date().toISOString().split('T')[0]
    const lastAttendance = student.studentAttendance.at(-1)

    if (lastAttendance?.date) {
      if (new Date(lastAttendance.date).toISOString().split('T')[0] === today) {
        return 'completed'
      }
    }

    if (index === currentStudentIndex && !isTodaysCallFinished()) {
      return 'current'
    }

    if (index < currentStudentIndex) {
      return 'completed'
    }

    return 'pending'
  }

  const groupMap: Record<string, string> = {
    GROUP_01: '01',
    GROUP_02: '02',
    GROUP_03: '03',
    GROUP_04: '04',
  }

  return (
    <section className="grid">
      <button onClick={() => navigate(-1)} className="hover:pointer mb-2 w-max rounded py-2 text-[14px]">
        ← Voltar
      </button>

      <h1 className="mb-6 text-center text-xl font-bold xs:text-3xl">Lista de Chamada</h1>

      <div className="mb-4 text-center">
        {isTodaysCallFinished() ? (
          <div className="rounded-lg bg-green-100 p-3">
            <p className="font-medium text-green-800">Chamada do dia finalizada!</p>
          </div>
        ) : (
          <div className="rounded-lg bg-blue-100 p-3">
            <p className="text-blue-800">
              Próximo aluno: {students?.[currentStudentIndex]?.name || 'Nenhum'}
            </p>
          </div>
        )}
      </div>

      {students?.map((student, index) => {
        const cardStatus = getCardStatus(student, index)
        const today = new Date().toISOString().split('T')[0]
        const todaysAttendance = student.studentAttendance.find(
          (att: any) => new Date(att.date).toISOString().split('T')[0] === today
        )

        return (
          <Dialog key={student.id}>
            <DialogTrigger asChild>
              <Card
                className={`mb-2 w-full cursor-pointer transition-all ${
                  cardStatus === 'current' ? 'border-blue-300 ring-2 ring-blue-500' : 
                  cardStatus === 'completed' ? 'bg-gray-50 opacity-75' : 'hover:shadow-md'
                }`}
                onClick={() => handleOpenDialog(student, index)}
              >
                <CardHeader className="flex-row items-center justify-between space-y-0 xs:pb-0">
                  <CardTitle className="text-sm font-medium">
                    {groupMap[student.group] ? `Grupo ${groupMap[student.group]}` : ''}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {cardStatus === 'current' && <span className="rounded bg-blue-500 px-2 py-0 text-xs text-white">Atual</span>}
                    {cardStatus === 'completed' && <span className="rounded bg-green-500 px-1 py-0 text-xs text-white">✓</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-1 xs:pt-2">
                  <p className="text-md mt-1 font-bold">{student.name}</p>
                  <p className="mt-2 text-xs">{student.instrument}</p>
                  <section className="flex gap-2 pt-2">
                    {student.studentAttendance.length > 0 ? (
                      [...student.studentAttendance].slice(-5).map((attendance) => (
                        <Badge
                          key={attendance.date}
                          variant="default"
                          className={`text-xs ${attendance.status === 'PRESENT' ? 'bg-green-500' : 'bg-red-500'}`}
                        >
                          {new Date(attendance.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' })}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">Nenhuma presença registrada</p>
                    )}
                  </section>
                </CardContent>
              </Card>
            </DialogTrigger>

            {selectedStudent && selectedStudent.id === student.id && (
              <Confirmation
                student={{
                  id: selectedStudent.id,
                  name: selectedStudent.name,
                  attendanceId: todaysAttendance?.id,
                  currentStatus: todaysAttendance?.status,
                }}
                instructorId={id || ''}
                token={token || ''}
                markAttendance={async (data) => {
                  const result = await markAttendance({ ...data, token: token || '' })
                  if (result.success) {
                    setCurrentStudentIndex(currentStudentIndex + 1)
                    setSelectedStudent(null)
                  }
                  return result
                }}
                updateAttendance={async (data) => {
                  const result = await updateAttendanceStore({ ...data, token: token || '' })
                  if (result.success) {
                    setSelectedStudent(null)
                  }
                  return result
                }}
                onSuccessClose={() => setSelectedStudent(null)}
              />
            )}
          </Dialog>
        )
      })}
      <ExportDialog token={token || ''} />
    </section>
  )
}
