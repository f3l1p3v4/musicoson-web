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
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function UserDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dados atuais</DialogTitle>
      </DialogHeader>

      <div className="space-y-5">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Nome</TableCell>
              <TableCell className="flex justify-end text-muted-foreground">
                Felipe Valdez
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Instrumento
              </TableCell>
              <TableCell className="flex justify-end text-muted-foreground">
                Viola
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Grupo</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Grupo 01</span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end text-muted-foreground">
                diego@rocketseat.com.br
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Celular</TableCell>
              <TableCell className="flex justify-end text-muted-foreground">
                (47) 99999-9999
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <section className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Editar Dados</DialogTitle>
          </DialogHeader>

          <Input className="h-12" type="text" placeholder="Nome" />
          <Input className="h-12" type="text" placeholder="Instrumento" />
          <Select>
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="Grupo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grupo-1">Grupo 01</SelectItem>
              <SelectItem value="grupo-2">Grupo 02</SelectItem>
              <SelectItem value="grupo-3">Grupo 03</SelectItem>
              <SelectItem value="grupo-4">Grupo 04</SelectItem>
            </SelectContent>
          </Select>
          <Input className="h-12" type="email" placeholder="E-mail" />
          <Input className="h-12" type="tel" placeholder="Celular" />
        </section>

        <Button className="mt-4 h-12 w-full">
          <NavLink to="/perfil-edit">Salvar</NavLink>
        </Button>
      </div>
    </DialogContent>
  )
}
