import { Home, User, Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const navItems = [
  { name: 'Início', icon: Home, to: '/' },
  { name: 'Perfil', icon: User, to: '/profile' },
  { name: 'Configurações', icon: Settings, to: '/settings' },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md sm:hidden">
      <ul className="flex justify-around p-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to
          const Icon = item.icon

          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={clsx(
                  'flex flex-col items-center text-sm',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
