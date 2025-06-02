import axios from 'axios'
import { useForm } from 'react-hook-form'
// import { Link, useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/authStore'

import LogoImg from '../../assets/logo.png'

const signInForm = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { setToken, setUserRole, setUserName, setUserInstrument, setUserId } =
    useAuthStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      const response = await axios.post(
        'http://localhost:3333/users/login',
        data,
      )

      const { token } = response.data

      setToken(token.token)
      setUserRole(token.role)
      setUserName(token.name)
      setUserInstrument(token.instrument)
      setUserId(token.id)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Login realizado com sucesso!')
      navigate('/')
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <div className="p-4">
        {/* <Button variant="outline" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Fazer cadastro</Link>
        </Button> */}

        <div className="xs:w-[350px] flex w-full flex-col justify-center gap-6 px-2">
          <div className="flex flex-col items-center gap-2 text-center">
            <img src={LogoImg} className="w-48" alt="" />
            <p className="text-sm text-muted-foreground">Falta pouco...</p>
            <p className="text-sm text-muted-foreground">
              Para desbloquear seu potencial musical!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Sua Senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
