import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from './ui/sheet'
import { Separator } from './ui/separator'
import { Button } from '@/components/ui/button'

import { MenuIcon, LogOut, BookOpenText, FileText, Users2, User2Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'

import LogoMenuImg from '../assets/logo-menu.png'

export function AccountMenu() {
  const { role, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/sign-in')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex flex-col items-center text-muted-foreground text-sm">
          <MenuIcon className="h-5 w-5 mb-1" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72 pt-10 flex flex-col justify-between">
        <div>
          <SheetHeader className="mb-4">
            <SheetTitle>
              <div className="flex flex-col items-center">
                <img src={LogoMenuImg} className="w-40" alt="Logo" />
              </div>
            </SheetTitle>
          </SheetHeader>

          <Separator className="my-3" />

          <div className="space-y-3">
            <SheetClose asChild>
              <NavLink to="/perfil" className="flex items-center gap-3 text-sm font-normal text-muted-foreground">
                <User2Icon className="h-4 w-4" />
                Perfil
              </NavLink>
            </SheetClose>

            {role === 'INSTRUCTOR' && (
              <SheetClose asChild>
                <NavLink to="/users" className="flex items-center gap-3 text-sm font-normal text-muted-foreground">
                  <Users2 className="h-4 w-4" />
                  Usuários
                </NavLink>
              </SheetClose>
            )}

            <SheetClose asChild>
              <NavLink to="/program-minimum" className="flex items-center gap-3 text-sm font-normal text-muted-foreground">
                <FileText className="h-4 w-4" />
                Programa Mínimo
              </NavLink>
            </SheetClose>

            <SheetClose asChild>
              <NavLink to="/class-plan" className="flex items-center gap-3 text-sm font-normal text-muted-foreground">
                <BookOpenText className="h-4 w-4" />
                Plano de Aula
              </NavLink>
            </SheetClose>
          </div>

          <Separator className="my-3" />
        </div>

        <div className="px-2 space-y-3">
          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tema</span>
            <ThemeToggle />
          </div>

          <SheetClose asChild>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Sair</span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleLogout}
                className="bg-rose-500 text-white hover:bg-rose-600 hover:text-white"
              >
                <LogOut className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
