import { ContactRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FrequencyStudent() {
  return (
    <NavLink className="flex w-full" to="/frequency-student">
      <Card className="flex w-full flex-col justify-between">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">Frequência</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <ContactRound className="mb-4 h-12 w-12" />
          <p className="mt-4 text-xs text-muted-foreground">12 alunos</p>
        </CardContent>
      </Card>
    </NavLink>
  )
}
