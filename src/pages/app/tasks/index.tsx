'use client'

import { format, getYear } from 'date-fns'
import { Loader2, PlusIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuthStore } from '@/store/authStore'
import { useTaskStore } from '@/store/taskStore'
import { userStore } from '@/store/userStore'

import { TaskCreate } from './task-create'
import { StatusTask } from './task-status'

type Status = 'ALL' | 'PENDING' | 'COMPLETED'

export function Tasks() {
  const { tasks, fetchTasksByInstructor, fetchTasksByStudent, isLoading } =
    useTaskStore()
  const { token, role, id } = useAuthStore()
  const { users, fetchUsers } = userStore()

  const [statusFilter, setStatusFilter] = useState<Status>('ALL')
  const currentYear = new Date().getFullYear().toString()

  useEffect(() => {
    if (token) {
      fetchUsers(token)
    }
    if (token && role && id) {
      if (role === 'INSTRUCTOR') {
        fetchTasksByInstructor(token, id)
      } else {
        fetchTasksByStudent(token, id)
      }
    }
  }, [token, role, id, fetchTasksByInstructor, fetchTasksByStudent, fetchUsers])

  const userMap = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        acc[user.id] = user.name
        return acc
      },
      {} as Record<string, string>,
    )
  }, [users])

  // --- NOVA FUNÇÃO DE PARSER ---
  const parseTaskTitle = (title: string) => {
    const pageRegex = /(?:Pg|Pág)[:\s]+([\d,\s]+)/gi
    const lessonRegex = /(?:Lição|L)[:\s]+([\d,\s]+)/gi
    const hymnRegex = /(?:Hinos|H)[:\s]+([\d,\s]+)/gi

    const extract = (regex: RegExp) => {
      const matches = [...title.matchAll(regex)]
      return matches
        .flatMap((m) => m[1].split(',').map((n) => n.trim()))
        .filter((n) => n !== '')
    }

    const pages = extract(pageRegex)
    const lessons = extract(lessonRegex)
    const hymns = extract(hymnRegex)

    const cleanTitle = title.split(/[|(|]/)[0].trim()

    return { cleanTitle, pages, lessons, hymns }
  }

  const formatArrayIntoString = (arr: string[]): string => {
    if (arr.length === 0) {
      return ''
    }
    if (arr.length === 1) {
      return arr[0]
    }
    if (arr.length === 2) {
      return `${arr[0]} e ${arr[1]}`
    }
    return `${arr.slice(0, -1).join(', ')} e ${arr[arr.length - 1]}`
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskYear = getYear(new Date(task.createdAt)).toString()
      const matchesStatus =
        statusFilter === 'ALL' || task.status === statusFilter
      const matchesYear = taskYear === currentYear

      return matchesStatus && matchesYear
    })
  }, [tasks, statusFilter, currentYear])

  return (
    <>
      <section className="grid gap-4 ">
        <h1 className="mb-2 text-left text-3xl font-bold">Tarefas</h1>

        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-semibold uppercase text-muted-foreground">
            Filtrar Status
          </label>
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:items-center">
            <Select
              value={statusFilter}
              onValueChange={(v: Status) => setStatusFilter(v)}
            >
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
          <div className="flex flex-col items-center justify-center gap-2 p-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Carregando tarefas...
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredTasks.length === 0 && (
              <div className="rounded-2xl border-2 border-dashed py-20 text-center">
                <p className="text-muted-foreground">
                  Nenhuma tarefa encontrada para os filtros selecionados.
                </p>
              </div>
            )}

            {filteredTasks.map((task) => {
              const { cleanTitle, pages, lessons, hymns } = parseTaskTitle(
                task.title,
              )

              return (
                <Dialog key={task.id}>
                  <DialogTrigger asChild>
                    <Card className="w-full cursor-pointer shadow-sm">
                      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-black uppercase tracking-tighter text-primary">
                          {task.category}
                        </CardTitle>
                        {role === 'INSTRUCTOR' && (
                          <>
                            {task.group ? (
                              <Badge
                                variant="outline"
                                className="text-[9px] font-bold"
                              >
                                {task.group}
                              </Badge>
                            ) : (
                              task.studentId && (
                                <Badge
                                  variant="outline"
                                  className="text-[9px] font-bold"
                                >
                                  {userMap[task.studentId] || '...'}
                                </Badge>
                              )
                            )}
                          </>
                        )}
                        {role === 'STUDENT' && (
                          <Badge
                            variant="outline"
                            className="text-[9px] font-bold"
                          >
                            {userMap[task.instructorId] || '...'}
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent className="grid gap-2">
                        {/* Exibe o Título Limpo */}
                        <p className="text-sm font-semibold">{cleanTitle}</p>

                        {/* Badges Dinâmicos (Páginas, Lições e Hinos) */}
                        <div className="mt-0.5 flex flex-wrap gap-1">
                          {pages.length > 0 && (
                            <Badge
                              variant="secondary"
                              className="h-5 border-none bg-blue-100 text-[10px] text-blue-700 hover:bg-blue-100"
                            >
                              Página {formatArrayIntoString(pages)}
                            </Badge>
                          )}
                          {lessons.length > 0 && (
                            <Badge
                              variant="secondary"
                              className="h-5 border-none bg-blue-100 text-[10px] text-blue-700 hover:bg-blue-100"
                            >
                              Lição {formatArrayIntoString(lessons)}
                            </Badge>
                          )}
                          {hymns.length > 0 && (
                            <Badge
                              variant="secondary"
                              className="h-5 border-none bg-blue-100 text-[10px] text-blue-700 hover:bg-blue-100"
                            >
                              Hino {formatArrayIntoString(hymns)}
                            </Badge>
                          )}
                        </div>

                        {task.observation && (
                          <p className="line-clamp-1 text-xs italic text-muted-foreground">
                            &quot;{task.observation}&quot;
                          </p>
                        )}

                        <div className="mt-2 flex items-center justify-between border-t pt-2 text-[10px] text-muted-foreground">
                          <div className="flex gap-3">
                            <span>
                              Criado:{' '}
                              {format(new Date(task.createdAt), 'dd/MM/yy')}
                            </span>
                            {task.delivery_date && (
                              <span className="font-bold text-orange-600">
                                Entrega:{' '}
                                {format(
                                  new Date(task.delivery_date),
                                  'dd/MM/yy',
                                )}
                              </span>
                            )}
                          </div>
                          <Badge
                            variant={
                              task.status === 'COMPLETED'
                                ? 'default'
                                : 'destructive'
                            }
                            className={
                              task.status === 'COMPLETED'
                                ? 'bg-green-500 hover:bg-green-600'
                                : ''
                            }
                          >
                            {task.status === 'COMPLETED' ? 'FEITO' : 'PENDENTE'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  {role === 'INSTRUCTOR' && <StatusTask task={task} />}
                </Dialog>
              )
            })}
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
