import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function WarningsCreate() {
  return (
    <DialogContent>
      <section className="grid gap-4">
        <DialogHeader>
          <DialogTitle>Criar um Aviso</DialogTitle>
        </DialogHeader>

        <Input className="h-12" type="text" placeholder="Nome" />
        <Input className="h-12" type="text" placeholder="Descrição" />
        <Select>
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Grupo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grupo-1">Grupo 01</SelectItem>
            <SelectItem value="grupo-2">Grupo 02</SelectItem>
            <SelectItem value="grupo-3">Grupo 03</SelectItem>
            <SelectItem value="grupo-4">Grupo 04</SelectItem>
            <SelectItem value="todos">Todos</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <Button className="mt-4 h-12 w-full">
        <NavLink to="/perfil-edit">Salvar</NavLink>
      </Button>
    </DialogContent>
  )
}
