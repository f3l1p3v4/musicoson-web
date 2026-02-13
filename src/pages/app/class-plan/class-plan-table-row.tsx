'use client'

import { TableCell, TableRow } from '@/components/ui/table'

interface ClassPlanTableRowProps {
  plan: {
    id: string
    date: string
    subject: string
    page: string
    exercise: string
    method: string
    classNumber: number
    semester: string
  }
}

export function ClassPlanTableRow({ plan }: ClassPlanTableRowProps) {
  return (
    <TableRow>
      <TableCell className="text-xs xs:text-sm">
        {new Date(plan.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
      </TableCell>
      <TableCell
        className={`text-xs xs:text-sm ${
          plan.subject === 'Ensaio do GEM' || plan.subject === 'Feriado'
            ? 'font-bold text-primary'
            : ''
        }`}
      >
        {plan.subject === 'Ensaio do GEM' || plan.subject === 'Feriado'
          ? plan.subject
          : `Aula ${plan.classNumber} - ${plan.subject}`}
      </TableCell>
      <TableCell className="text-xs xs:text-sm">{plan.method}</TableCell>
      <TableCell className="text-xs xs:text-sm">{plan.semester}</TableCell>
    </TableRow>
  )
}
