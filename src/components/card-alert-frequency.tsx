import { AlertTriangle } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function CardAlertFrequency() {
  return (
    <NavLink className="flex w-full gap-2" to="/alert-frequency">
      <div className="flex w-full border-spacing-1 items-center space-x-4 rounded-xl border border-red-500 bg-red-100 p-6">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <div className="flex-1 space-y-1">
          <p className="text-md font-bold leading-none text-red-500">
            Alunos em atenção
          </p>
          <p className="text-sm text-muted-foreground text-red-500">
            Alunos que estão precisando de atenção
          </p>
        </div>
      </div>
    </NavLink>
  )
}
