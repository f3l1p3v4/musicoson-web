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
    INSTRUCTOR: 'Instrutor',
    STUDENT: 'Aluno',
  }

  const groupMap: Record<string, string> = {
    GROUP_01: '01',
    GROUP_02: '02',
    GROUP_03: '03',
    GROUP_04: '04',
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-2 w-2 xs:h-3 xs:w-3" />
              <span className="sr-only">Editar</span>
            </Button>
          </DialogTrigger>

          <UserDetails user={user} />
        </Dialog>
      </TableCell>
      <TableCell className='text-xs xs:text-sm'>{user.name}</TableCell>
      <TableCell className='text-xs xs:text-sm'>{user.instrument || '-'}</TableCell>
      <TableCell className='text-xs xs:text-sm'>{user.group ? groupMap[user.group] : '-'}</TableCell>
      <TableCell className='text-xs xs:text-sm'>{roleMap[user.role] || user.role}</TableCell>
      <TableCell className='text-xs xs:text-sm'>{user.email}</TableCell>
      <TableCell className='text-xs xs:text-sm'>{user.phone || '-'}</TableCell>
    </TableRow>
  )
}
