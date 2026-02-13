import { ListChecks } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useTaskStore } from '@/store/taskStore'

export function Task() {
  const { tasks, fetchTasksByInstructor, fetchTasksByStudent } = useTaskStore()
  const { token, role, id } = useAuthStore()

  useEffect(() => {
    if (token && role && id) {
      if (role === 'INSTRUCTOR') {
        fetchTasksByInstructor(token, id)
      } else {
        fetchTasksByStudent(token, id)
      }
    }
  }, [token, role, id, fetchTasksByInstructor, fetchTasksByStudent])

  const pendingTasks = tasks.filter((task) => task.status === 'PENDING').length

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const hasOldPendingTask = tasks.some(
    (task) =>
      task.status === 'PENDING' && new Date(task.createdAt) < sevenDaysAgo,
  )

  return (
    <NavLink className="flex w-full" to="/tasks">
      <Card className="flex w-full flex-col transition-colors hover:bg-accent/50">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold sm:text-base">
            Tarefas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start justify-center pt-2">
          <div
            className={`mb-3 rounded-full p-2 ${hasOldPendingTask ? 'bg-red-100' : 'bg-gray-100'}`}
          >
            <ListChecks
              className={`h-8 w-8 sm:h-10 sm:w-10 ${hasOldPendingTask ? 'text-red-500' : 'text-black'}`}
            />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              {pendingTasks} em aberto
            </p>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  )
}
