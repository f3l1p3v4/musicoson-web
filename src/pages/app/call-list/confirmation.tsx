import { DialogDescription } from '@radix-ui/react-dialog'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ConfirmationProps {
  student: {
    id: string
    name: string
    attendanceId?: string
    currentStatus?: string
  }
  instructorId: string
  token: string
  markAttendance: (data: {
    date: string
    studentId: string
    instructorId: string
    status: string
  }) => Promise<{
    success: boolean
    responseData: { message: string; attendanceId?: string }
    responseStatus: number
  }>
  updateAttendance: (data: {
    attendanceId: string
    status: string
  }) => Promise<{
    success: boolean
    responseData: { message: string }
    responseStatus: number
  }>
  onSuccessClose: () => void
}

export function Confirmation({
  student,
  instructorId,
  markAttendance,
  updateAttendance,
  onSuccessClose,
}: ConfirmationProps) {
  async function handleAttendance(status: string) {
    // Se o instrutor clicar no status que já é o atual, apenas fecha o modal
    if (student.currentStatus === status) {
      onSuccessClose()
      return
    }

    if (student.attendanceId) {
      // Editar presença existente de hoje
      const response = await updateAttendance({
        attendanceId: student.attendanceId,
        status,
      })

      if (response.success) {
        toast.success("Presença atualizada com sucesso!")
        onSuccessClose()
      } else {
        toast.error(response.responseData.message)
      }
    } else {
      // Criar nova presença (fluxo normal da chamada)
      const response = await markAttendance({
        date: new Date().toISOString(),
        studentId: student.id,
        instructorId,
        status,
      })

      if (response.success) {
        toast.success(response.responseData.message)
        onSuccessClose()
      } else {
        toast.error(response.responseData.message)
      }
    }
  }

  return (
    <DialogContent className="pa-2">
      <DialogHeader className="grid w-full justify-center">
        <DialogTitle className="text-center">Aluno: {student.name}</DialogTitle>
        <DialogDescription className="text-center">
          Dia{' '}
          {new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          })}
          {student.attendanceId && " (Editar Registro)"}
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-between gap-2">
        <Button
          className={`h-12 w-full bg-red-500 hover:bg-red-600 text-white hover:text-white ${
            student.currentStatus === 'ABSENT' ? 'ring-2 ring-offset-2 ring-red-400' : ''
          }`}
          variant="outline"
          onClick={() => handleAttendance('ABSENT')}
        >
          Ausente
        </Button>
        <Button
          className={`h-12 w-full bg-green-500 hover:bg-green-600 ${
            student.currentStatus === 'PRESENT' ? 'ring-2 ring-offset-2 ring-green-400' : ''
          }`}
          onClick={() => handleAttendance('PRESENT')}
        >
          Presente
        </Button>
      </div>
    </DialogContent>
  )
}