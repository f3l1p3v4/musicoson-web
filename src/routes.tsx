import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { AlertFrequency } from './pages/app/alert-frequency'
import { CallList } from './pages/app/call-list'
import { ClassPlan } from './pages/app/class-plan'
import { Dashboard } from './pages/app/dashboard'
import { Frequency } from './pages/app/frequency'
import { FrequencyStudent } from './pages/app/frequency-student'
import { Perfil } from './pages/app/perfil'
import { PerfilEdit } from './pages/app/perfil-edit'
import { ProgramMinimum } from './pages/app/program-minimum'
import { Tasks } from './pages/app/tasks'
import { Users } from './pages/app/users'
import { Warnings } from './pages/app/warnings'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/perfil',
        element: <Perfil />,
      },
      {
        path: '/perfil-edit',
        element: <PerfilEdit />,
      },
      {
        path: '/program-minimum',
        element: <ProgramMinimum />,
      },
      {
        path: '/class-plan',
        element: <ClassPlan />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
      },
      {
        path: '/call-list',
        element: <CallList />,
      },
      {
        path: '/warnings',
        element: <Warnings />,
      },
      {
        path: '/alert-frequency',
        element: <AlertFrequency />,
      },
      {
        path: '/frequency',
        element: <Frequency />,
      },
      {
        path: '/frequency-student',
        element: <FrequencyStudent />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
])
