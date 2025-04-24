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

const LoginForm = () => {
  return (
    <Card className="mx-auto mt-10 w-full max-w-md p-4">
      <CardHeader>
        <CardTitle className="text-center text-lg">Iniciar sesión</CardTitle>
      </CardHeader>
      <form>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Nombre de usuario</Label>
            <Input type="text" placeholder="Marcosar" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" placeholder="••••••••" />
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
