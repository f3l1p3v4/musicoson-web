import { ChartNoAxesCombined } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Student {
  studentAttendance: {
    date: string | number | Date
    status: string
  }[]
}

type FrequencyStudentProps = {
  students: Student[] | null
}

export function FrequencyStudent({ students }: FrequencyStudentProps) {
  const currentYear = new Date().getFullYear()
  const allAttendance =
    students?.flatMap((s) =>
      s.studentAttendance.filter(
        (a) => new Date(a.date).getUTCFullYear() === currentYear,
      ),
    ) || []
  const totalRecords = allAttendance.length
  const totalPresence = allAttendance.filter((a) => a.status === 'PRESENT').length

  const attendancePercentage = totalRecords > 0 
    ? Math.round((totalPresence / totalRecords) * 100) 
    : 0

  const isLowAttendance = attendancePercentage < 60

  return (
    <NavLink className="flex w-full" to="/frequency-student">
      <Card className="flex w-full flex-col transition-colors hover:bg-accent/50">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold sm:text-base">
            Frequência Geral
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-start justify-center pt-2">
          <div 
            className={`mb-3 rounded-full p-2 ${
              isLowAttendance ? 'bg-red-100' : 'bg-green-100'
            }`}
          >
            <ChartNoAxesCombined
              className={`h-8 w-8 sm:h-10 sm:w-10 ${
                isLowAttendance ? 'text-red-500' : 'text-green-600'
              }`}
            />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              {totalRecords > 0 
                ? `${attendancePercentage}% de presença` 
                : 'Sem dados de chamada'}
            </p>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  )
}
