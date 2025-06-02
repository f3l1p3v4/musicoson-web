// import { Home, Bell } from 'lucide-react'
import { Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

import { AccountMenu } from '@/components/account-menu'
 
const navItems = [
  // { name: 'Perfil', icon: Bell, to: '/warnings' },
  { name: 'Início', icon: Home, to: '/' },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background text-foreground border-t shadow-md">
      <ul className="flex justify-around p-3">
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
              </Link>
            </li>
          )
        })}

        <li>
          <AccountMenu />
        </li>
      </ul>
    </nav>
  )
}
