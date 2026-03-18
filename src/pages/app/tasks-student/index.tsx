'use client'

import { PlusIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

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

import { TaskCreate } from '../tasks/task-create'

type FilterType = 'PENDING' | 'HISTORY' | 'ALL'

export function TasksStudent() {
  const { users, fetchUsers } = userStore()
  const { tasks, fetchTasksByInstructor } = useTaskStore()
  const { token, id, role } = useAuthStore()

  const [filter, setFilter] = useState<FilterType>('PENDING')
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      fetchUsers(token)
      if (id) {
        fetchTasksByInstructor(token, id)
      }
    }
  }, [fetchUsers, fetchTasksByInstructor, token, id])

  const students = useMemo(() => {
    return users.filter((u) => {
      if (u.role !== 'STUDENT') return false

      const studentTasks = tasks.filter((task) => task.studentId === u.id)

      if (filter === 'ALL') {
        return true
      }
      if (filter === 'HISTORY') {
        return studentTasks.length > 0
      }
      // PENDING
      return studentTasks.some((task) => task.status === 'PENDING')
    })
  }, [users, tasks, filter])

  const groupMap: Record<string, string> = {
    GROUP_01: '01',
    GROUP_02: '02',
    GROUP_03: '03',
    GROUP_04: '04',
  }

  const getBadgeColor = (pendingTasks: number) => {
    if (pendingTasks === 0) return 'bg-green-500 hover:bg-green-600'
    if (pendingTasks >= 1 && pendingTasks <= 3) return 'bg-orange-500 hover:bg-orange-600'
    return 'bg-red-500 hover:bg-red-600'
  }

  const getTasksText = (pendingTasks: number) => {
    if (pendingTasks === 0) return 'Nenhuma tarefa pendente'
    if (pendingTasks === 1) return '1 Tarefa pendente'
    return `${pendingTasks} Tarefas pendentes`
  }

  return (
    <>
      <section className="grid gap-2">
        <button
          onClick={() => navigate(-1)}
          className="hover:pointer mb-2 w-max rounded py-2 text-[14px] text-slate-600 transition-colors hover:text-black"
        >
          ← Voltar
        </button>
        <h1 className="mb-6 text-center text-xl font-bold xs:text-3xl">
          Tarefas por Aluno
        </h1>

        <div className="mb-4 flex flex-col gap-3">
          <label className="text-[10px] font-semibold uppercase text-muted-foreground">
            Filtrar Alunos
          </label>
          <div className="grid grid-cols-1 gap-2 md:flex md:flex-wrap md:items-center">
            <Select
              value={filter}
              onValueChange={(v: FilterType) => setFilter(v)}
            >
              <SelectTrigger className="h-8 w-full md:w-[220px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Com tarefas pendentes</SelectItem>
                <SelectItem value="HISTORY">Com histórico de tarefas</SelectItem>
                <SelectItem value="ALL">Todos os alunos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {students && students.length > 0 ? (
          students.map((student) => {
            const pendingTasks = tasks.filter(
              (task) =>
                task.studentId === student.id && task.status === 'PENDING'
            ).length

            return (
              <NavLink
                className="flex w-full"
                to={`/tasks/${student.id}`}
                key={student.id}
              >
                <Card className="w-full cursor-pointer transition-all hover:shadow-md">
                  <CardHeader className="flex-row items-center justify-between space-y-0 xs:pb-0">
                    <CardTitle className="text-sm font-medium">
                      {student.group && student.group in groupMap
                        ? `Grupo ${groupMap[student.group]}`
                        : 'Grupo Desconhecido'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 xs:pt-2">
                    <p className="text-md mt-1 font-bold">{student.name}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{student.instrument}</p>
                    <div className="mt-2">
                      <Badge
                        className={`border-none text-white ${getBadgeColor(pendingTasks)}`}
                      >
                        {getTasksText(pendingTasks)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </NavLink>
            )
          })
        ) : (
          <p className="text-center text-gray-500">Nenhum aluno encontrado para esse filtro.</p>
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
