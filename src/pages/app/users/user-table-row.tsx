import { Edit } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

interface User {
  id: string
  name: string
  instrument?: string
  group?: string
  role: string
  email: string
  phone?: string
}

interface Props {
  user: User
}

import { UserDetails } from './user-details'

// interface OrderTableRowProps {}

export function UserTableRow({ user }: Props) {
  const roleMap: Record<string, string> = {
    admin: 'Administrador',
    instructor: 'Instrutor',
    student: 'Aluno',
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-3 w-3" />
              <span className="sr-only">Editar</span>
            </Button>
          </DialogTrigger>

          <UserDetails />
        </Dialog>
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.instrument || '-'}</TableCell>
      <TableCell>{user.group || '-'}</TableCell>
      <TableCell>{roleMap[user.role] || user.role}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone || '-'}</TableCell>
    </TableRow>
  )
}
