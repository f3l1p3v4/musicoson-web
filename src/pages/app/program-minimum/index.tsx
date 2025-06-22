'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
        SUGESTÃO DE MÉTODOS PARA INSTRUMENTOS - JAN/2018
      </h1>

      {programMinimum.map((program, programIndex) => (
        <div key={programIndex}>
          <h2 className="mb-6 text-left text-xl font-bold md:text-2xl">
            {program.instrument}
          </h2>

          {(['meetings', 'cults', 'officialization'] as const).map(
            (category: keyof typeof program) => (
              <Card key={category} className="mb-2 w-full">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-semibold">
                    {category === 'meetings'
                      ? 'Culto de Jovens'
                      : category === 'cults'
                        ? 'Culto Oficial'
                        : 'Oficialização'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
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
      ))}
    </section>
  )
}
