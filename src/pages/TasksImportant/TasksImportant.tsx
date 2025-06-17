import { Container } from '@/components/Container'
import { Dashboard } from '@/components/Dashboard'
import { Sidebar } from '@/components/Siderbar'
import { useAuthStore } from '@/store/authStore'
import { Task } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

const TasksImportant = () => {
  const { user } = useAuthStore()
  const [tasksData, setTasksData] = useState<Task[]>([])
  const getTasksImportant = async () => {
    const taskResp = await axios.get(
      `http://localhost:8000/task/getTasks/${user?._id}?status=En progreso`,
    )
    setTasksData(taskResp.data.tasks)
  }

  useEffect(() => {
    getTasksImportant()
  }, [])

  return (
    <Container>
      <aside className="mb-4 h-[calc(100vh-2rem)] rounded-2xl border border-white/10 bg-[#212121] p-4 shadow-lg lg:col-span-2 lg:mr-4 lg:mb-0">
        <Sidebar />
      </aside>
      <Dashboard section="Tareas Importantes" data={tasksData} />
    </Container>
  )
}

export default TasksImportant
