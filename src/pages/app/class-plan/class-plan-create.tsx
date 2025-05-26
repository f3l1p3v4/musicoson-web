import { X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

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

export function ClassPlanCreate() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [pageInput, setPageInput] = useState('')
  const [lessonInput, setLessonInput] = useState('')
  const [selectedPages, setSelectedPages] = useState<number[]>([])
  const [selectedLessons, setSelectedLessons] = useState<number[]>([])
  const [selectedHymns, setSelectedHymns] = useState<number[]>([])
  const [hymnInput, setHymnInput] = useState('')
  const [selectedGroupsOrStudents, setSelectedGroupsOrStudents] = useState<
    string[]
  >([])

  // Função para adicionar páginas
  const handleAddPage = () => {
    const pageNumber = parseInt(pageInput, 10)
    if (!isNaN(pageNumber) && !selectedPages.includes(pageNumber)) {
      setSelectedPages([...selectedPages, pageNumber])
      setPageInput('')
    }
  }

  // Função para remover páginas
  const handleRemovePage = (pageNumber: number) => {
    setSelectedPages(selectedPages.filter((page) => page !== pageNumber))
  }

  // Função para adicionar lições
  const handleAddLesson = () => {
    const lessonNumber = parseInt(lessonInput, 10)
    if (!isNaN(lessonNumber) && !selectedLessons.includes(lessonNumber)) {
      setSelectedLessons([...selectedLessons, lessonNumber])
      setLessonInput('')
    }
  }

  // Função para remover lições
  const handleRemoveLesson = (lessonNumber: number) => {
    setSelectedLessons(
      selectedLessons.filter((lesson) => lesson !== lessonNumber),
    )
  }

  // Função para adicionar hinos
  const handleAddHymn = () => {
    const hymnNumber = parseInt(hymnInput, 10)
    if (
      !isNaN(hymnNumber) &&
      hymnNumber >= 1 &&
      hymnNumber <= 480 &&
      !selectedHymns.includes(hymnNumber)
    ) {
      setSelectedHymns([...selectedHymns, hymnNumber])
      setHymnInput('')
    }
  }

  // Função para remover hinos
  const handleRemoveHymn = (hymnNumber: number) => {
    setSelectedHymns(selectedHymns.filter((hymn) => hymn !== hymnNumber))
  }

  // Função para adicionar grupos ou alunos selecionados
  const handleAddGroupOrStudent = (value: string) => {
    if (value === 'todos') {
      setSelectedGroupsOrStudents(['todos'])
    } else if (!selectedGroupsOrStudents.includes(value)) {
      setSelectedGroupsOrStudents([...selectedGroupsOrStudents, value])
    }
  }

  // Função para remover grupos ou alunos selecionados
  const handleRemoveGroupOrStudent = (value: string) => {
    setSelectedGroupsOrStudents(
      selectedGroupsOrStudents.filter((item) => item !== value),
    )
  }

  return (
    <DialogContent>
      <section className="grid gap-4">
        <DialogHeader>
          <DialogTitle>Criar nova aula</DialogTitle>
        </DialogHeader>

        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MSA">MSA</SelectItem>
            <SelectItem value="Método">Método</SelectItem>
            <SelectItem value="Hino">Hino</SelectItem>
          </SelectContent>
        </Select>

        {selectedCategory === 'MSA' && (
          <>
            <div className="flex gap-2">
              <Input
                className="h-12"
                type="number"
                placeholder="Página"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
              />
              <Button type="button" className="h-12" onClick={handleAddPage}>
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedPages.map((page) => (
                <Badge key={page} className="relative pr-8">
                  Página {page}
                  <button
                    onClick={() => handleRemovePage(page)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                className="h-12"
                type="number"
                placeholder="Lições"
                value={lessonInput}
                onChange={(e) => setLessonInput(e.target.value)}
              />
              <Button type="button" className="h-12" onClick={handleAddLesson}>
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedLessons.map((lesson) => (
                <Badge key={lesson} className="relative pr-8">
                  Lição {lesson}
                  <button
                    onClick={() => handleRemoveLesson(lesson)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Badge>
              ))}
            </div>
          </>
        )}

        {selectedCategory === 'Método' && (
          <>
            <div className="flex gap-2">
              <Input
                className="h-12"
                type="number"
                placeholder="Página"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
              />
              <Button type="button" className="h-12" onClick={handleAddPage}>
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedPages.map((page) => (
                <Badge key={page} className="relative pr-8">
                  Página {page}
                  <button
                    onClick={() => handleRemovePage(page)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                className="h-12"
                type="number"
                placeholder="Lições"
                value={lessonInput}
                onChange={(e) => setLessonInput(e.target.value)}
              />
              <Button type="button" className="h-12" onClick={handleAddLesson}>
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedLessons.map((lesson) => (
                <Badge key={lesson} className="relative pr-8">
                  Lição {lesson}
                  <button
                    onClick={() => handleRemoveLesson(lesson)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Badge>
              ))}
            </div>
          </>
        )}

        {selectedCategory === 'Hino' && (
          <>
            <div className="flex gap-2">
              <Input
                className="h-12"
                type="number"
                placeholder="Número do Hino (1-480)"
                value={hymnInput}
                onChange={(e) => setHymnInput(e.target.value)}
                min="1"
                max="480"
              />
              <Button type="button" className="h-12" onClick={handleAddHymn}>
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedHymns.map((hymn) => (
                <Badge key={hymn} className="relative pr-8">
                  Hino {hymn}
                  <button
                    onClick={() => handleRemoveHymn(hymn)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Badge>
              ))}
            </div>
          </>
        )}

        <Input className="h-12" type="text" placeholder="Descrição" />

        <Select onValueChange={handleAddGroupOrStudent}>
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Grupo ou Aluno" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="todos"
              disabled={selectedGroupsOrStudents.includes('todos')}
            >
              Todos
            </SelectItem>
            <SelectItem
              value="grupo-1"
              disabled={
                selectedGroupsOrStudents.includes('todos') ||
                selectedGroupsOrStudents.includes('grupo-1')
              }
            >
              Grupo 01
            </SelectItem>
            <SelectItem
              value="grupo-2"
              disabled={
                selectedGroupsOrStudents.includes('todos') ||
                selectedGroupsOrStudents.includes('grupo-2')
              }
            >
              Grupo 02
            </SelectItem>
            <SelectItem
              value="grupo-3"
              disabled={
                selectedGroupsOrStudents.includes('todos') ||
                selectedGroupsOrStudents.includes('grupo-3')
              }
            >
              Grupo 03
            </SelectItem>
            <SelectItem
              value="grupo-4"
              disabled={
                selectedGroupsOrStudents.includes('todos') ||
                selectedGroupsOrStudents.includes('grupo-4')
              }
            >
              Grupo 04
            </SelectItem>
            <SelectItem
              value="1"
              disabled={
                selectedGroupsOrStudents.includes('todos') ||
                selectedGroupsOrStudents.includes('1')
              }
            >
              Antoni da Silva
            </SelectItem>
            <SelectItem
              value="2"
              disabled={
                selectedGroupsOrStudents.includes('todos') ||
                selectedGroupsOrStudents.includes('2')
              }
            >
              Aberto Ferreira
            </SelectItem>
            <SelectItem
              value="3"
              disabled={
                selectedGroupsOrStudents.includes('todos') ||
                selectedGroupsOrStudents.includes('3')
              }
            >
              João Pedro
            </SelectItem>
            <SelectItem
              value="4"
              disabled={
                selectedGroupsOrStudents.includes('todos') ||
                selectedGroupsOrStudents.includes('4')
              }
            >
              João Silva
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2">
          {selectedGroupsOrStudents.map((item) => (
            <Badge key={item} className="relative pr-8">
              {item === 'todos'
                ? 'Todos'
                : item.startsWith('grupo-')
                  ? `Grupo ${item.split('-')[1]}`
                  : item === '1'
                    ? 'Antoni da Silva'
                    : item === '2'
                      ? 'Aberto Ferreira'
                      : item === '3'
                        ? 'João Pedro'
                        : 'João Silva'}
              <button
                onClick={() => handleRemoveGroupOrStudent(item)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
        </div>
      </section>

      <Button className="mt-4 h-12 w-full">
        <NavLink to="/perfil-edit">Salvar</NavLink>
      </Button>
    </DialogContent>
  )
}
