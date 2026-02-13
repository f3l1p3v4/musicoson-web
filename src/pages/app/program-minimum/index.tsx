'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useProgramMinimumStore } from '@/store/programMinimumStore'

export function ProgramMinimum() {
  const { programMinimum, fetchProgramMinimum } = useProgramMinimumStore()
  const { token } = useAuthStore()
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      fetchProgramMinimum(token).finally(() => setLoading(false))
    }
  }, [fetchProgramMinimum, token])

  if (loading) return <p>Carregando...</p>
  if (!programMinimum || programMinimum.length === 0)
    return <p>Nenhum dado encontrado.</p>

  return (
    <section className="flex flex-col gap-2">
      <button
        onClick={() => navigate(-1)}
        className="hover:pointer mb-2 w-max rounded py-2 text-[14px]"
      >
        ← Voltar
      </button>

      <h1 className="mb-2 text-center text-xl font-bold xs:text-3xl">
        Programa Mínimo
      </h1>
      <h1 className="mx-auto mb-4 max-w-screen-sm text-center text-sm font-bold xs:text-2xl">
        PROGRAMA MÍNIMO PARA MÚSICOS – 2023
      </h1>

      {/*       {programMinimum.map((program, programIndex) => (
        <div key={programIndex}>
          <h2 className="mb-6 text-left text-xl font-bold md:text-2xl">
            {program.instrument}
          </h2>

         {(['meetings', 'cults', 'officialization'] as const).map(
            (category: keyof typeof program) => (
              <Card key={category} className="mb-2 w-full">
                <CardHeader className="flex-row items-center justify-between space-y-0 xs:pb-0">
                  <CardTitle className="text-base font-semibold">
                    {category === 'meetings'
                      ? 'Culto de Jovens'
                      : category === 'cults'
                        ? 'Culto Oficial'
                        : 'Oficialização'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 xs:pt-2">
                  {Array.isArray(program[category]) &&
                  program[category].length > 0 ? (
                    program[category].map((item, index) => (
                      <p key={index} className="mt-2 text-xs">
                        {item.name}
                        {index < program[category].length - 1 && (
                          <span className="ml-1 font-bold text-primary">
                            OU
                          </span>
                        )}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      Nenhum dado encontrado para esta categoria.
                    </p>
                  )}
                </CardContent>
              </Card>
            ),
          )}
        </div>
))} */}

      <Accordion type="single" collapsible className="w-full space-y-3">
        {programMinimum.map((program, programIndex) => (
          <AccordionItem
            key={programIndex}
            value={`item-${programIndex}`}
            className="rounded-xl border-none bg-slate-50/50 px-4 transition-all hover:bg-slate-100/50"
          >
            <AccordionTrigger className="border-none py-4 hover:no-underline">
              <span className="text-lg font-medium tracking-tight text-gray-700">
                {program.instrument}
              </span>
            </AccordionTrigger>

            <AccordionContent className="pb-4">
              <div className="flex flex-col gap-4">
                {(['meetings', 'cults', 'officialization'] as const).map(
                  (category: keyof typeof program) => (
                    <div key={category} className="space-y-2">
                      <h4 className="ml-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {category === 'meetings'
                          ? 'Culto de Jovens'
                          : category === 'cults'
                            ? 'Culto Oficial'
                            : 'Oficialização'}
                      </h4>

                      <div className="rounded-lg border border-slate-100 bg-white p-3 shadow-sm">
                        {Array.isArray(program[category]) &&
                        (program[category] as any[]).length > 0 ? (
                          (program[category] as any[]).map((item, index) => (
                            <p
                              key={index}
                              className={`mb-1 text-xs leading-relaxed last:mb-0 ${
                                item.name.startsWith('Obs')
                                  ? 'mt-2 font-bold text-slate-600'
                                  : 'text-slate-600'
                              }`}
                            >
                              {item.name}
                              {index <
                                (program[category] as any[]).length - 1 &&
                                !(program[category] as any[])[
                                  index + 1
                                ].name.startsWith('Obs') && (
                                  <span className="mx-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                    OU
                                  </span>
                                )}
                            </p>
                          ))
                        ) : (
                          <p className="text-xs italic text-slate-400">
                            Nenhum dado encontrado.
                          </p>
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="mb-2 w-full border-blue-500 bg-blue-100">
        <CardHeader className="flex-row items-center justify-between space-y-0 xs:pb-0">
          <CardTitle className="text-base font-bold text-blue-600">
            Observações:
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 xs:pt-2">
          <p className="mt-2 text-xs font-medium text-blue-600">
            - Os métodos acima poderão ser substituídos por outros de grau mais
            elevado.
          </p>
          <p className="mt-2 text-xs font-medium text-blue-600">
            - Todos os Instrumentos deverão saber executar a voz principal, voz
            alternativa e o soprano, devendo ser apresentado nos testes.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
