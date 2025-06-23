import { api } from '@/configs/axios'
import { Task, User } from '@/types'

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
