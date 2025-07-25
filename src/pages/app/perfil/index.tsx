'use client'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/store/authStore'
import { useProfileStore } from '@/store/profileStore'

export function Perfil() {
  const { user, loading, error, fetchUser } = useProfileStore()
  const { id, token } = useAuthStore()

  const navigate = useNavigate()

  useEffect(() => {
    if (id && token) {
      fetchUser(id, token)
    }
  }, [id, token, fetchUser])

  if (loading) {
    return <p className="text-center">Carregando...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  if (!user) {
    return <p className="text-center">Usuário não encontrado</p>
  }

  return (
    <div className="mx-auto w-full max-w-[350px] justify-center">
      <button
        onClick={() => navigate(-1)}
        className="hover:pointer mb-2 w-max rounded py-2 text-[14px]"
      >
        ← Voltar
      </button>

      <h1 className="mb-6 text-center text-xl font-bold xs:text-3xl">Perfil</h1>

      <Avatar className="m-auto">
        <AvatarImage
          src={'https://cdn-icons-png.flaticon.com/512/9385/9385289.png'}
        />
        <AvatarFallback>{user.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
      </Avatar>

      <section className="mt-6 flex flex-col gap-4 text-center">
        <div className="flex justify-center gap-2">
          <span className="font-bold text-primary">Nome:</span>
          <p>{user.name}</p>
        </div>

        {user.instrument && (
          <div className="flex justify-center gap-2">
            <span className="font-bold text-primary">Instrumento:</span>
            <p>{user.instrument}</p>
          </div>
        )}

        <div className="flex justify-center gap-2">
          <span className="font-bold text-primary">E-mail:</span>
          <p>{user.email}</p>
        </div>

        <div className="flex justify-center gap-2">
          <span className="font-bold text-primary">Tipo de Usuário:</span>
          <p>{user.role}</p>
        </div>

        {user.phone && (
          <div className="flex justify-center gap-2">
            <span className="font-bold text-primary">Celular:</span>
            <p>{user.phone}</p>
          </div>
        )}
      </section>
    </div>
  )
}
