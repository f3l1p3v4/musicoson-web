import { Music4 } from 'lucide-react'

import { NavLink } from './nav-link'
import { useAuthStore } from '@/store/authStore'
import { Separator } from './ui/separator'

export function Header() {
  const { userName, role } = useAuthStore()

  const nameParts = userName?.split(' ') || []
  const formattedName =
    nameParts.length > 1 ? `${nameParts[0]} ${nameParts[1]}` : nameParts[0] || 'Usuário'

    const roleLabel = (() => {
    if (role === 'INSTRUCTOR' && formattedName.toLowerCase().startsWith('carlos')) {
      return 'Encarregado'
    }
    
    if (role === 'INSTRUCTOR') {
      return 'Instrutor'
    }

    if (role === 'STUDENT') {
      return 'Aluno'
    }

    return role
  })()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <NavLink to="/">
          <Music4 className="h-6 w-6 text-primary" />
        </NavLink>

        <Separator orientation="vertical" className="h-6" />

        <div className="ml-auto flex items-center gap-2">
          <div className="flex flex-col">
            <span className='font-semibold text-sm'>
              A Paz de Deus Ir <span className='text-primary'>{formattedName}</span>
            </span>
            <span className="text-xs font-normal text-muted-foreground">{roleLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
