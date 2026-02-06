'use client'

import { useEffect, useState, useMemo } from 'react'
import { PlusIcon, Loader2 } from 'lucide-react'
import { format, getYear } from 'date-fns'

import { useTaskStore } from '@/store/taskStore'
import { useAuthStore } from '@/store/authStore' 

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'

import { TaskCreate } from './task-create'
import { StatusTask } from './task-status'

export function Tasks() {
  const { tasks, fetchTasksByInstructor, fetchTasksByStudent, isLoading } = useTaskStore()
  const { token, role, id } = useAuthStore()

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL')
  const currentYear = new Date().getFullYear().toString()

  useEffect(() => {
    if (token && role && id) {
      if (role === 'INSTRUCTOR') {
        fetchTasksByInstructor(token, id)
      } else {
        fetchTasksByStudent(token, id)
      }
    }
  }, [token, role, fetchTasksByInstructor, fetchTasksByStudent])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskYear = getYear(new Date(task.createdAt)).toString()
      const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter
      const matchesYear = taskYear === currentYear

      return matchesStatus && matchesYear
    })
  }, [tasks, statusFilter, currentYear])

  return (
    <>
      <section className="grid gap-4 p-4">
        <h1 className="mb-2 text-left text-3xl font-bold">Tarefas</h1>
        
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Filtrar Status</label>
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:items-center">
            <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
              <SelectTrigger className="h-8 w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todas as tarefas</SelectItem>
                <SelectItem value="PENDING">Pendentes</SelectItem>
                <SelectItem value="COMPLETED">Concluídas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-2">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Carregando tarefas...</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredTasks.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed rounded-2xl">
                <p className="text-muted-foreground">Nenhuma tarefa encontrada para os filtros selecionados.</p>
              </div>
            )}

            {filteredTasks.map((task) => (
              <Dialog key={task.id}>
                <DialogTrigger asChild>
                  <Card className="w-full cursor-pointer shadow-sm">
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-black uppercase tracking-tighter text-primary">
                        {task.category}
                      </CardTitle>
                      {task.group && <Badge variant="outline" className="text-[9px] font-bold">{task.group}</Badge>}
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <p className="text-sm font-semibold">{task.title}</p>
                      {task.observation && (
                        <p className="text-xs text-muted-foreground line-clamp-1 italic">
                          "{task.observation}"
                        </p>
                      )}
                      
                      <div className="flex justify-between items-center mt-2 pt-2 border-t text-[10px] text-muted-foreground">
                         <div className="flex gap-3">
                            <span>Criado: {format(new Date(task.createdAt), 'dd/MM/yy')}</span>
                            {task.delivery_date && (
                              <span className="font-bold text-orange-600">
                                Entrega: {format(new Date(task.delivery_date), 'dd/MM/yy')}
                              </span>
                            )}
                         </div>
                          <Badge variant={task.status === 'COMPLETED' ? 'default' : 'destructive'} 
                            className={task.status === 'COMPLETED' ? 'bg-green-500 hover:bg-green-600' : ''}>
                            {task.status === 'COMPLETED' ? 'FEITO' : 'PENDENTE'}
                          </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                {role === 'INSTRUCTOR' && (
                  <StatusTask task={task} />
              )}
              </Dialog>
            ))}
          </div>
        )}
      </section>

      {role === 'INSTRUCTOR' && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="fixed bottom-14 right-6 z-50 bg-primary text-white shadow-lg hover:bg-primary hover:text-white"
              size="icon"
            >
              <PlusIcon className="h-8 w-8" />
              <span className="sr-only">Criar Novo</span>
            </Button>
          </DialogTrigger>
          <TaskCreate />
        </Dialog>
      )}
    </>
  )
}