import {
  BookOpenText,
  FileText,
  LogOut,
  MenuIcon,
  User2Icon,
  Users2,
} from 'lucide-react'

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          A paz de Deus <p className="text-primary">Felipe</p>
          <MenuIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Felipe Valdez</span>
          <span className="text-xs font-normal text-muted-foreground">
            Instrutor
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <NavLink className="flex w-full gap-2" to="/perfil">
            <User2Icon className="h-4 w-4" />
            <span>Perfil</span>
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink className="flex w-full gap-2" to="/users">
            <Users2 className="h-4 w-4" />
            <span>Usuários</span>
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink className="flex w-full gap-2" to="/program-minimum">
            <FileText className="h-4 w-4" />
            <span>Programa Mínimo</span>
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink className="flex w-full gap-2" to="/class-plan">
            <BookOpenText className="h-4 w-4" />
            <span>Plano de Aula</span>
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
          <NavLink className="flex w-full gap-2" to="/sign-in">
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
