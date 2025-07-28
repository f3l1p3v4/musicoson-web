'use client'

import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useStudentHistoryStore } from '@/store/studentHistoryStore'

export function Frequency() {
  const { studentId: studentIdFromParams } = useParams()
  const { token } = useAuthStore()
  const { studentHistory, fetchStudentHistory } = useStudentHistoryStore()

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return

    if (studentIdFromParams) {
      fetchStudentHistory(studentIdFromParams, token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, studentIdFromParams])

  return (
    <section className="grid gap-2">
      <button
        onClick={() => navigate(-1)}
        className="hover:pointer mb-2 w-max rounded py-2 text-[14px]"
      >
        ← Voltar
      </button>
      <h1 className="mb-6 text-center text-xl font-bold xs:text-3xl">
        Frequência nas Aulas
      </h1>

      {studentHistory.length > 0 ? (
        studentHistory.map((item) => (
          <Card key={item.id} className="w-full">
            <CardHeader className="flex-row items-center justify-between space-y-0 xs:pb-0">
              <CardTitle className="text-sm font-medium">
                {new Date(item.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  timeZone: 'UTC',
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 xs:pt-2">
              <p className="mt-1 text-xs font-bold">{item.subject}</p>
              <p className="mt-2 text-xs">PG {item.page}</p>
              <p className="mt-2 text-xs">Exercício: {item.exercise}</p>
              <section className="flex gap-2">
                {item.attendance ? (
                  <Badge
                    variant="default"
                    className={
                      item.attendance.status === 'PRESENT'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }
                  >
                    {item.attendance.status === 'PRESENT'
                      ? 'Presente'
                      : 'Ausente'}
                  </Badge>
                ) : (
                  <Badge variant="default" className="bg-gray-500">
                    Sem registro
                  </Badge>
                )}
              </section>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">
          Nenhum histórico de aulas encontrado.
        </p>
      )}
    </section>
  )
}
