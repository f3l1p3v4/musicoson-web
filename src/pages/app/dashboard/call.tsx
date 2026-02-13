import { ClipboardCheck } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Call() {
  return (
    <NavLink className="flex w-full" to="/call-list">
      <Card className="flex w-full flex-col transition-colors hover:bg-accent/50">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold sm:text-base">
            Lista de Chamada
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start justify-center pt-2">
          <div className="mb-3 rounded-full bg-primary/10 p-2">
            <ClipboardCheck className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Chamada Finalizada</p>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  )
}
