'use client'

import { NavLink } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function PerfilEdit() {
  return (
    <>
      <div className="mx-auto w-full max-w-[350px] justify-center">
        <h1 className="mb-6 text-center text-3xl font-bold">Editar Perfil</h1>

        <Avatar className="m-auto">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <section className="mt-6 flex flex-col gap-4 text-center">
          <div className="flex justify-center gap-2">
            <span className="font-bold text-primary">Nome:</span>
            <p>Felipe Valdez</p>
          </div>

          <div className="flex justify-center gap-2">
            <span className="font-bold text-primary">Instrumento:</span>
            <p>Viola</p>
          </div>

          <div className="flex justify-center gap-2">
            <span className="font-bold text-primary">Tipo de Usuário:</span>
            <p>Instrutor</p>
          </div>

          <Input className="h-12" type="email" placeholder="E-mail" />

          <Input className="h-12" type="tel" placeholder="Celular" />
        </section>

        <Button className="mt-4 h-12 w-full">
          <NavLink to="/perfil-edit">Salvar</NavLink>
        </Button>
      </div>
    </>
  )
}
