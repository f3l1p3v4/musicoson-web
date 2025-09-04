import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme/theme-provider'

import { router } from './routes'

import './index.css'

export function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="light" storageKey="musicoson-theme">
        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}
