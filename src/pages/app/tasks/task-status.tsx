import { useTaskStore, Task } from '@/store/taskStore'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { CheckCircle2, Circle } from 'lucide-react'

interface StatusTaskProps {
  task: Task
}

export function StatusTask({ task }: StatusTaskProps) {
  const { updateTaskStatus, isLoading } = useTaskStore()
  const { token } = useAuthStore()

  const handleUpdate = async (newStatus: 'PENDING' | 'COMPLETED') => {
    if (token) {
      await updateTaskStatus(task.id, newStatus, token)
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="flex flex-col items-center gap-2">
        <DialogTitle className="text-xl font-bold text-primary uppercase">
          {task.category}
        </DialogTitle>
        <DialogDescription className="text-center font-medium text-foreground">
          {task.title}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button
          onClick={() => handleUpdate('PENDING')}
          disabled={isLoading}
          variant={task.status === 'PENDING' ? 'default' : 'outline'}
          className={`h-16 flex flex-col gap-1 ${
            task.status === 'PENDING' 
              ? 'bg-red-500 hover:bg-red-600 border-none' 
              : 'border-red-500 text-red-500 hover:bg-red-50'
          }`}
        >
          <Circle className="h-5 w-5" />
          <span>Pendente</span>
        </Button>

        <Button
          onClick={() => handleUpdate('COMPLETED')}
          disabled={isLoading}
          variant={task.status === 'COMPLETED' ? 'default' : 'outline'}
          className={`h-16 flex flex-col gap-1 ${
            task.status === 'COMPLETED' 
              ? 'bg-green-600 hover:bg-green-700 border-none' 
              : 'border-green-500 text-green-500 hover:bg-green-50'
          }`}
        >
          <CheckCircle2 className="h-5 w-5" />
          <span>Concluído</span>
        </Button>
      </div>
    </DialogContent>
  )
}