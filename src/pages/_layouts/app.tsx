import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { BottomNav } from '@/components/bottom-nav'
import { Header } from '@/components/header'
import { useAuthStore } from '@/store/authStore'
import { isTokenExpired } from '@/utils/auth'

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

      <div className="flex flex-1 flex-col gap-4 p-6 pb-20 pt-6">
        {' '}
        <Outlet />
      </div>

      <BottomNav />
    </div>
  )
}
