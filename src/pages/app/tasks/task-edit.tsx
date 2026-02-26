import { Loader2, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuthStore } from '@/store/authStore'
import { Task, TaskCategory, useTaskStore } from '@/store/taskStore'

interface TaskEditProps {
  task: Task
  onSuccess?: () => void
}

export function TaskEdit({ task, onSuccess }: TaskEditProps) {
  const { updateTask } = useTaskStore()
  const { token } = useAuthStore()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>(task.category)
  const [description, setDescription] = useState(task.description)
  const [observation, setObservation] = useState(task.observation || '')
  
  // Para simplificar, vamos tentar extrair páginas, lições e hinos do título atual se possível, 
  // ou apenas deixar o usuário editar o título manualmente se for complexo demais.
  // No TaskCreate ele gera o título como: description (Pág: ...) (Lição: ...) (Hinos: ...)
  
  const parseTaskTitle = (title: string) => {
    const pageRegex = /(?:Pg|Pág)[:\s]+([\d,\s]+)/gi
    const lessonRegex = /(?:Lição|L)[:\s]+([\d,\s]+)/gi
    const hymnRegex = /(?:Hinos|H)[:\s]+([\d,\s]+)/gi

    const extract = (regex: RegExp) => {
      const matches = [...title.matchAll(regex)]
      return matches
        .flatMap((m) => m[1].split(',').map((n) => n.trim()))
        .filter((n) => n !== '')
        .map(n => parseInt(n))
        .filter(n => !isNaN(n))
    }

    const pages = extract(pageRegex)
    const lessons = extract(lessonRegex)
    const hymns = extract(hymnRegex)

    return { pages, lessons, hymns }
  }

  const initialData = parseTaskTitle(task.title)

  const [pageInput, setPageInput] = useState('')
  const [lessonInput, setLessonInput] = useState('')
  const [hymnInput, setHymnInput] = useState('')

  const [selectedPages, setSelectedPages] = useState<number[]>(initialData.pages)
  const [selectedLessons, setSelectedLessons] = useState<number[]>(initialData.lessons)
  const [selectedHymns, setSelectedHymns] = useState<number[]>(initialData.hymns)

  const handleAddPage = () => {
    const num = parseInt(pageInput)
    if (num && !selectedPages.includes(num)) {
      setSelectedPages([...selectedPages, num].sort((a, b) => a - b))
      setPageInput('')
    }
  }

  const handleAddLesson = () => {
    const num = parseInt(lessonInput)
    if (num && !selectedLessons.includes(num)) {
      setSelectedLessons([...selectedLessons, num].sort((a, b) => a - b))
      setLessonInput('')
    }
  }

  const handleAddHymn = () => {
    const num = parseInt(hymnInput)
    if (num >= 1 && num <= 480 && !selectedHymns.includes(num)) {
      setSelectedHymns([...selectedHymns, num].sort((a, b) => a - b))
      setHymnInput('')
    }
  }

  const handleSave = async () => {
    if (!selectedCategory || !description) {
      toast.error('Preencha a categoria e a descrição.')
      return
    }

    setIsLoading(true)

    let dynamicTitle = description
    if (selectedPages.length > 0)
      dynamicTitle += ` (Pág: ${selectedPages.join(', ')})`
    if (selectedLessons.length > 0)
      dynamicTitle += ` (Lição: ${selectedLessons.join(', ')})`
    if (selectedHymns.length > 0)
      dynamicTitle += ` (Hinos: ${selectedHymns.join(', ')})`

    const payload = {
      title: dynamicTitle,
      description,
      observation,
      category: selectedCategory,
    }

    const success = await updateTask(task.id, payload, token!)

    setIsLoading(false)

    if (success) {
      toast.success('Tarefa atualizada com sucesso!')
      if (onSuccess) onSuccess()
    } else {
      toast.error('Erro ao atualizar tarefa.')
    }
  }

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[450px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Editar Tarefa</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <Select
          value={selectedCategory}
          onValueChange={(v: string) => setSelectedCategory(v as TaskCategory)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Selecione a Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MSA">MSA</SelectItem>
            <SelectItem value="METODO">Método</SelectItem>
            <SelectItem value="HINOS">Hino</SelectItem>
          </SelectContent>
        </Select>
        
        {(selectedCategory === 'MSA' || selectedCategory === 'METODO') && (
          <div className="grid gap-3 rounded-md border bg-muted/30 p-3">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Página"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
              />
              <Button type="button" variant="secondary" onClick={handleAddPage}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedPages.map((p) => (
                <Badge key={p} className="py-1 pl-2 pr-1">
                  Pg {p}{' '}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() =>
                      setSelectedPages(selectedPages.filter((x) => x !== p))
                    }
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Lição"
                value={lessonInput}
                onChange={(e) => setLessonInput(e.target.value)}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddLesson}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedLessons.map((l) => (
                <Badge key={l} className="py-1 pl-2 pr-1">
                  L {l}{' '}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() =>
                      setSelectedLessons(selectedLessons.filter((x) => x !== l))
                    }
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === 'HINOS' && (
          <div className="grid gap-3 rounded-md border bg-muted/30 p-3">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Hino (1-480)"
                value={hymnInput}
                onChange={(e) => setHymnInput(e.target.value)}
              />
              <Button type="button" variant="secondary" onClick={handleAddHymn}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedHymns.map((h) => (
                <Badge key={h} className="py-1 pl-2 pr-1">
                  Hino {h}{' '}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() =>
                      setSelectedHymns(selectedHymns.filter((x) => x !== h))
                    }
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Input
          className="h-12"
          placeholder="O que deve ser feito?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          className="h-12"
          placeholder="Observações (opcional)"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
        />

        <Button
          className="h-14 w-full text-lg font-bold shadow-lg"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            'Salvar Alterações'
          )}
        </Button>
      </div>
    </DialogContent>
  )
}
