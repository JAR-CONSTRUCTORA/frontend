import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface LoginData {
  username: string
  password: string
}
type Prop = {
  onSubmitLogin: (arg: any) => void
}
const LoginForm: React.FC<Prop> = ({ onSubmitLogin }) => {
  const { register, handleSubmit } = useForm<LoginData>()

  return (
    <Card className="mx-auto mt-10 w-full max-w-md p-4">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">
          JAR CONSTRUCCIONES
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Nombre de usuario</Label>
            <Input
              type="text"
              placeholder="Ingrese un usuario"
              {...register('username')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
          </div>
        </CardContent>
        <CardFooter className="my-10">
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default LoginForm
