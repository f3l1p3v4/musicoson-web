import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface UserTableFiltersProps {
  filters: {
    nome: string
    instrumento: string
    grupo: string
    nivel: string
    role: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      nome: string
      instrumento: string
      grupo: string
      nivel: string
      role: string
    }>
  >
}

export function UserTableFilters({
  filters,
  setFilters,
}: UserTableFiltersProps) {
  const handleClearFilters = () => {
    setFilters({
      nome: '',
      instrumento: '',
      grupo: 'all',
      nivel: 'all-level',
      role: 'all',
    })
  }

  return (
    /* <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      
      <Input 
        placeholder="Nome" 
        className="h-8 w-[200px]" 
        value={filters.nome}
        onChange={(e) => setFilters(prev => ({ ...prev, nome: e.target.value }))}
      />

      <Input 
        placeholder="Instrumento" 
        className="h-8 w-[130px]" 
        value={filters.instrumento}
        onChange={(e) => setFilters(prev => ({ ...prev, instrumento: e.target.value }))}
      />

      <Select 
        value={filters.role} 
        onValueChange={(value) => setFilters(prev => ({ ...prev, role: value }))}
      >
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos Tipos</SelectItem>
          <SelectItem value="INSTRUCTOR">Instrutor</SelectItem>
          <SelectItem value="STUDENT">Aluno</SelectItem>
          <SelectItem value="DISABLED">Desabilitado</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={filters.grupo} 
        onValueChange={(value) => setFilters(prev => ({ ...prev, grupo: value }))}
      >
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder="Grupos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos grupos</SelectItem>
          <SelectItem value="GROUP_01">Grupo 01</SelectItem>
          <SelectItem value="GROUP_02">Grupo 02</SelectItem>
          <SelectItem value="GROUP_03">Grupo 03</SelectItem>
          <SelectItem value="GROUP_04">Grupo 04</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={filters.nivel} 
        onValueChange={(value) => setFilters(prev => ({ ...prev, nivel: value }))}
      >
        <SelectTrigger className="h-8 w-[160px]">
          <SelectValue placeholder="Níveis" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-level">Todos Níveis</SelectItem>
          <SelectItem value="C_JOVEM">Culto de Jovens</SelectItem>
          <SelectItem value="C_OFICIAL">Culto Oficial</SelectItem>
          <SelectItem value="OFICIALIZACAO">Oficialização</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        variant="outline" 
        size="sm" 
        type="button"
        className='bg-rose-500 text-white hover:bg-rose-600 hover:text-white'
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Limpar Filtros
      </Button>
    </div> */
    <div className="flex flex-col gap-3">
      {/* Texto "Filtros" separado para não quebrar o alinhamento da grid */}
      <span className="text-sm font-semibold">Filtros:</span>

      <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:items-center">
        {/* Nome: Ocupa 100% no mobile (col-span-2) e largura fixa no desktop */}
        <Input
          placeholder="Nome"
          className="col-span-2 h-8 md:w-[200px]"
          value={filters.nome}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, nome: e.target.value }))
          }
        />

        {/* Instrumento: 50% no mobile e largura fixa no desktop */}
        <Input
          placeholder="Instrumento"
          className="h-8 w-full md:w-[130px]"
          value={filters.instrumento}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, instrumento: e.target.value }))
          }
        />

        {/* Tipo de Usuário: 50% no mobile e largura fixa no desktop */}
        <Select
          value={filters.role}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, role: value }))
          }
        >
          <SelectTrigger className="h-8 w-full md:w-[150px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Tipos</SelectItem>
            <SelectItem value="INSTRUCTOR">Instrutor</SelectItem>
            <SelectItem value="STUDENT">Aluno</SelectItem>
            <SelectItem value="DISABLED">Desabilitado</SelectItem>
          </SelectContent>
        </Select>

        {/* Grupos: 50% no mobile e largura fixa no desktop */}
        <Select
          value={filters.grupo}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, grupo: value }))
          }
        >
          <SelectTrigger className="h-8 w-full md:w-[150px]">
            <SelectValue placeholder="Grupos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos grupos</SelectItem>
            <SelectItem value="GROUP_01">Grupo 01</SelectItem>
            <SelectItem value="GROUP_02">Grupo 02</SelectItem>
            <SelectItem value="GROUP_03">Grupo 03</SelectItem>
            <SelectItem value="GROUP_04">Grupo 04</SelectItem>
          </SelectContent>
        </Select>

        {/* Níveis: 50% no mobile e largura fixa no desktop */}
        <Select
          value={filters.nivel}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, nivel: value }))
          }
        >
          <SelectTrigger className="h-8 w-full md:w-[160px]">
            <SelectValue placeholder="Níveis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-level">Todos Níveis</SelectItem>
            <SelectItem value="C_JOVEM">Culto de Jovens</SelectItem>
            <SelectItem value="C_OFICIAL">Culto Oficial</SelectItem>
            <SelectItem value="OFICIALIZACAO">Oficialização</SelectItem>
          </SelectContent>
        </Select>

        {/* Botão Limpar: Ocupa 100% no mobile ou ajusta conforme o conteúdo (w-max) */}
        <Button
          variant="outline"
          size="sm"
          type="button"
          className="col-span-2 h-8 bg-rose-500 text-white hover:bg-rose-600 hover:text-white md:col-auto"
          onClick={handleClearFilters}
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  )
}
