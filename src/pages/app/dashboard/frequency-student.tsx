import { ContactRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type FrequencyStudentProps = {
  qtdStudents: number
}

export function FrequencyStudent({ qtdStudents }: FrequencyStudentProps) {
  return (
    <NavLink className="flex w-full" to="/frequency-student">
      <Card className="flex w-full flex-col justify-between">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold sm:text-base">Frequência</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <ContactRound className="mb-4 h-10 w-10 sm:h-12 sm:w-12" />
          <p className="mt-4 text-xs font-extralight text-muted-foreground">{qtdStudents} alunos</p>
        </CardContent>
      </Card>
    </NavLink>
  )
}
