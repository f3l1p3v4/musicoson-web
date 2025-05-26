'use client'

import { TableCell, TableRow } from '@/components/ui/table'

interface ClassPlanTableRowProps {
  plan: {
    id: string
    date: string
    subject: string
    page: string
    exercise: string
  }
}

export function ClassPlanTableRow({ plan }: ClassPlanTableRowProps) {
  return (
    <TableRow>
      <TableCell>{new Date(plan.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
      <TableCell>{plan.subject}</TableCell>
      <TableCell>{plan.page}</TableCell>
      <TableCell>{plan.exercise}</TableCell>
    </TableRow>
  )
}
