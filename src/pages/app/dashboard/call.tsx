import { ClipboardCheck } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Call() {
  return (
    <NavLink className="flex w-full gap-2" to="/call-list">
      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold sm:text-base">
            Lista de Chamada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <ClipboardCheck className="mb-4 h-10 w-10 sm:h-12 sm:w-12" />
          {/* <p className="mt-4 text-xs font-extralight text-muted-foreground">
            Chamada do dia finalizada
          </p> */}
        </CardContent>
      </Card>
    </NavLink>
  )
}
