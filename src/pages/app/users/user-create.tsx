import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { userStore } from '@/store/userStore'
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

// Enums e labels
export enum UserRole {
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT',
}

export enum Group {
  GROUP_01 = 'GROUP_01',
  GROUP_02 = 'GROUP_02',
  GROUP_03 = 'GROUP_03',
  GROUP_04 = 'GROUP_04',
}

export enum PracticalLevel {
  C_JOVEM = 'C_JOVEM',
  C_OFICIAL = 'C_OFICIAL',
  OFICIALIZACAO = 'OFICIALIZACAO',
}

const UserRoleLabel = {
  [UserRole.INSTRUCTOR]: 'Instrutor',
  [UserRole.STUDENT]: 'Aluno',
}

const GroupLabel = {
  [Group.GROUP_01]: 'Grupo 01',
  [Group.GROUP_02]: 'Grupo 02',
  [Group.GROUP_03]: 'Grupo 03',
  [Group.GROUP_04]: 'Grupo 04',
}

const PracticalLevelLabel = {
  [PracticalLevel.C_JOVEM]: 'Culto de Jovem',
  [PracticalLevel.C_OFICIAL]: 'Culto Oficial',
  [PracticalLevel.OFICIALIZACAO]: 'Oficialização',
}

// Esquema de validação com Zod
const userSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  instrument: z.string().min(1, 'Instrumento obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z
    .string()
    .regex(/^\d{9}$/, 'Telefone deve ter exatamente 9 dígitos numéricos'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  group: z.nativeEnum(Group),
  role: z.nativeEnum(UserRole),
  practical_level: z.nativeEnum(PracticalLevel),
})

// Props
type UserCreateProps = {
  token: string | null
  onCreateSuccess: () => void
}

export function UserCreate({ token, onCreateSuccess }: UserCreateProps) {
  const { createUser } = userStore()

  const [form, setForm] = useState({
    name: '',
    instrument: '',
    group: Group.GROUP_01,
    role: UserRole.STUDENT,
    email: '',
    phone: '',
    password: '123456',
    practical_level: PracticalLevel.C_JOVEM,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const result = userSchema.safeParse(form)

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => issue.message)
      errorMessages.forEach((msg) => toast.error(msg))
      return
    }

    if (!token) return alert('Token não encontrado.')

    const success = await createUser(form, token)

    if (success) {
      toast.success('Usuário criado com sucesso!')
      onCreateSuccess()
    } else {
      toast.error('Erro ao criar usuário.')
    }
  }

  return (
    <DialogContent>
      <section className="grid gap-4">
        <DialogHeader>
          <DialogTitle>Criar novo usuário</DialogTitle>
        </DialogHeader>

        <Input placeholder="Nome" name="name" value={form.name} onChange={handleChange} />
        <Input placeholder="Instrumento" name="instrument" value={form.instrument} onChange={handleChange} />

        {/* Grupo */}
        <Select value={form.group} onValueChange={(value) => setForm({ ...form, group: value as Group })}>
          <SelectTrigger>
            <SelectValue placeholder="Grupo" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Group).map((g) => (
              <SelectItem key={g} value={g}>
                {GroupLabel[g]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Função */}
        <Select value={form.role} onValueChange={(value) => setForm({ ...form, role: value as UserRole })}>
          <SelectTrigger>
            <SelectValue placeholder="Função" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(UserRole).map((role) => (
              <SelectItem key={role} value={role}>
                {UserRoleLabel[role]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input placeholder="E-mail" name="email" type="email" value={form.email} onChange={handleChange} />
        <Input placeholder="Celular (9 dígitos)" name="phone" value={form.phone} onChange={handleChange} />

        {/* Nível Prático */}
        <Select
          value={form.practical_level}
          onValueChange={(value) => setForm({ ...form, practical_level: value as PracticalLevel })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Nível Prático" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(PracticalLevel).map((level) => (
              <SelectItem key={level} value={level}>
                {PracticalLevelLabel[level]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      <Button className="mt-4 h-12 w-full" onClick={handleSubmit}>
        Salvar
      </Button>
    </DialogContent>
  )
}
