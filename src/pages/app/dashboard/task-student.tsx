import { ClipboardList } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useTaskStore } from '@/store/taskStore'

export function TaskStudent() {
  // Acessa os estados de Task e Auth
  const { tasks, fetchTasksByInstructor, fetchTasksByStudent } = useTaskStore()
  const { token, role, id } = useAuthStore()

  // Dispara a busca se as tarefas ainda não estiverem carregadas
  useEffect(() => {
    if (token && role && id && tasks.length === 0) {
      if (role === 'INSTRUCTOR') {
        fetchTasksByInstructor(token, id)
      } else {
        fetchTasksByStudent(token, id)
      }
    }
  }, [
    token,
    role,
    id,
    tasks.length,
    fetchTasksByInstructor,
    fetchTasksByStudent,
  ])

  // Calcula a quantidade de pendentes
  const pendingTasks = tasks.filter((task) => task.status === 'PENDING').length

  return (
    <NavLink className="flex w-full" to="/tasks">
      <Card className="flex w-full flex-col transition-colors hover:bg-accent/50">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold sm:text-base">
            Tarefas
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-start justify-center pt-2">
          <div className="mb-3 rounded-full bg-primary/10 p-2">
            <ClipboardList className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              {pendingTasks} pendentes
            </p>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  )
}
