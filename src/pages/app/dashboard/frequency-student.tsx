import { ChartNoAxesCombined } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Student {
  studentAttendance: {
    status: string
  }[]
}

type FrequencyStudentProps = {
  students: Student[] | null
}

export function FrequencyStudent({ students }: FrequencyStudentProps) {
  const studentsWithMoreThan3Absences =
    students?.filter(
      (student) =>
        student.studentAttendance.filter((att) => att.status === 'ABSENT')
          .length > 3,
    ).length || 0

  return (
    <NavLink className="flex w-full" to="/frequency-student">
      <Card className="flex w-full flex-col transition-colors hover:bg-accent/50">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold sm:text-base">
            Frequência
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-start justify-center pt-2">
          <div 
            className={`mb-3 rounded-full p-2 ${
              studentsWithMoreThan3Absences > 3
                ? 'bg-green-100'
                : 'bg-gray-100'
            }`}
          >
            <ChartNoAxesCombined
              className={`h-8 w-8 sm:h-10 sm:w-10 ${
                studentsWithMoreThan3Absences > 3
                  ? 'text-red-500'
                  : 'text-black'
              }`}
            />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              {studentsWithMoreThan3Absences > 0
                ? `${studentsWithMoreThan3Absences} com alerta de falta`
                : 'Nenhum alerta de falta'}
            </p>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  )
}
