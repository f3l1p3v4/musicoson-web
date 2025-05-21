'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ClassPlanTableRow } from './class-plan-table-row'

interface ClassPlanCardProps {
  plans: {
    id: string
    date: string
    subject: string
    page: string
    exercise: string
  }[]
}

export function ClassPlanCard({ plans }: ClassPlanCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-2xl mb-6">Plano de Aula</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Assunto</TableHead>
              <TableHead>Pág</TableHead>
              <TableHead>Exercício</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <ClassPlanTableRow key={plan.id} plan={plan} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
