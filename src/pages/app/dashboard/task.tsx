import { ListChecks } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Task() {
  return (
    <NavLink className="flex w-full gap-2" to="/tasks">
      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between space-y-0 xs:pb-0">
          <CardTitle className="text-base font-semibold">Tarefas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <ListChecks className="mb-4 h-12 w-12" />
          <p className="mt-4 text-xs text-muted-foreground">5 em aberto</p>
        </CardContent>
      </Card>
    </NavLink>
  )
}
