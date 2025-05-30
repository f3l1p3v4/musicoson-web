import { useEffect, useState } from 'react'
import { PlusIcon } from 'lucide-react'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { useAuthStore } from '@/store/authStore'
import { userStore } from '@/store/userStore'

import { UserTableRow } from './user-table-row'
import { UserCreate } from './user-create'
// import { UserTableFilters } from './user-table-filters'

export function Users() {
  const { users, fetchUsers } = userStore()
  const { token, role } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (token) {
      fetchUsers(token).finally(() => setLoading(false))
    }
  }, [fetchUsers, token])

  // Atualiza a lista e fecha modal
  const handleCreateSuccess = () => {
    if (token) {
      fetchUsers(token)
    }
    setIsDialogOpen(false)
  }

  if (loading) return <p>Carregando...</p>

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
        {/* <UserTableFilters /> */}
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

      {role === 'INSTRUCTOR' && (        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-14 right-6 bg-primary text-white hover:bg-primary hover:text-white shadow-lg z-50"
            >
              <PlusIcon className="h-8 w-8" />
              <span className="sr-only">Criar Novo</span>
            </Button>
          </DialogTrigger>

          <UserCreate token={token} onCreateSuccess={handleCreateSuccess} />
        </Dialog>
      )}
    </>
  )
}
