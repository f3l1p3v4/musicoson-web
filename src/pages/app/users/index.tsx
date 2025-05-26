import { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuthStore } from '@/store/authStore'
import { userStore } from '@/store/userStore'

import { UserTableRow } from './user-table-row'
import { UserTableFilters } from './user-table-filters'

export function Users() {
  const { users, fetchUsers } = userStore()
  const { token } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      fetchUsers(token).finally(() => setLoading(false))
    }
  }, [fetchUsers, token])

  if (loading) return <p>Carregando...</p>

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
        <UserTableFilters />
      </div>
      <div className="space-y-2.5">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Instrumento</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead>Tipo de Usuário</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Celular</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <UserTableRow key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
