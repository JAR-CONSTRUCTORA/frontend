import { api } from '@/configs/axios'
import { userSchema } from '@/schemas/formSchema'
import { z } from 'zod'

export const useGetUsers = async (active: string) => {
  const { data } = await api.get(`/user/workers?active=${active}`)
  return data
}

export const useCreateUser = async (e: z.infer<typeof userSchema>) => {
  const { data } = await api.post('/user/createUser/', e, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}

export const useGetUser = async (prompt: string) => {
  const { data } = await api.get(`/user/search?completeName=${prompt}`)
  return data
}

export const useUnsubscribeUser = async (id: string) => {
  const { data } = await api.put(`/user/unsubscribe/${id}`)
  return data
}
