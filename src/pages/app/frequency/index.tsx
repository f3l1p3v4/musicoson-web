import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuthStore } from '@/store/authStore'
import { useAttendanceStore } from '@/store/callListStore'
import { useStudentHistoryStore } from '@/store/studentHistoryStore'

export function Frequency() {
  const { studentId: studentIdFromParams } = useParams()
  const { token, id: instructorId, role } = useAuthStore()
  const { studentHistory, fetchStudentHistory } = useStudentHistoryStore()
  const {
    students,
    fetchStudentsAttendance,
    markAttendance,
    updateAttendance: updateAttendanceStore,
  } = useAttendanceStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return
    if (studentIdFromParams) {
      fetchStudentHistory(studentIdFromParams, token)
      fetchStudentsAttendance(token)
    }
  }, [token, studentIdFromParams, fetchStudentHistory, fetchStudentsAttendance])

  // Processa o histórico para garantir pares de teoria/prática e ordem cronológica
  const processedHistory = useMemo(() => {
    const student = students?.find((s) => s.id === studentIdFromParams)
    const allAttendance = student?.studentAttendance || []

    const cards: any[] = []
    const usedAttendanceIds = new Set<string>()

    studentHistory.forEach((item) => {
      // Data original do plano (geralmente Sábado ou Feriado)
      const planDate = new Date(item.date)
      const planYear = planDate.getUTCFullYear()
      const classNum = item.classNumber

      if (classNum && classNum > 0) {
        // 1. Card Teoria (Sábado) - Pega o registro original (classNumber 1, 2, 3...)
        // Filtra pelo classNumber E pelo ano da aula no plano
        const theoryAtt = allAttendance.find(
          (a) =>
            a.classNumber === classNum &&
            new Date(a.date).getUTCFullYear() === planYear,
        )

        const realAttendanceId = theoryAtt?.id || item.attendance?.id || null

        if (theoryAtt) {
          usedAttendanceIds.add(theoryAtt.id)
        }

        if (item.attendance?.id) {
          usedAttendanceIds.add(item.attendance.id)
        }

        const isEnsaio = item.subject?.includes('Ensaio do GEM')

        cards.push({
          id: `theory-${item.id}`,
          attendanceId: realAttendanceId,
          baseClassNum: classNum,
          labelType: isEnsaio ? 'Ensaio GEM' : 'Teoria',
          date: new Date(planDate),
          status: theoryAtt?.status || item.attendance?.status || null,
          subject: item.subject,
          page: item.page,
          exercise: item.exercise,
          isPractical: false,
        })

        // 2. Card Prática (Segunda) - Pega o registro +90 (classNumber 91, 92, 93...)
        const practiceClassNum = classNum + 90
        const practiceAtt = allAttendance.find(
          (a) =>
            a.classNumber === practiceClassNum &&
            new Date(a.date).getUTCFullYear() === planYear,
        )

        if (practiceAtt) {
          usedAttendanceIds.add(practiceAtt.id)
        }

        // Calcula a data da segunda-feira (Sábado + 2 dias) usando UTC
        const practiceDate = new Date(planDate)
        practiceDate.setUTCDate(practiceDate.getUTCDate() + 2)

        cards.push({
          id: practiceAtt?.id || `practice-v-${item.id}`,
          attendanceId: practiceAtt?.id || null,
          baseClassNum: classNum,
          labelType: 'Prática',
          date: practiceDate,
          status: practiceAtt?.status || null,
          subject: 'Aula Prática',
          isPractical: true,
          isVirtual: !practiceAtt,
        })
      } else {
        // Item sem número de aula (Feriado, Ensaio, etc.)
        if (item.attendance?.id) {
          usedAttendanceIds.add(item.attendance.id)
        }

        const isEnsaio = item.subject?.includes('Ensaio do GEM')
        cards.push({
          id: item.id,
          attendanceId: item.attendance?.id || null,
          baseClassNum: null,
          labelType: isEnsaio ? 'Ensaio GEM' : '',
          date: new Date(planDate),
          status: item.attendance?.status || null,
          subject: item.subject,
          isPractical: false,
        })
      }
    })

    // Adiciona presenças que não foram vinculadas a nenhum plano de aula
    allAttendance.forEach((att) => {
      if (!usedAttendanceIds.has(att.id)) {
        const isPractical = att.classNumber > 90
        const baseClassNum = isPractical
          ? att.classNumber - 90
          : att.classNumber

        cards.push({
          id: att.id,
          attendanceId: att.id,
          baseClassNum: baseClassNum > 0 ? baseClassNum : null,
          labelType: isPractical ? 'Prática' : 'Teoria',
          date: new Date(att.date),
          status: att.status,
          subject: isPractical ? 'Aula Prática' : 'Aula de Teoria',
          isPractical,
          isExtra: true, // Marcador para aulas que não vieram do plano
        })
      }
    })

    // Ordenação final cronológica rigorosa por data
    return cards.sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [studentHistory, students, studentIdFromParams])

  // Função para definir a cor baseada no status
  const getStatusColor = (status?: string | null) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-green-500'
      case 'ABSENT':
        return 'bg-red-500'
      default:
        return 'bg-gray-400'
    }
  }

  const handleStatusUpdate = async (item: any, newStatus: string) => {
    if (!token || !studentIdFromParams || !instructorId) return

    try {
      if (item.attendanceId) {
        const result = await updateAttendanceStore({
          attendanceId: item.attendanceId,
          status: newStatus,
          token,
        })
        if (result.success) {
          toast.success('Presença atualizada com sucesso!')
          fetchStudentHistory(studentIdFromParams, token)
          fetchStudentsAttendance(token)
        } else {
          toast.error('Erro ao atualizar presença.')
        }
      } else {
        // Criar nova presença
        const result = await markAttendance({
          date: item.date.toISOString(),
          studentId: studentIdFromParams,
          instructorId,
          status: newStatus,
          token,
        })
        if (result.success) {
          toast.success('Presença registrada com sucesso!')
          fetchStudentHistory(studentIdFromParams, token)
          fetchStudentsAttendance(token)
        } else {
          toast.error('Erro ao registrar presença.')
        }
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao processar a solicitação.')
    }
  }

  return (
    <section className="flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="mb-2 w-max rounded py-2 text-[14px] text-slate-600 transition-colors hover:text-black"
      >
        ← Voltar
      </button>

      <h1 className="mb-6 text-center text-xl font-bold xs:text-3xl">
        Frequência nas Aulas
      </h1>

      <div className="grid grid-cols-3 gap-3">
        {processedHistory.length > 0 ? (
          processedHistory.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card
                  className={`cursor-pointer border-none shadow-sm transition-transform active:scale-95 ${getStatusColor(item.status)}`}
                >
                  <CardContent className="flex flex-col items-center justify-center p-3 text-white text-center">
                    <span className="text-[9px] font-black uppercase opacity-90 leading-none">
                      {item.baseClassNum
                        ? `Aula ${String(item.baseClassNum).padStart(2, '0')}`
                        : '-'}
                    </span>
                    {item.labelType && (
                      <span className="text-[10px] font-bold uppercase opacity-80 mb-1">
                        {item.labelType}
                      </span>
                    )}
                    <span className="text-sm font-bold">
                      {item.date.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        timeZone: 'UTC',
                      })}
                    </span>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="w-[90%] rounded-2xl sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="border-b pb-2 text-left flex items-center justify-between">
                    <span>Detalhes da Aula</span>
                    <Badge variant="outline" className="text-[10px] uppercase">
                      {item.labelType || 'Extra'}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Data
                      </p>
                      <p className="text-sm font-semibold text-slate-700">
                        {item.date.toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          timeZone: 'UTC',
                        })}
                      </p>
                    </div>
                    {item.baseClassNum && (
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Número
                        </p>
                        <p className="text-sm font-bold text-primary">
                          Aula {String(item.baseClassNum).padStart(2, '0')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Assunto
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.subject || '-'}
                    </p>
                  </div>

                  {!item.isPractical && (
                    <div className="flex gap-10">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Página
                        </p>
                        <p className="text-sm text-slate-600">
                          {item.page || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Exercício
                        </p>
                        <p className="text-sm text-slate-600">
                          {item.exercise || '-'}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <Badge
                      className={`${getStatusColor(item.status)} border-none text-white`}
                    >
                      {item.status === 'PRESENT'
                        ? 'Presente'
                        : item.status === 'ABSENT'
                          ? 'Ausente'
                          : 'Sem registro'}
                    </Badge>
                  </div>

                  {role === 'INSTRUCTOR' && (
                    <div className="mt-4 border-t pt-4">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Alterar Presença
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={
                            item.status === 'PRESENT' ? 'default' : 'outline'
                          }
                          className={
                            item.status === 'PRESENT'
                              ? 'bg-green-500 hover:bg-green-600'
                              : ''
                          }
                          onClick={() => handleStatusUpdate(item, 'PRESENT')}
                        >
                          Presente
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            item.status === 'ABSENT' ? 'default' : 'outline'
                          }
                          className={
                            item.status === 'ABSENT'
                              ? 'bg-red-500 hover:bg-red-600'
                              : ''
                          }
                          onClick={() => handleStatusUpdate(item, 'ABSENT')}
                        >
                          Ausente
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <p className="col-span-3 py-10 text-center text-gray-500">
            Nenhum histórico encontrado.
          </p>
        )}
      </div>
    </section>
  )
}
