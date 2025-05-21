// import { CardAlertFrequency } from '@/components/card-alert-frequency'
import { useAuthStore } from '@/store/authStore'

import { Call } from './call'
import { Frequency } from './frequency'
import { FrequencyStudent } from './frequency-student'
// import { Task } from './task'
// import { TaskStudent } from './task-student'

export function Dashboard() {
  const { role } = useAuthStore()

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* role === 'INSTRUCTOR' && <CardAlertFrequency /> */}
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          {/* <Task /> */}
          {role === 'INSTRUCTOR' && <Call />}
          {role === 'INSTRUCTOR' && <FrequencyStudent />}
          {/* <TaskStudent /> */}
          {role === 'STUDENT' && <Frequency />}
        </div>
      </div>
    </>
  )
}
