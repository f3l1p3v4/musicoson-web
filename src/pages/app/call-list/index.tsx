'use client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { Confirmation } from './confirmation'

export function CallList() {
  return (
    <section className="grid gap-2">
      <h1 className="mb-6 text-center text-3xl font-bold">Lista de Chamada</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="w-full cursor-pointer">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium">GRUPO 01</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-md mt-1 font-bold">Antoni Ferreira da Silva</p>
              <p className="mt-2 text-xs">Clarinete</p>
              <section className="flex gap-2">
                <Badge variant="default" className="bg-red-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-red-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-red-500">
                  05/02
                </Badge>
              </section>
            </CardContent>
          </Card>
        </DialogTrigger>

        <Confirmation />
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Card className="w-full">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium">GRUPO 01</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-md mt-1 font-bold">Caio da Silva Santos</p>
              <p className="mt-2 text-xs">Violino</p>
              <section className="flex gap-2">
                <Badge variant="default" className="bg-red-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-red-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-red-500">
                  05/02
                </Badge>
              </section>
            </CardContent>
          </Card>
        </DialogTrigger>

        <Confirmation />
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Card className="w-full">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium">GRUPO 01</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-md mt-1 font-bold">
                João Pedro Valdez dos Santos
              </p>
              <p className="mt-2 text-xs">Violino</p>
              <section className="flex gap-2">
                <Badge variant="default" className="bg-red-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-red-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-green-500">
                  05/02
                </Badge>
                <Badge variant="default" className="bg-red-500">
                  05/02
                </Badge>
              </section>
            </CardContent>
          </Card>
        </DialogTrigger>

        <Confirmation />
      </Dialog>
    </section>
  )
}
