import { create } from 'zustand'

import { api } from '@/lib/api'

import { userStore } from './userStore'

export type TaskStatus = 'PENDING' | 'COMPLETED'
export type TaskCategory = 'MSA' | 'METODO' | 'HINOS'
export type Group = 'GROUP_01' | 'GROUP_02' | 'GROUP_03' | 'GROUP_04'

export interface Task {
  id: string
  title: string
  description: string
  observation?: string
  delivery_date?: string | Date
  status: TaskStatus
  category: TaskCategory
  instructorId: string
  studentId?: string
  group?: Group
  createdAt: string
  updatedAt: string
}

interface CreateTaskInput {
  title: string
  description: string
  observation?: string
  delivery_date?: string
  category: TaskCategory
  studentIds?: string[]
  groups?: Group[]
}

interface TaskStore {
  tasks: Task[]
  isLoading: boolean

  // Actions
  fetchTasks: (token: string) => Promise<void>
  fetchTasksByInstructor: (token: string, instructorId: string) => Promise<void>
  fetchTasksByStudent: (token: string, studentId: string) => Promise<void>
  createTask: (data: CreateTaskInput, token: string) => Promise<boolean>
  updateTaskStatus: (
    id: string,
    status: TaskStatus,
    token: string,
  ) => Promise<boolean>
  updateTask: (
    id: string,
    data: Partial<Task>,
    token: string,
  ) => Promise<boolean>
  deleteTask: (id: string, token: string) => Promise<boolean>
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async (token: string) => {
    set({ isLoading: true })
    try {
      const response = await api.get<Task[]>('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const { users } = userStore.getState()
      const sortedTasks = response.data.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        if (dateA !== dateB) return dateA - dateB

        const nameA = users.find((u) => u.id === a.studentId)?.name || ''
        const nameB = users.find((u) => u.id === b.studentId)?.name || ''
        return nameA.localeCompare(nameB)
      })

      set({ tasks: sortedTasks })
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  fetchTasksByInstructor: async (token: string, instructorId: string) => {
    set({ isLoading: true })
    try {
      const response = await api.get<Task[]>(`/tasks/instructor`, {
        params: { instructorId },
        headers: { Authorization: `Bearer ${token}` },
      })

      const { users } = userStore.getState()
      const sortedTasks = response.data.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        if (dateA !== dateB) return dateA - dateB

        const nameA = users.find((u) => u.id === a.studentId)?.name || ''
        const nameB = users.find((u) => u.id === b.studentId)?.name || ''
        return nameA.localeCompare(nameB)
      })

      set({ tasks: sortedTasks })
    } catch (error) {
      console.error('Error fetching instructor tasks:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  fetchTasksByStudent: async (token: string, studentId: string) => {
    set({ isLoading: true })
    try {
      const response = await api.get<Task[]>(`/tasks/student`, {
        params: { studentId },
        headers: { Authorization: `Bearer ${token}` },
      })

      const { users } = userStore.getState()
      const sortedTasks = response.data.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        if (dateA !== dateB) return dateA - dateB

        const nameA = users.find((u) => u.id === a.studentId)?.name || ''
        const nameB = users.find((u) => u.id === b.studentId)?.name || ''
        return nameA.localeCompare(nameB)
      })

      set({ tasks: sortedTasks })
    } catch (error) {
      console.error('Error fetching student tasks:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  createTask: async (data: CreateTaskInput, token: string) => {
    try {
      const { users } = userStore.getState()
      const allStudentIds = new Set<string>()

      // 1. Adicionar alunos individuais
      if (data.studentIds) {
        data.studentIds.forEach((id) => allStudentIds.add(id))
      }

      // 2. Adicionar alunos dos grupos selecionados
      if (data.groups && data.groups.length > 0) {
        data.groups.forEach((groupName) => {
          const studentsInGroup = users.filter(
            (user) => user.role === 'STUDENT' && user.group === groupName,
          )
          studentsInGroup.forEach((student) => allStudentIds.add(student.id))
        })
      }

      if (allStudentIds.size === 0) {
        console.warn('No students selected for task creation')
        return false
      }

      const taskPromises = Array.from(allStudentIds).map((studentId) => {
        const { studentIds, groups, ...rest } = data
        return api.post<Task>(
          '/tasks',
          { ...rest, studentId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
      })

      const responses = await Promise.all(taskPromises)
      const successfulTasks = responses
        .filter((res) => res.status === 201)
        .map((res) => res.data)

      if (successfulTasks.length > 0) {
        set((state) => {
          const allTasks = [...successfulTasks, ...state.tasks]
          const { users } = userStore.getState()

          const sortedTasks = allTasks.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime()
            const dateB = new Date(b.createdAt).getTime()
            if (dateA !== dateB) return dateA - dateB

            const nameA = users.find((u) => u.id === a.studentId)?.name || ''
            const nameB = users.find((u) => u.id === b.studentId)?.name || ''
            return nameA.localeCompare(nameB)
          })

          return { tasks: sortedTasks }
        })
        return true
      }

      return false
    } catch (error) {
      console.error('Error creating task:', error)
      return false
    }
  },

  updateTaskStatus: async (id: string, status: TaskStatus, token: string) => {
    try {
      const response = await api.put(
        `/tasks/${id}/status`,
        { status },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.status === 200) {
        // Atualiza apenas a tarefa específica na lista local
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        }))
        return true
      }
      return false
    } catch (error) {
      console.error('Error updating task status:', error)
      return false
    }
  },

  updateTask: async (id, data, token) => {
    try {
      const response = await api.put(`/tasks/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t)),
        }))
        return true
      }
      return false
    } catch (error) {
      console.error('Error updating task:', error)
      return false
    }
  },

  deleteTask: async (id: string, token: string) => {
    try {
      const response = await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 204) {
        // Remove a tarefa da lista local
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        }))
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting task:', error)
      return false
    }
  },
}))
