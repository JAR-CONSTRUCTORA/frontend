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

export const getTaskByUser = async (id: string | undefined) => {
  const { data } = await api.get(`/task/getTasks/${id}`)
  return data
}

export const startTaskUser = async (id: string) => {
  await api.put(
    `/task/startTask/${id}`,
    {},
    {
      headers: {
        Content_Type: 'application/json',
      },
    },
  )
}

export const endTaskUser = async (id: string) => {
  const { data } = await api.put(
    `/task/endTask/${id}`,
    {},
    {
      headers: {
        Content_Type: 'application/json',
      },
    },
  )
  return data
}

export const sendUserNote = async (
  idTask: string,
  idSender: string,
  content: string,
) => {
  const { data } = await api.put(
    `/task/sendnote/${idTask}`,
    {
      idSender,
      content,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return data
}

export const useGetTasksByQuery = async (
  idUser: string | undefined,
  query: string,
) => {
  const { data } = await api.get(`/task/getTasks/${idUser}?${query}`)
  return data
}
