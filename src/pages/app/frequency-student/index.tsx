'use client'

import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useAttendanceStore } from '@/store/callListStore'

export function FrequencyStudent() {
  const { students, fetchStudentsAttendance } = useAttendanceStore()
  const { token } = useAuthStore()

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      fetchStudentsAttendance(token)
    }
  }, [fetchStudentsAttendance, token])

  const groupMap: Record<string, string> = {
    GROUP_01: '01',
    GROUP_02: '02',
    GROUP_03: '03',
    GROUP_04: '04',
  }

  return (
    <section className="grid gap-2">
      <button
        onClick={() => navigate(-1)}
        className="hover:pointer mb-2 w-max rounded py-2 text-[14px]"
      >
        ← Voltar
      </button>
      <h1 className="mb-6 text-center text-xl font-bold xs:text-3xl">
        Frequência por Aluno
      </h1>

      {students && students.length > 0 ? (
        students.map((student) => {
          const totalFaltas = student.studentAttendance.filter(
            (attendance) => attendance.status === 'ABSENT',
          ).length

          return (
            <NavLink
              className="flex w-full"
              to={`/frequency/${student.id}`}
              key={student.id}
            >
              <Card className="w-full cursor-pointer">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-sm font-medium">
                    {student.group in groupMap
                      ? `Grupo ${groupMap[student.group]}`
                      : 'Grupo Desconhecido'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-md mt-1 font-bold">{student.name}</p>
                  <p className="mt-2 text-xs">{student.instrument}</p>
                  <p
                    className={`mt-2 text-xs ${
                      totalFaltas > 3 ? 'font-bold text-red-500' : ''
                    }`}
                  >
                    {totalFaltas} {totalFaltas === 1 ? 'Falta' : 'Faltas'}
                  </p>
                </CardContent>
              </Card>
            </NavLink>
          )
        })
      ) : (
        <p className="text-center text-gray-500">Nenhum aluno encontrado.</p>
      )}
    </section>
  )
}
