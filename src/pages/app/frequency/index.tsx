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
      if (role === 'INSTRUCTOR') {
        fetchStudentsAttendance(token)
      }
    }
  }, [
    token,
    studentIdFromParams,
    fetchStudentHistory,
    fetchStudentsAttendance,
    role,
  ])

  // Processa o histórico para garantir pares de teoria/prática e ordem cronológica
  const processedHistory = useMemo(() => {
    // Alunos não têm acesso a 'students' (authStore/callListStore).
    // Toda a informação agora deve vir de `studentHistory`.
    const student = role === 'INSTRUCTOR' ? students?.find((s) => s.id === studentIdFromParams) : null
    const allAttendance = student?.studentAttendance || []

    const cards: any[] = []
    const usedAttendanceIds = new Set<string>()

    studentHistory.forEach((item) => {
      // Data original do plano (geralmente Sábado ou Feriado)
      const planDate = new Date(item.date)
      const planYear = planDate.getUTCFullYear()
      const classNum = item.classNumber

      // Se for uma aula prática vinda no histórico, pula a criação do card base
      // Ela será encontrada dentro do bloco da teoria correspondente (baseClassNum + 90)
      // ou cairá no array de Extras no final do processamento.
      if (classNum && classNum > 90) {
        return
      }

      if (classNum && classNum > 0) {
        // 1. Card Teoria (Sábado)
        // Para instrusores: tenta buscar no allAttendance. Para alunos: usa o item.attendance do próprio history.
        let theoryAtt = allAttendance.find(
          (a) =>
            a.classNumber === classNum &&
            new Date(a.date).getUTCFullYear() === planYear,
        )

        // Se for aluno e theoryAtt for nulo (porque allAttendance é vazio para aluno), checamos
        // se o próprio historyItem tem o attendance e é o da teoria.
        // Assumimos que a branch principal do item é a da Teoria se for < 90
        const isSelfTheory = classNum < 90
        
        const realAttendanceId = theoryAtt?.id || (isSelfTheory ? item.attendance?.id : null)

        if (theoryAtt) usedAttendanceIds.add(theoryAtt.id)
        if (item.attendance?.id) usedAttendanceIds.add(item.attendance.id)

        const isEnsaio = item.subject?.includes('Ensaio do GEM')

        cards.push({
          id: `theory-${item.id}`,
          attendanceId: realAttendanceId,
          baseClassNum: classNum,
          labelType: isEnsaio ? 'Ensaio GEM' : 'Teoria',
          date: new Date(planDate),
          status: theoryAtt?.status || (isSelfTheory ? item.attendance?.status : null),
          subject: item.subject,
          page: item.page,
          exercise: item.exercise,
          isPractical: false,
        })

        // 2. Card Prática (Segunda)
        const practiceClassNum = classNum + 90
        // Tenta achar em allAttendance (para INSTRUCTOR)
        const practiceAtt = allAttendance.find(
          (a) =>
            a.classNumber === practiceClassNum &&
            new Date(a.date).getUTCFullYear() === planYear,
        )
        if (practiceAtt) usedAttendanceIds.add(practiceAtt.id)

        // Tenta achar em studentHistory (para STUDENT)
        // Como o BD devolve histórico, a presença prática de +90 também deve vir no próprio fetchStudentHistory
        // varrendo o studentHistory array onde o classNumber seja classNum + 90
        const practiceHistoryAtt = studentHistory.find(
          (sh) => sh.classNumber === practiceClassNum && new Date(sh.date).getUTCFullYear() === planYear
        )
        if (practiceHistoryAtt?.attendance?.id) usedAttendanceIds.add(practiceHistoryAtt.attendance.id)


        // Calcula a data da segunda-feira (Sábado + 2 dias)
        const practiceDate = new Date(planDate)
        practiceDate.setUTCDate(practiceDate.getUTCDate() + 2)

        const finalPracticeAttId = practiceAtt?.id || practiceHistoryAtt?.attendance?.id || null
        const finalPracticeStatus = practiceAtt?.status || practiceHistoryAtt?.attendance?.status || null

        cards.push({
          id: finalPracticeAttId || `practice-v-${item.id}`,
          attendanceId: finalPracticeAttId,
          baseClassNum: classNum,
          labelType: 'Prática',
          date: practiceDate,
          status: finalPracticeStatus,
          subject: 'Aula Prática',
          isPractical: true,
          isVirtual: !finalPracticeAttId,
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
    // Para ALUNO, iteramos sobre o próprio studentHistory e pegamos items esquecidos.
    // Para INSTRUTOR iteramos em allAttendance.
    const loopArray = role === 'INSTRUCTOR' ? allAttendance : studentHistory
    
    loopArray.forEach((attOrHistory: any) => {
      // Para ALUNO (studentHistory), a presença tá em attOrHistory.attendance
      // Para INSTRUCTOR (allAttendance), a presença tá direto no attOrHistory (é o proprio objeto Attendance)
      const isInstructor = role === 'INSTRUCTOR'
      const attId = isInstructor ? attOrHistory.id : attOrHistory.attendance?.id
      const attClassNum = isInstructor ? attOrHistory.classNumber : attOrHistory.classNumber
      const attDate = isInstructor ? attOrHistory.date : (attOrHistory.attendance?.date || attOrHistory.date)
      const attStatus = isInstructor ? attOrHistory.status : attOrHistory.attendance?.status

      if (attId && !usedAttendanceIds.has(attId)) {
        const isPractical = attClassNum > 90
        const baseClassNum = isPractical
          ? attClassNum - 90
          : attClassNum

        cards.push({
          id: attId,
          attendanceId: attId,
          baseClassNum: baseClassNum > 0 ? baseClassNum : null,
          labelType: isPractical ? 'Prática' : 'Teoria',
          date: new Date(attDate),
          status: attStatus,
          subject: isPractical ? 'Aula Prática' : 'Aula de Teoria',
          isPractical,
          isExtra: true, // Marcador para aulas que não vieram do plano
        })
      }
    })

    // Ordenação final cronológica rigorosa por data
    // Precisamos de limpar cards duplicados de Prática (pois pra aluno a Pratica também vem no studentHistory loop e gera duplicate card isVirtual + isExtra)
    const uniqueCards = cards.reduce((acc, current) => {
      const x = acc.find((item: any) => item.id === current.id || (item.baseClassNum === current.baseClassNum && item.isPractical === current.isPractical));
      if (!x) {
        return acc.concat([current]);
      } else {
        // Se já existe e a versão guardada é "virtual" mas a version nova tem status real, substitui a virtual pela real
        if (x.isVirtual && !current.isVirtual && current.attendanceId) {
          x.id = current.id
          x.attendanceId = current.attendanceId
          x.status = current.status
          x.isVirtual = false
        }
        return acc;
      }
    }, []);

    return uniqueCards.sort((a: any, b: any) => a.date.getTime() - b.date.getTime())
  }, [studentHistory, students, studentIdFromParams, role])

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
          if (role === 'INSTRUCTOR') {
            fetchStudentsAttendance(token)
          }
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
          if (role === 'INSTRUCTOR') {
            fetchStudentsAttendance(token)
          }
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

                  {role === 'INSTRUCTOR' && item.status && (
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
                              ? 'bg-green-500 hover:bg-green-600 border-none'
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
                              ? 'bg-red-500 hover:bg-red-600 border-none'
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
