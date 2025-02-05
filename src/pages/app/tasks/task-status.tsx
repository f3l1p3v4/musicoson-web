import { DialogDescription } from '@radix-ui/react-dialog'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function StatusTask() {
  return (
    <DialogContent className="pa-2">
      <DialogHeader className="grid w-full justify-center">
        <DialogTitle className="text-center">METODO</DialogTitle>
        <DialogDescription className="text-center">
          Estudar pg 25 lição 45
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-between gap-2">
        <Button
          className="h-12 w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          variant="outline"
        >
          <NavLink to="/perfil-edit">Pendente</NavLink>
        </Button>
        <Button className="h-12 w-full bg-green-500 hover:bg-green-500">
          <NavLink to="/perfil-edit">Feito</NavLink>
        </Button>
      </div>
    </DialogContent>
  )
}
