'use  client'

import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// import { ClassPlanTableFilters } from './class-plan-table-filter'
import { ClassPlanTableRow } from './class-plan-table-row'

export function ClassPlanCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-2xl mb-6">Grupo 01</CardTitle>
        {/* <CardDescription className="text-black">
          <ClassPlanTableFilters />
        </CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Assunto</TableHead>
              <TableHead>Pág</TableHead>
              <TableHead>Ex</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => {
              return <ClassPlanTableRow key={i} />
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
