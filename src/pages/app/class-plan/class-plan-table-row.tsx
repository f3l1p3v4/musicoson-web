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
      <TableCell>{new Date(plan.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
      <TableCell>Aula {plan.classNumber} - {plan.subject}</TableCell>
      <TableCell>{plan.method}</TableCell>
      <TableCell>{plan.semester}</TableCell>
    </TableRow>
  )
}
