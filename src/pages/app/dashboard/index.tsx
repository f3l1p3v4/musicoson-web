// import { CardAlertFrequency } from '@/components/card-alert-frequency'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

import { Call } from './call'
import { Frequency } from './frequency'
import { FrequencyStudent } from './frequency-student'
import { useAttendanceStore } from '@/store/callListStore'
// import { Task } from './task'
// import { TaskStudent } from './task-student'

export function Dashboard() {
  const { userName, role, token } = useAuthStore()
  const { students, fetchStudentsAttendance } = useAttendanceStore()

  useEffect(() => {
    if (token) {
      fetchStudentsAttendance(token)
    }
  }, [fetchStudentsAttendance, token])

  const nameParts = userName?.split(' ') || []
  const formattedName =
  nameParts.length > 1
    ? `${capitalize(nameParts[0])} ${capitalize(nameParts[1])}`
    : capitalize(nameParts[0]) || 'Usuário'

    function capitalize(str?: string) {
      if (!str) return ''
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }

    const roleLabel = (() => {
    if (role === 'INSTRUCTOR' && formattedName.toLowerCase().startsWith('carlos')) {
      return 'Encarregado'
    }
    
    if (role === 'INSTRUCTOR') {
      return 'Instrutor'
    }

    if (role === 'STUDENT') {
      return 'Aluno'
    }

    return role
  })()

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className='font-semibold text-sm'>
            Olá, <span className='text-primary'>{formattedName}</span>
          </span>
          <span className="text-xs font-normal text-muted-foreground">{roleLabel}</span>
        </div>
        {/* role === 'INSTRUCTOR' && <CardAlertFrequency /> */}
        <h1 className="text-lg xs:text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* <Task /> */}
          {role === 'INSTRUCTOR' && <Call />}
          {role === 'INSTRUCTOR' && <FrequencyStudent qtdStudents={students?.length ?? 0} />}
          {/* <TaskStudent /> */}
          {role === 'STUDENT' && <Frequency />}
        </div>
      </div>
    </>
  )
}
