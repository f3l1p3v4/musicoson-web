import { Music4 } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import LoginImg from '../../assets/login.jpg'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Coluna da imagem - oculta no mobile */}
      <div
        className="hidden h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground md:flex"
        style={{
          backgroundImage: `url(${LoginImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Music4 className="h-5 w-5 text-white" />
          <span className="font-semibold text-white">MusicosOn</span>
        </div>

        <footer className="rounded bg-black px-1 text-sm text-white">
          Gestão para aula de música &copy; MusicosOn -{' '}
          {new Date().getFullYear()}
        </footer>
      </div>

      {/* Coluna do formulário */}
      <div className="flex w-full items-center justify-center px-2 py-8 md:px-4">
        <Outlet />
      </div>
    </div>
  )
}
