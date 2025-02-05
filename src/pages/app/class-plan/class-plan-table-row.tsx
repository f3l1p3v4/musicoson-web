import { TableCell, TableRow } from '@/components/ui/table'

// interface OrderTableRowProps {}

export function ClassPlanTableRow() {
  return (
    <TableRow>
      <TableCell className="font-medium">18/02</TableCell>
      <TableCell className="text-muted-foreground">
        Música, Ritmo(Dif de som e Ruídos) - Notas musicais
      </TableCell>
      <TableCell className="font-medium">7</TableCell>
      <TableCell className="font-medium">1 ao 4</TableCell>
    </TableRow>
  )
}
