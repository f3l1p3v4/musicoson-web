import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuthStore } from '@/store/authStore'
import { userStore } from '@/store/userStore'

import { UserCreate } from './user-create'
import { UserTableFilters } from './user-table-filters'
import { UserTableRow } from './user-table-row'

export function Users() {
  const { users, fetchUsers } = userStore()
  const { token, role: userRole } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navigate = useNavigate()

  const [filters, setFilters] = useState({
    nome: '',
    instrumento: '',
    grupo: 'all',
    nivel: 'all-level',
    role: 'all',
  })

  useEffect(() => {
    if (token) {
      fetchUsers(token).finally(() => setLoading(false))
    }
  }, [fetchUsers, token])

  const filteredUsers = users.filter((user) => {
    const matchesNome = user.name
      .toLowerCase()
      .includes(filters.nome.toLowerCase())
    const matchesInstrumento =
      filters.instrumento === '' ||
      user.instrument?.toLowerCase().includes(filters.instrumento.toLowerCase())
    const matchesGrupo = filters.grupo === 'all' || user.group === filters.grupo
    const matchesNivel =
      filters.nivel === 'all-level' || user.practical_level === filters.nivel
    const matchesRole = filters.role === 'all' || user.role === filters.role

    return (
      matchesNome &&
      matchesInstrumento &&
      matchesGrupo &&
      matchesNivel &&
      matchesRole
    )
  })

  // Efeito para mostrar o Toast quando o usuário filtra
  useEffect(() => {
    // Só mostra se não estiver carregando e se houver algum filtro ativo
    const hasActiveFilter =
      filters.nome ||
      filters.instrumento ||
      filters.grupo !== 'all' ||
      filters.nivel !== 'all-level' ||
      filters.role !== 'all'

    if (!loading && hasActiveFilter) {
      toast.info(`Encontrado(s) ${filteredUsers.length} usuário(s)`, {
        id: 'filter-count', // ID fixo evita que fiquem subindo vários toasts repetidos
        duration: 2000,
      })
    }
  }, [filters, filteredUsers.length, loading])

  const handleCreateSuccess = () => {
    if (token) fetchUsers(token)
    setIsDialogOpen(false)
  }

  if (loading)
    return (
      <p className="p-8 text-center text-sm text-muted-foreground">
        Carregando usuários...
      </p>
    )

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="hover:pointer mb-2 w-max rounded py-2 text-[14px]"
      >
        ← Voltar
      </button>

      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight xs:text-3xl">
              Usuários
            </h1>
            <Badge
              variant="secondary"
              className="h-6 px-2 text-xs font-semibold"
            >
              {filteredUsers.length}{' '}
              {filteredUsers.length === 1 ? 'resultado' : 'resultados'}
            </Badge>
          </div>
        </div>

        <UserTableFilters filters={filters} setFilters={setFilters} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]"></TableHead>
              <TableHead className="text-xs xs:text-sm">Nome</TableHead>
              <TableHead className="text-xs xs:text-sm">Instrumento</TableHead>
              <TableHead className="text-xs xs:text-sm">Grupo</TableHead>
              <TableHead className="text-xs xs:text-sm">
                Tipo de Usuário
              </TableHead>
              <TableHead className="text-xs xs:text-sm">
                Nível Prático
              </TableHead>
              <TableHead className="text-xs xs:text-sm">E-mail</TableHead>
              <TableHead className="text-xs xs:text-sm">Celular</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserTableRow key={user.id} user={user} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {userRole === 'INSTRUCTOR' && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-14 right-6 z-50 bg-primary text-white shadow-lg hover:bg-primary hover:text-white"
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
