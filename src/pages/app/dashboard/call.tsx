import { ClipboardCheck } from 'lucide-react'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Student {
  id: string
  name: string
  email: string
  phone: string
  instrument: string
  group: string
  practical_level: string | null
  studentAttendance: {
    id: string
    date: string
    status: string
    classNumber: number
  }[]
}

interface CallProps {
  students: Student[] | null
}

export function Call({ students }: CallProps) {
  const isCallFinished = useMemo(() => {
    if (!students || students.length === 0) return false
    const today = new Date().toISOString().split('T')[0]
    return students.every((student) => {
      const lastAttendance = student.studentAttendance.at(-1)
      if (!lastAttendance?.date) return false
      return new Date(lastAttendance.date).toISOString().split('T')[0] === today
    })
  }, [students])

  return (
    <NavLink className="flex w-full" to="/call-list">
      <Card className="flex w-full flex-col transition-colors hover:bg-accent/50">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold sm:text-base">
            Lista de Chamada
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start justify-center pt-2">
          <div 
            className={`mb-3 rounded-full p-2 ${
              isCallFinished ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <ClipboardCheck
              className={`h-8 w-8 sm:h-10 sm:w-10 ${
                isCallFinished ? 'text-green-500' : 'text-black'
              }`}
            />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              {isCallFinished ? 'Chamada Finalizada' : 'Chamada Pendente'}
            </p>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  )
}
