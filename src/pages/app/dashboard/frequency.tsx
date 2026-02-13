import { ChartNoAxesCombined } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useAttendanceStore } from '@/store/callListStore' // Ajuste o path se necessário

export function Frequency() {
  const { id, token } = useAuthStore()
  const { students, fetchStudentsAttendance } = useAttendanceStore()

  // Busca os dados de frequência se ainda não estiverem carregados
  useEffect(() => {
    if (token && (!students || students.length === 0)) {
      fetchStudentsAttendance(token)
    }
  }, [token, students, fetchStudentsAttendance])

  // Encontra o aluno atual na lista e calcula o total de faltas (ABSENT)
  const studentData = students?.find((student) => student.id === id)
  const totalAbsences =
    studentData?.studentAttendance?.filter(
      (attendance) => attendance.status === 'ABSENT',
    ).length || 0

  return (
    <NavLink className="flex w-full" to={`/frequency/${id}`}>
      <Card className="flex w-full flex-col transition-colors hover:bg-accent/50">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold sm:text-base">
            Frequência
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start justify-center pt-2">
          <div className="mb-3 rounded-full bg-primary/10 p-2">
            <ChartNoAxesCombined className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              {totalAbsences} {totalAbsences === 1 ? 'falta' : 'faltas'}
            </p>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  )
}
