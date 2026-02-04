'use client'

import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store/authStore'
import { useStudentHistoryStore } from '@/store/studentHistoryStore'

export function Frequency() {
  const { studentId: studentIdFromParams } = useParams()
  const { token } = useAuthStore()
  const { studentHistory, fetchStudentHistory } = useStudentHistoryStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return
    if (studentIdFromParams) {
      fetchStudentHistory(studentIdFromParams, token)
    }
  }, [token, studentIdFromParams])

  // Função para definir a cor baseada no status
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'PRESENT': return 'bg-green-500'
      case 'ABSENT': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <section className="flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="mb-2 w-max rounded py-2 text-[14px] text-slate-600 hover:text-black transition-colors"
      >
        ← Voltar
      </button>
      
      <h1 className="mb-6 text-center text-xl font-bold xs:text-3xl">
        Frequência nas Aulas
      </h1>

      {/* Grid de 3 colunas para os cards pequenos */}
      <div className="grid grid-cols-3 gap-3">
        {studentHistory.length > 0 ? (
          studentHistory.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className={`cursor-pointer border-none shadow-sm transition-transform active:scale-95 ${getStatusColor(item.attendance?.status)}`}>
                  <CardContent className="flex flex-col items-center justify-center p-3 text-white">
                    <span className="text-[10px] font-bold uppercase opacity-80">
                      Aula {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-bold">
                      {new Date(item.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        timeZone: 'UTC',
                      })}
                    </span>
                  </CardContent>
                </Card>
              </DialogTrigger>

              {/* Popup com detalhes */}
              <DialogContent className="w-[90%] rounded-2xl sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-left border-b pb-2">Detalhes da Aula</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Data</p>
                    <p className="text-sm font-semibold text-slate-700">
                      {new Date(item.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        timeZone: 'UTC',
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Assunto</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.subject}</p>
                  </div>

                  <div className="flex gap-10">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Página</p>
                      <p className="text-sm text-slate-600">{item.page || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Exercício</p>
                      <p className="text-sm text-slate-600">{item.exercise || '-'}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                     <Badge className={`${getStatusColor(item.attendance?.status)} border-none text-white`}>
                        {item.attendance?.status === 'PRESENT' ? 'Presente' : item.attendance?.status === 'ABSENT' ? 'Ausente' : 'Sem registro'}
                     </Badge>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500 py-10">
            Nenhum histórico encontrado.
          </p>
        )}
      </div>
    </section>
  )
}