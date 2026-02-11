import { ChartNoAxesCombined } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type FrequencyStudentProps = {
  qtdStudents: number
}

export function FrequencyStudent({ qtdStudents }: FrequencyStudentProps) {
  return (
    <NavLink className="flex w-full" to="/frequency-student">
      <Card className="flex w-full flex-col hover:bg-accent/50 transition-colors">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold sm:text-base">
            Frequência
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex flex-col items-start justify-center pt-2">
          <div className="rounded-full bg-primary/10 p-2 mb-3">
             <ChartNoAxesCombined className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
          </div>
          
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              {qtdStudents} Alunos
            </p>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  )
}