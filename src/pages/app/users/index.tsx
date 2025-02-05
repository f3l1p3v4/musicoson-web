// import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// import { UserTableFilters } from './user-table-filters'
import { UserTableRow } from './user-table-row'

export function Users() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
      </div>
      <div className="space-y-2.5">
        {/* <UserTableFilters /> */}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-[64px]"></TableHead> */}
                <TableHead>Nome</TableHead>
                <TableHead>Instrumento</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead>Tipo de Usuário</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Celular</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 20 }).map((_, i) => {
                return <UserTableRow key={i} />
              })}
            </TableBody>
          </Table>
        </div>
        {/* <Pagination pageIndex={0} totalCount={105} perPage={10} /> */}
      </div>
    </>
  )
}
