import { ChartNoAxesCombined } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useAttendanceStore } from '@/store/callListStore' // Ajuste o path se necessário

export function Frequency() {
  const { id, token } = useAuthStore()
  const { students, fetchStudentsAttendance } = useAttendanceStore()

  useEffect(() => {
    if (token) {
      fetchStudentsAttendance(token)
    }
  }, [token, fetchStudentsAttendance])

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
          <div 
            className={`mb-3 rounded-full p-2 ${
              totalAbsences > 3
                ? 'bg-gray-100'
                : 'bg-green-100'
            }`}
          >
            <ChartNoAxesCombined
              className={`h-8 w-8 sm:h-10 sm:w-10 ${
                totalAbsences > 3
                  ? 'text-black'
                  : 'text-green-500'
              }`}
            />
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
