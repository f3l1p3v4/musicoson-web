import { MessageCircle } from 'lucide-react' // Ícone do WhatsApp
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea' // Para um input de texto maior

export function ConfirmationMessage() {
  return (
    <DialogContent>
      <section className="grid gap-4">
        <DialogHeader>
          <DialogTitle>Aluno: Antoni Ferreira da Silva</DialogTitle>
        </DialogHeader>

        <Textarea
          className="min-h-[120px] resize-none"
          placeholder="Digite sua mensagem aqui..."
        />
      </section>

      <Button className="mt-4 h-12 w-full bg-green-500 hover:bg-green-600">
        <MessageCircle className="mr-2 h-5 w-5" />
        <NavLink to="/perfil-edit">Enviar mensagem</NavLink>
      </Button>
    </DialogContent>
  )
}
