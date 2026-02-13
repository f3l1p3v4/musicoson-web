import { formatISO } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useClassPlanStore } from '@/store/ClassPlanStore'

type ClassPlanCreateProps = {
  token: string | null
  onCreateSuccess: () => void
}

export function ClassPlanCreate({
  token,
  onCreateSuccess,
}: ClassPlanCreateProps) {
  const { selectedGroup, createClassPlan } = useClassPlanStore()
  const [form, setForm] = useState({
    id: '',
    date: '',
    subject: '',
    page: '',
    exercise: '',
    method: '',
    classNumber: '',
    semester: 'S1',
    ano: new Date().getFullYear().toString(),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!token) return alert('Token não encontrado.')

    const payload = {
      group: selectedGroup,
      date: formatISO(new Date(form.date)),
      subject: form.subject,
      page: form.page,
      exercise: form.exercise,
      method: form.method,
      classNumber: Number(form.classNumber),
      semester: form.semester,
      ano: Number(form.ano),
    }

    const success = await createClassPlan(payload, token)

    if (success) {
      toast.success('Plano de aula criado com sucesso!')
      onCreateSuccess()
    } else {
      toast.error('Erro ao criar plano de aula.')
    }
  }

  return (
    <DialogContent>
      <section className="grid gap-4">
        <DialogHeader>
          <DialogTitle>
            Criar nova aula ({selectedGroup.replace('GROUP_', 'Grupo ')})
          </DialogTitle>
        </DialogHeader>

        <Input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <Input
          placeholder="Assunto (subject)"
          name="subject"
          value={form.subject}
          onChange={handleChange}
        />
        <Input
          placeholder="Página"
          name="page"
          value={form.page}
          onChange={handleChange}
        />
        <Input
          placeholder="Exercício"
          name="exercise"
          value={form.exercise}
          onChange={handleChange}
        />
        <Input
          placeholder="Módulos"
          name="method"
          value={form.method}
          onChange={handleChange}
        />
        <Input
          placeholder="Número da aula"
          name="classNumber"
          value={form.classNumber}
          onChange={handleChange}
        />
        <Input
          placeholder="Semestre (ex: S1)"
          name="semester"
          value={form.semester}
          onChange={handleChange}
        />
        <Input
          placeholder="Ano (ex: 2025)"
          name="ano"
          value={form.ano}
          onChange={handleChange}
        />
      </section>

      <Button className="mt-4 h-12 w-full" onClick={handleSubmit}>
        Salvar
      </Button>
    </DialogContent>
  )
}
