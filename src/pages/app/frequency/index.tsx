'use client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Frequency() {
  return (
    <section className="grid gap-2">
      <h1 className="mb-6 text-center text-3xl font-bold">Lista de Chamada</h1>
      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">05/02/2022</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="mt-1 text-xs font-bold">
            Aula 01 - Música, Ritmo(dif de Som e Ruidos) - Notas musicais
          </p>
          <p className="mt-2 text-xs">PG 7</p>
          <section className="flex gap-2">
            <Badge variant="default" className="bg-red-500">
              Ausente
            </Badge>
          </section>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">12/02/2022</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="mt-1 text-xs font-bold">
            Linguagem ritmica -ritmo uniforme - Figuras musicais
          </p>
          <p className="mt-2 text-xs">PG 7</p>
          <section className="flex gap-2">
            <Badge variant="default" className="bg-green-500">
              Presente
            </Badge>
          </section>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">19/02/2022</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="mt-1 text-xs font-bold">
            Aula 01 - Música, Ritmo(dif de Som e Ruidos) - Notas musicais
          </p>
          <p className="mt-2 text-xs">PG 8 | Exercício 1 ao 4</p>
          <section className="flex gap-2">
            <Badge variant="default" className="bg-red-500">
              Ausente
            </Badge>
          </section>
        </CardContent>
      </Card>
    </section>
  )
}
