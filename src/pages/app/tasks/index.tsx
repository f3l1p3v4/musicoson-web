'use client'

import { PlusIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { TaskCreate } from './task-create'
import { StatusTask } from './task-status'

export function Tasks() {
  return (
    <>
      <section className="grid gap-2">
        <h1 className="mb-6 text-center text-3xl font-bold">Tarefas</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Card className="w-full cursor-pointer">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-md font-bold">Metodo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-xs">Estudar pg 25 lição 45</p>
                <p className="mt-1 text-xs font-bold">Observação</p>
                <p className="mt-2 text-xs">
                  Estudar com metronomo todas as lições.
                </p>
                <section className="flex gap-2">
                  <div className="flex gap-2">
                    <p className="text-xs font-bold">Criado:</p>
                    <p className="text-xs">25/02/2025</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-xs font-bold">Entregar:</p>
                    <p className="text-xs">25/02/2025</p>
                  </div>
                </section>
                <section className="flex justify-between gap-2">
                  <Badge variant="default" className="bg-gray-400">
                    Fazer
                  </Badge>
                  <div className="flex gap-1">
                    <p className="text-xs font-bold">Instrutor:</p>
                    <p className="text-xs">João</p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </DialogTrigger>

          <StatusTask />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="w-full cursor-pointer">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-md font-bold">Metodo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-xs">Estudar pg 25 lição 45</p>
                <p className="mt-1 text-xs font-bold">Observação</p>
                <p className="mt-2 text-xs">
                  Estudar com metronomo todas as lições.
                </p>
                <section className="flex gap-2">
                  <div className="flex gap-2">
                    <p className="text-xs font-bold">Criado:</p>
                    <p className="text-xs">25/02/2025</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-xs font-bold">Entregar:</p>
                    <p className="text-xs">25/02/2025</p>
                  </div>
                </section>
                <section className="flex justify-between gap-2">
                  <Badge variant="default" className="bg-red-500">
                    Pendente
                  </Badge>
                  <div className="flex gap-1">
                    <p className="text-xs font-bold">Instrutor:</p>
                    <p className="text-xs">Felipe</p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </DialogTrigger>

          <StatusTask />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="w-full cursor-pointer">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-md font-bold">Metodo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-xs">Estudar pg 25 lição 45</p>
                <p className="mt-1 text-xs font-bold">Observação</p>
                <p className="mt-2 text-xs">
                  Estudar com metronomo todas as lições.
                </p>
                <section className="flex gap-2">
                  <div className="flex gap-2">
                    <p className="text-xs font-bold">Criado:</p>
                    <p className="text-xs">25/02/2025</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-xs font-bold">Entregar:</p>
                    <p className="text-xs">25/02/2025</p>
                  </div>
                </section>
                <section className="flex justify-between gap-2">
                  <Badge variant="default" className="bg-green-500">
                    Feito
                  </Badge>
                  <div className="flex gap-1">
                    <p className="text-xs font-bold">Encarregado:</p>
                    <p className="text-xs">Carlos</p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </DialogTrigger>

          <StatusTask />
        </Dialog>
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

        <TaskCreate />
      </Dialog>
    </>
  )
}
