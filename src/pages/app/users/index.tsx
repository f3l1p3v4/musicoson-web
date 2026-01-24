import { useEffect, useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      fetchUsers(token).finally(() => setLoading(false))
    }
  }, [fetchUsers, token])

  const handleCreateSuccess = () => {
    if (token) {
      fetchUsers(token)
    }
    setIsDialogOpen(false)
  }

  if (loading) return <p>Carregando...</p>

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="mb-2 text-[14px] w-max rounded py-2 hover:pointer"
      >
        ← Voltar
      </button>

      <div className="flex flex-col gap-4">
        <h1 className="text-xl xs:text-3xl font-bold tracking-tight">Usuários</h1>
        {/* <UserTableFilters /> */}
      </div>
      <div className="space-y-2.5">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className='text-xs xs:text-sm'>Nome</TableHead>
                <TableHead className='text-xs xs:text-sm'>Instrumento</TableHead>
                <TableHead className='text-xs xs:text-sm'>Grupo</TableHead>
                <TableHead className='text-xs xs:text-sm'>Tipo de Usuário</TableHead>
                <TableHead className='text-xs xs:text-sm'>Nível Prático</TableHead>
                <TableHead className='text-xs xs:text-sm'>E-mail</TableHead>
                <TableHead className='text-xs xs:text-sm'>Celular</TableHead>
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
