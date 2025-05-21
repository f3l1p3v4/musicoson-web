import {
  BookOpenText,
  FileText,
  LogOut,
  MenuIcon,
  User2Icon,
  Users2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/store/authStore'

import { NavLink } from './nav-link'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  const navigate = useNavigate()
  const { role, logout, userName, instrument } = useAuthStore()
  const firstName = userName?.split(' ')[0] || 'Usuário'
  const nameParts = userName?.split(' ') || 'Usuário'
  const formattedName =
    nameParts.length > 1 ? `${nameParts[0]} ${nameParts[1]}` : nameParts[0]

  const handleLogout = () => {
    logout()
    navigate('/sign-in')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          A paz de Deus Ir<p className="text-primary">{firstName}</p>
          <MenuIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>{formattedName}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {instrument}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <NavLink className="flex w-full gap-2 px-2 py-1.5" to="/perfil">
            <User2Icon className="h-4 w-4" />
            <span>Perfil</span>
          </NavLink>
        </DropdownMenuItem>

        {role === 'INSTRUCTOR' && (
          <DropdownMenuItem>
            <NavLink className="flex w-full gap-2 px-2 py-1.5" to="/users">
              <Users2 className="h-4 w-4" />
              <span>Usuários</span>
            </NavLink>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem>
          <NavLink
            className="flex w-full gap-2 px-2 py-1.5"
            to="/program-minimum"
          >
            <FileText className="h-4 w-4" />
            <span>Programa Mínimo</span>
          </NavLink>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <NavLink
            className="flex h-full w-full cursor-pointer gap-2 px-2 py-1.5"
            to="/class-plan"
          >
            <BookOpenText className="h-4 w-4" />
            <span>Plano de Aula</span>
          </NavLink>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer px-2 py-1.5 text-rose-500 dark:text-rose-400"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
