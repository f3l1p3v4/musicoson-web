// import { Edit } from 'lucide-react'

// import { Button } from '@/components/ui/button'
// import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

// import { UserDetails } from './user-details'

// interface OrderTableRowProps {}

export function UserTableRow() {
  return (
    <TableRow>
      {/* <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-3 w-3" />
              <span className="sr-only">Editar</span>
            </Button>
          </DialogTrigger>

          <UserDetails />
        </Dialog>
      </TableCell> */}
      <TableCell className="font-medium">Felipe Valdez</TableCell>
      <TableCell className="text-muted-foreground">Viola</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-medium text-muted-foreground">Grupo 01</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Instrutor</TableCell>
      <TableCell className="font-medium">felipe@teste.com</TableCell>
      <TableCell className="font-medium">(67) 91234-1234</TableCell>
    </TableRow>
  )
}
