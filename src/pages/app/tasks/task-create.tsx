import { X, Loader2, Users, User as UserIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

import { useTaskStore, TaskCategory, Group } from '@/store/taskStore'
import { useAuthStore } from '@/store/authStore'
import { userStore } from '@/store/userStore' // Certifique-se que o store de usuários existe

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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function TaskCreate() {
  const { createTask } = useTaskStore()
  const { users, fetchUsers } = userStore()
  const { token } = useAuthStore()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | ''>('')
  const [description, setDescription] = useState('')
  const [observation, setObservation] = useState('')
  const [pageInput, setPageInput] = useState('')
  const [lessonInput, setLessonInput] = useState('')
  const [hymnInput, setHymnInput] = useState('')
  
  const [selectedPages, setSelectedPages] = useState<number[]>([])
  const [selectedLessons, setSelectedLessons] = useState<number[]>([])
  const [selectedHymns, setSelectedHymns] = useState<number[]>([])
  const [selectedRecipient, setSelectedRecipient] = useState<string>('')

  // Carrega usuários para o Select
  useEffect(() => {
    if (token && users.length === 0) {
      fetchUsers(token)
    }
  }, [token, users.length, fetchUsers])

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
    if (!selectedCategory || !description || !selectedRecipient) {
      alert("Selecione a categoria, descrição e para quem é a tarefa.")
      return
    }

    setIsLoading(true)

    // Monta o título dinâmico para facilitar a visualização no card
    let dynamicTitle = description
    if (selectedPages.length > 0) dynamicTitle += ` (Pág: ${selectedPages.join(', ')})`
    if (selectedLessons.length > 0) dynamicTitle += ` (Lição: ${selectedLessons.join(', ')})`
    if (selectedHymns.length > 0) dynamicTitle += ` (Hinos: ${selectedHymns.join(', ')})`

    const isGroup = selectedRecipient.startsWith('GROUP_')
    
    const payload = {
      title: dynamicTitle,
      description,
      observation,
      category: selectedCategory as TaskCategory,
      group: isGroup ? selectedRecipient as Group : undefined,
      studentId: !isGroup ? selectedRecipient : undefined
    }

    const success = await createTask(payload, token!)
    setIsLoading(false)

    if (success) {
      // Força um reload ou você pode controlar o estado do Dialog no componente pai
      window.location.reload()
    }
  }

  return (
    <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Nova Tarefa</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        {/* Categoria */}
        <Select onValueChange={(v) => setSelectedCategory(v as TaskCategory)}>
          <SelectTrigger className="h-12"><SelectValue placeholder="Selecione a Categoria" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="MSA">MSA</SelectItem>
            <SelectItem value="METODO">Método</SelectItem>
            <SelectItem value="HINOS">Hino</SelectItem>
          </SelectContent>
        </Select>

        {/* Inputs Dinâmicos */}
        {(selectedCategory === 'MSA' || selectedCategory === 'METODO') && (
          <div className="grid gap-3 p-3 border rounded-md bg-muted/30">
            <div className="flex gap-2">
              <Input type="number" placeholder="Página" value={pageInput} onChange={(e) => setPageInput(e.target.value)} />
              <Button type="button" variant="secondary" onClick={handleAddPage}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedPages.map(p => (
                <Badge key={p} className="pl-2 pr-1 py-1">Pg {p} <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setSelectedPages(selectedPages.filter(x => x !== p))} /></Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input type="number" placeholder="Lição" value={lessonInput} onChange={(e) => setLessonInput(e.target.value)} />
              <Button type="button" variant="secondary" onClick={handleAddLesson}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedLessons.map(l => (
                <Badge key={l} className="pl-2 pr-1 py-1">L {l} <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setSelectedLessons(selectedLessons.filter(x => x !== l))} /></Badge>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === 'HINOS' && (
          <div className="grid gap-3 p-3 border rounded-md bg-muted/30">
            <div className="flex gap-2">
              <Input type="number" placeholder="Hino (1-480)" value={hymnInput} onChange={(e) => setHymnInput(e.target.value)} />
              <Button type="button" variant="secondary" onClick={handleAddHymn}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedHymns.map(h => (
                <Badge key={h} className="pl-2 pr-1 py-1">Hino {h} <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setSelectedHymns(selectedHymns.filter(x => x !== h))} /></Badge>
              ))}
            </div>
          </div>
        )}

        {/* Texto e Destinatário */}
        <Input className="h-12" placeholder="O que deve ser feito?" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input className="h-12" placeholder="Observações (opcional)" value={observation} onChange={(e) => setObservation(e.target.value)} />

        <Select onValueChange={setSelectedRecipient}>
          <SelectTrigger className="h-12"><SelectValue placeholder="Para quem é esta tarefa?" /></SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="flex items-center gap-2"><Users className="h-4 w-4"/> Grupos</SelectLabel>
              <SelectItem value="GROUP_01">Grupo 01</SelectItem>
              <SelectItem value="GROUP_02">Grupo 02</SelectItem>
              <SelectItem value="GROUP_03">Grupo 03</SelectItem>
              <SelectItem value="GROUP_04">Grupo 04</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel className="flex items-center gap-2"><UserIcon className="h-4 w-4"/> Alunos</SelectLabel>
              {users.filter(u => u.role === 'STUDENT').map(u => (
                <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="h-14 w-full text-lg font-bold shadow-lg" onClick={handleSave} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Criar Tarefa'}
        </Button>
      </div>
    </DialogContent>
  )
}