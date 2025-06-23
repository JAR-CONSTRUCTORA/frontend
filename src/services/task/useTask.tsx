import { api } from '@/configs/axios'
import { taskSchema } from '@/schemas/formSchema'
import { Task, User } from '@/types'
import { z } from 'zod'

export const getTasks = async () => {
  const { data } = await api.get('/task')
  return data
}

export const editTask = async (task: Task, e: any, workersList: User[]) => {
  const { data } = await api.put(
    `/task/editTask/${task._id}`,
    { ...e, assignees: workersList },
    { headers: { 'Content-Type': 'application/json' } },
  )
  return data
}

export const createTask = async (
  data: z.infer<typeof taskSchema>,
  selectedWorkers: User[],
) => {
  api.post('/task/createTask', {
    ...data,
    assignees: selectedWorkers,
  })
}
