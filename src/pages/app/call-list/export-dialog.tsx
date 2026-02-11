import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { clsx } from 'clsx'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useAttendanceStore } from '@/store/callListStore'

interface ExportDialogProps {
  token: string
}

export function ExportDialog({ token }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [period, setPeriod] = useState('1')
  const [isLoading, setIsLoading] = useState(false)
  
  const exportAttendance = useAttendanceStore((state) => state.exportAttendance)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  async function handleExport() {
    setIsLoading(true)
    try {
      await exportAttendance({ year, period, token })
      toast.success('Exportação realizada com sucesso!')
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao exportar:', error)
      toast.error('Erro ao processar os dados para Excel.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={clsx(
            "fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-all active:scale-95",
            isLoading ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-white"
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Download className="mr-2 h-5 w-5" />
          )}
          {isLoading ? 'Gerando...' : 'Exportar Chamada'}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exportar para Excel (.xlsx)</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="year">Ano Letivo</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="period">Período Semestral</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger id="period">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1º Semestre (Jan - Jun)</SelectItem>
                <SelectItem value="2">2º Semestre (Jul - Dez)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)} 
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleExport} 
            disabled={isLoading} 
            className={clsx("min-w-[120px]", isLoading && "opacity-50")}
          >
            {isLoading ? 'Processando...' : 'Baixar Excel'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}