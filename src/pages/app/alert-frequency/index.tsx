'use client'

// import { MessageCircle } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { ConfirmationMessage } from './confirmation-message'

export function AlertFrequency() {
  // const handleWhatsAppClick = () => {
  //   const whatsappNumber = '5511999999999' // Número do aluno no formato internacional
  //   const url = `https://wa.me/${whatsappNumber}`
  //   window.open(url, '_blank')
  // }

  return (
    <section className="grid gap-4 p-4">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Alunos em Atenção
      </h1>

      <Dialog>
        <DialogTrigger asChild>
          <Card className="relative w-full cursor-pointer border-red-500 bg-red-50">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">
                GRUPO 01
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg font-bold text-red-600">
                Antoni Ferreira da Silva (Clarinete)
              </p>
              <div className="mt-4 space-y-1">
                <p className="text-sm font-medium text-red-600">
                  Faltas: 5 | Tarefas: 3
                </p>
                <p className="text-sm text-red-600">
                  Ultima Mensagem Enviada dia 25/01/2024 às 10:00 AM
                </p>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <ConfirmationMessage />
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Card className="relative w-full cursor-pointer border-red-500 bg-red-50">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">
                GRUPO 02
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg font-bold text-red-600">
                João Pedro Valdez (Violino)
              </p>
              <div className="mt-4 space-y-1">
                <p className="text-sm font-medium text-red-600">
                  Faltas: 5 | Tarefas: 3
                </p>
                <p className="text-sm text-red-600">
                  Ultima Mensagem Enviada dia 25/01/2024 às 10:00 AM
                </p>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <ConfirmationMessage />
      </Dialog>
    </section>
  )
}
