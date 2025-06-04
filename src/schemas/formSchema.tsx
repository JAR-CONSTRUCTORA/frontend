import { z } from 'zod'

export const taskSchema = z.object({
  station: z.string().optional(),
  incidence: z.string().optional(),
  description: z.string().min(1, 'La descripción es obligatoria'),
  location: z.string().min(1, 'La dirección es obligatoria'),
  estimatedTime: z.string().min(1, 'Tiempo estimado requerido'),
})

export const userSchema = z.object({
  username: z.string().min(5, 'El nombre de usuario es obligatorio'),
  password: z
    .string()
    .min(5, 'Es requerida una contraseña de min 5 caracteres'),
  firstName: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
})
