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
  studentId?: string
  group?: Group
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
      set({ tasks: response.data })
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
      set({ tasks: response.data })
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
      set({ tasks: response.data })
    } catch (error) {
      console.error('Error fetching student tasks:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  createTask: async (data: CreateTaskInput, token: string) => {
    try {
      if (data.group) {
        const { users } = userStore.getState()
        const studentsInGroup = users.filter(
          (user) => user.role === 'STUDENT' && user.group === data.group,
        )

        if (studentsInGroup.length === 0) {
          console.warn(`No students found in group ${data.group}`)
          return false
        }

        const taskPromises = studentsInGroup.map((student) => {
          const taskData = {
            ...data,
            studentId: student.id,
            group: undefined,
          }
          return api.post('/tasks', taskData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
        })

        const responses = await Promise.all(taskPromises)
        const allSuccess = responses.every((res) => res.status === 201)

        if (allSuccess) {
          return true
        }
        return false
      } else {
        const response = await api.post('/tasks', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 201) {
          set((state) => ({ tasks: [...state.tasks, response.data] }))
          return true
        }
        return false
      }
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
