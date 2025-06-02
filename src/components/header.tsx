import { Music4 } from 'lucide-react'

import { NavLink } from './nav-link'
import { Separator } from './ui/separator'
import { ThemeToggle } from './theme/theme-toggle'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-4 px-6">
        <NavLink to="/">
          <Music4 className="h-6 w-6 text-primary" />
        </NavLink>

        <Separator orientation="vertical" className="h-6" />

        <h1 className='font-bold text-xl'>Musicos<strong className='text-primary'>On</strong></h1>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
