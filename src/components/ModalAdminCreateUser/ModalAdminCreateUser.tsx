import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import { z } from 'zod'
import { userSchema } from '@/schemas/formSchema'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'

type userInfer = z.infer<typeof userSchema>

const ModalAdminCreateUser = () => {
  const { handleSubmit, register } = useForm<userInfer>()
  const onSubmit = async (e: userInfer) => {
    const createUserResp = await axios.post(
      'http://localhost:8000/user/createUser/',
      e,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (createUserResp.status === 200) alert('Contacto creado')
  }
  return (
    <Dialog>
      <DialogTrigger className="m-0 flex h-full w-full items-center justify-center p-0 text-xl font-medium">
        <span className="tracking-wider">+ Crear Usuario</span>
      </DialogTrigger>
      <DialogContent className="border border-white/10 bg-[#2a2a2a] text-gray-300 shadow-lg">
        <DialogHeader>Creador de usuario</DialogHeader>
        <DialogDescription>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-2">
              <Label className="text-gray-400">Nombre de usuario</Label>
              <Input
                type="text"
                placeholder="Ingrese un nombre de usuario. Ej: empleadoapellido"
                className="border border-white/10 bg-[#1e1e1e] text-white"
                {...register('username')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-gray-400">Contraseña</Label>
              <Input
                type="text"
                placeholder="Ingrese una contraseña para el empleado"
                className="border border-white/10 bg-[#1e1e1e] text-white"
                {...register('password')}
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="flex w-full flex-col gap-2">
                <Label className="text-gray-400">Nombre</Label>
                <Input
                  type="text"
                  placeholder="Ingrese el nombre del empleado..."
                  className="border border-white/10 bg-[#1e1e1e] text-white"
                  {...register('firstName')}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label className="text-gray-400">Apellido</Label>
                <Input
                  type="text"
                  placeholder="Ingrese apellido del empleado..."
                  className="border border-white/10 bg-[#1e1e1e] text-white"
                  {...register('lastName')}
                />
              </div>
            </div>
            <div className="mt-4 mb-2 w-full">
              <Button className="w-full">Crear Usuario</Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAdminCreateUser
