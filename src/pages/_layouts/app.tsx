// import { Outlet } from 'react-router-dom'
// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuthStore } from '@/store/authStore'
// import { isTokenExpired } from '@/utils/auth'
// import { toast } from 'sonner'

// import { Header } from '@/components/header'

// export function AppLayout() {
//   const { token, logout } = useAuthStore()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!token) {
//       navigate('/sign-in', { replace: true })
//       return
//     }

//     if (isTokenExpired(token)) {
//       logout()
//       toast.warning('Sessão expirada. Faça login novamente.')
//       navigate('/sign-in', { replace: true })
//     }
//   }, [token, logout, navigate])
  
//   return (
//     <div className="flex min-h-screen flex-col antialiased">
//       <Header />

//       <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
//         <Outlet />
//       </div>
//     </div>
//   )
// }

import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { isTokenExpired } from '@/utils/auth'
import { toast } from 'sonner'

import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'

export function AppLayout() {
  const { token, logout } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/sign-in', { replace: true })
      return
    }

    if (isTokenExpired(token)) {
      logout()
      toast.warning('Sessão expirada. Faça login novamente.')
      navigate('/sign-in', { replace: true })
    }
  }, [token, logout, navigate])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6 pb-20"> {/* adiciona espaço inferior para BottomNav */}
        <Outlet />
      </div>

      <BottomNav /> {/* novo componente fixado no fundo */}
    </div>
  )
}
