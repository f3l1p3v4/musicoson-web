import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TaskStudent() {
  return (
    <NavLink className="flex w-full gap-2" to="/tasks">
      <Card className="flex h-full w-full flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">Tarefas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between">
          <div className="flex flex-1 items-start">
            <h1 className="text-5xl font-bold">5</h1>
          </div>
          <p className="text-xs text-muted-foreground">7 Concluídas</p>
        </CardContent>
      </Card>
    </NavLink>
  )
}
