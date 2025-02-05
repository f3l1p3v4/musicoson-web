'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProgramMinimum() {
  return (
    <section className="flex flex-col gap-2">
      <h1 className="mb-6 text-center text-3xl font-bold">Programa Mínimo</h1>
      <h1 className="mx-auto mb-6 max-w-screen-sm text-center text-2xl font-bold">
        SUGESTÃO DE MÉTODOS PARA INSTRUMENTOS - JAN/2018
      </h1>

      <h2 className="mb-6 text-left text-2xl font-bold">Violino</h2>

      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">
            Culto de Jovem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="mt-2 text-xs">
            N. LAOUREX Vol. 1 até pág. 35
            <span className="ml-1 font-bold text-primary">OU</span>
          </p>
          <p className="mt-2 text-xs">
            CCB até pág. 46 (lição 113) + H. SITT Vol 1 até lição 6
            <span className="ml-1 font-bold text-primary">OU</span>
          </p>
          <p className="mt-2 text-xs">
            MÉTODO FACILITADO - Ed. Britten - até pág. 40
            <span className="ml-1 font-bold text-primary">OU</span>
          </p>
          <p className="mt-2 text-xs font-bold">
            Obs.: Hinos 431 a 480 soprano no natural
          </p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">
            Culto Oficial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="mt-2 text-xs">
            N. LAOUREX Vol. 1 até pág. 35
            <span className="ml-1 font-bold text-primary">OU</span>
          </p>
          <p className="mt-2 text-xs">
            CCB até pág. 46 (lição 113) + H. SITT Vol 1 até lição 6
            <span className="ml-1 font-bold text-primary">OU</span>
          </p>
          <p className="mt-2 text-xs">
            MÉTODO FACILITADO - Ed. Britten - até pág. 40
            <span className="ml-1 font-bold text-primary">OU</span>
          </p>
          <p className="mt-2 text-xs font-bold">
            Obs.: Hinos 431 a 480 soprano no natural
          </p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">
            Oficialização
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="mt-2 text-xs">
            N. LAOUREX Vol. 1 até pág. 35
            <span className="ml-1 font-bold text-primary">OU</span>
          </p>
          <p className="mt-2 text-xs">
            CCB até pág. 46 (lição 113) + H. SITT Vol 1 até lição 6
            <span className="ml-1 font-bold text-primary">OU</span>
          </p>
          <p className="mt-2 text-xs">
            MÉTODO FACILITADO - Ed. Britten - até pág. 40
            <span className="ml-1 font-bold text-primary">OU</span>
          </p>
          <p className="mt-2 text-xs font-bold">
            Obs.: Hinos 431 a 480 soprano no natural
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
