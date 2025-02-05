import { Music4 } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import LoginImg from '../../assets/login.jpg'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div
        className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground"
        style={{ backgroundImage: `url(${LoginImg})`, opacity: 1 }}
      >
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Music4 className="h-5 w-5 text-white" />
          <span className="font-semibold text-white">MusicosOn</span>
        </div>

        <footer className="rounded bg-black px-1 text-sm">
          Gestão para aula de música &copy; MusicosOn -{' '}
          {new Date().getFullYear()}
        </footer>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
