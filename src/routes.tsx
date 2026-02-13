import { createBrowserRouter, Navigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuthStore } from '@/store/authStore'
import { isTokenExpired } from '@/utils/auth'

// Layouts
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
// Not Found
import { NotFound } from './pages/404'
import { AlertFrequency } from './pages/app/alert-frequency'
// Call List
import { CallList } from './pages/app/call-list'
// Class Plan
import { ClassPlan } from './pages/app/class-plan'
// Dashboard
import { Dashboard } from './pages/app/dashboard'
// Frequency
import { Frequency } from './pages/app/frequency'
import { FrequencyStudent } from './pages/app/frequency-student'
// Perfil
import { Perfil } from './pages/app/perfil'
import { PerfilEdit } from './pages/app/perfil-edit'
// Program Minimum
import { ProgramMinimum } from './pages/app/program-minimum'
// Tasks
import { Tasks } from './pages/app/tasks'
// Users
import { Users } from './pages/app/users'
// Warnings
import { Warnings } from './pages/app/warnings'
// Auth
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

type UserRole = 'INSTRUCTOR' | 'STUDENT' | 'ADMIN'

interface ProtectedRouteProps {
  children: JSX.Element
  roleRequired?: UserRole
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roleRequired,
}) => {
  const { token, role } = useAuthStore()
  if (!token || isTokenExpired(token)) {
    toast.warning('Sessão expirada. Faça login novamente.')
    return <Navigate to="/sign-in" replace />
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />
  }

  return children
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      {
        path: '/users',
        element: (
          <ProtectedRoute roleRequired="INSTRUCTOR">
            <Users />
          </ProtectedRoute>
        ),
      },
      { path: '/perfil', element: <Perfil /> },
      { path: '/perfil-edit', element: <PerfilEdit /> },
      { path: '/program-minimum', element: <ProgramMinimum /> },
      { path: '/class-plan', element: <ClassPlan /> },
      { path: '/tasks', element: <Tasks /> },
      { path: '/call-list', element: <CallList /> },
      { path: '/warnings', element: <Warnings /> },
      { path: '/alert-frequency', element: <AlertFrequency /> },
      { path: '/frequency/:studentId', element: <Frequency /> },
      { path: '/frequency-student', element: <FrequencyStudent /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
])
