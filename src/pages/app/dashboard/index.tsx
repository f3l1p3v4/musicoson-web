// import { CardAlertFrequency } from '@/components/card-alert-frequency'

import { Call } from './call'
import { Frequency } from './frequency'
// import { Task } from './task'
// import { TaskStudent } from './task-student'

export function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-4">
        {/* <CardAlertFrequency /> */}
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          {/* <Task /> */}
          <Call />
          {/* <TaskStudent /> */}
          <Frequency />
        </div>
      </div>
    </>
  )
}
