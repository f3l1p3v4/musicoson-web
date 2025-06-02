'use client'

import { Card, CardContent } from '@/components/ui/card'
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
    method: string
    classNumber: number
    semester: string
  }[]
}

export function ClassPlanCard({ plans }: ClassPlanCardProps) {
  return (
    <Card>
      <CardContent className="space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-xs xs:text-sm'>Data</TableHead>
              <TableHead className='text-xs xs:text-sm'>Assunto</TableHead>
              <TableHead className='text-xs xs:text-sm'>Módulos</TableHead>
              <TableHead className='text-xs xs:text-sm'>Semestre</TableHead>
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
