import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function UserTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="Nome" className="h-8 w-[320px]" />
      <Input placeholder="Instrumento" className="h-8 w-auto" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos grupos</SelectItem>
          <SelectItem value="pending">Grupo 01</SelectItem>
          <SelectItem value="canceled">Grupo 02</SelectItem>
          <SelectItem value="processing">Grupo 03</SelectItem>
          <SelectItem value="processing">Grupo 04</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="secondary"
        className="hover:bg-primary-dark bg-primary text-white"
        size="sm"
        type="submit"
      >
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button variant="outline" size="sm" type="button">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
