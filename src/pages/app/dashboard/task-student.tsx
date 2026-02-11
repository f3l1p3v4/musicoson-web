import { useEffect } from 'react'
import { ClipboardList } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTaskStore } from '@/store/taskStore'
import { useAuthStore } from '@/store/authStore'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
  }, [token, role, id, tasks.length, fetchTasksByInstructor, fetchTasksByStudent])

  // Calcula a quantidade de pendentes
  const pendingTasks = tasks.filter((task) => task.status === 'PENDING').length

  return (
    <NavLink className="flex w-full" to="/tasks">
      <Card className="flex w-full flex-col hover:bg-accent/50 transition-colors">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold sm:text-base">
            Tarefas
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex flex-col items-start justify-center pt-2">
          <div className="rounded-full bg-primary/10 p-2 mb-3">
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