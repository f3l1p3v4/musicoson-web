'use client'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { WarningsCreate } from './warnings-create'

export function Warnings() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="mb-6 text-center text-3xl font-bold">Avisos</h1>

        <Card className="w-full">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-light">12/12/2024</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="mt-1 text-xs font-bold">Ensaio Botafogo</p>
            <p className="mt-2 text-xs">Ensaio no Botafogo dia 18/08/2023</p>
            <p className="mt-2 text-xs font-bold">Ir. Carlos</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-light">12/12/2024</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="mt-1 text-xs font-bold">Suspensão Aula de Música</p>
            <p className="mt-2 text-xs">
              Não tera aula de música no dia 22/08/2023{' '}
            </p>
            <p className="mt-2 text-xs font-bold">Ir. Carlos</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-light">12/12/2024</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="mt-1 text-xs font-bold">Férias</p>
            <p className="mt-2 text-xs">
              Entraremos de férias dia 26/08/2023 e retornará 25/09/2023.
            </p>
            <p className="mt-2 text-xs font-bold">Ir. Carlos</p>
          </CardContent>
        </Card>
      </section>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-6 right-6 bg-primary text-white hover:bg-primary hover:text-white"
          >
            <PlusIcon className="h-8 w-8" />
            <span className="sr-only">Criar Novo</span>
          </Button>
        </DialogTrigger>

        <WarningsCreate />
      </Dialog>
    </>
  )
}
