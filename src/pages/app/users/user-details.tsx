import { useState } from 'react'

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
import { userStore } from '@/store/userStore'
import { toast } from 'sonner'

interface User {
  id: string
  name: string
  instrument?: string
  group?: string
  role: string
  email: string
  phone?: string
  practical_level?: string
}

interface Props {
  user: User
}

export function UserDetails({ user }: Props) {
  const { token } = useAuthStore()
  const { fetchUsers } = userStore()

  const [form, setForm] = useState({
    name: user.name,
    instrument: user.instrument || '',
    group: user.group || '',
    role: user.role,
    email: user.email,
    phone: user.phone || '',
    practical_level: user.practical_level || '',
  })

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3333/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        if (token) {
          fetchUsers(token)
        } else {
          toast.error('Token de autenticação ausente!')
        }
         toast.success('Usuário atualizado com sucesso!')
      } else {
         toast.error('Erro ao atualizar usuário')
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Dados do Usuário</DialogTitle>
      </DialogHeader>

      <section className="grid gap-4">
        <Input
          className="h-12"
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <Input
          className="h-12"
          type="text"
          placeholder="Instrumento"
          value={form.instrument}
          onChange={(e) => handleChange('instrument', e.target.value)}
        />
        <Select
          value={form.group}
          onValueChange={(value) => handleChange('group', value)}
        >
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Grupo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GROUP_01">Grupo 01</SelectItem>
            <SelectItem value="GROUP_02">Grupo 02</SelectItem>
            <SelectItem value="GROUP_03">Grupo 03</SelectItem>
            <SelectItem value="GROUP_04">Grupo 04</SelectItem>
          </SelectContent>
        </Select>
        <Input
          className="h-12"
          type="email"
          placeholder="E-mail"
          value={form.email ?? ''}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <Input
          className="h-12"
          type="tel"
          placeholder="Celular"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
        <Select
          value={form.practical_level}
          onValueChange={(value) => handleChange('practical_level', value)}
        >
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Nível prático" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="C_JOVEM">Culto de Jovem</SelectItem>
            <SelectItem value="C_OFICIAL">Culto Oficial</SelectItem>
            <SelectItem value="OFICIALIZACAO">Oficialização</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <Button className="mt-4 h-12 w-full" onClick={handleSave}>
        Salvar
      </Button>
    </DialogContent>
  )
}
