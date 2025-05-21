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
    // Se já tem presença marcada e o status é diferente, atualiza
    if (student.attendanceId && student.currentStatus !== status) {
      const response = await updateAttendance({
        attendanceId: student.id,
        status,
      })

      if (response.success) {
        toast.success('Presença atualizada com sucesso')
        onSuccessClose()
      } else {
        toast.error(response.responseData.message)
      }
      return
    }

    // Se não tem presença marcada, registra
    const response = await markAttendance({
      date: new Date().toISOString(),
      studentId: student.id,
      instructorId,
      status,
    })

    if (response.success && response.responseStatus === 201) {
      toast.success(response.responseData.message)
      onSuccessClose()
    } else if (response.success && response.responseStatus === 200) {
      toast.error(response.responseData.message)
      onSuccessClose()
    } else {
      toast.error(response.responseData.message)
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
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-between gap-2">
        <Button
          className="h-12 w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          variant="outline"
          onClick={() => handleAttendance('ABSENT')}
        >
          Ausente
        </Button>
        <Button
          className="h-12 w-full bg-green-500 hover:bg-green-500"
          onClick={() => handleAttendance('PRESENT')}
        >
          Presente
        </Button>
      </div>
    </DialogContent>
  )
}
