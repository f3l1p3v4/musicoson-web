import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuthStore } from '@/store/authStore'
import { Task, useTaskStore } from '@/store/taskStore'

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
        <DialogTitle className="text-xl font-bold uppercase text-primary">
          {task.category}
        </DialogTitle>
        <DialogDescription className="text-center font-medium text-foreground">
          {task.title}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Button
          onClick={() => handleUpdate('PENDING')}
          disabled={isLoading}
          variant={task.status === 'PENDING' ? 'default' : 'outline'}
          className={`h-12 w-full ${
            task.status === 'PENDING'
              ? 'border-none bg-red-500 hover:bg-red-600'
              : 'border-red-500 text-red-500 hover:bg-red-50'
          }`}
        >
          <span>Pendente</span>
        </Button>

        <Button
          onClick={() => handleUpdate('COMPLETED')}
          disabled={isLoading}
          variant={task.status === 'COMPLETED' ? 'default' : 'outline'}
          className={`h-12 w-full ${
            task.status === 'COMPLETED'
              ? 'border-none bg-green-600 hover:bg-green-700'
              : 'border-green-500 text-green-500 hover:bg-green-50'
          }`}
        >
          <span>Concluído</span>
        </Button>
      </div>
    </DialogContent>
  )
}
