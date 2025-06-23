import { Container } from '@/components/Container'
import { Dashboard } from '@/components/Dashboard'
import { Sidebar } from '@/components/Siderbar'
import {
  TASK_COMPLETED_SUCCESSFULL_NORMAL,
  TASK_COMPLETED_SUCCESSFULL_ON_TIME,
  TASK_STARTED,
} from '@/constants/task/task-messages'
import { USER_SEND_NOTE } from '@/constants/user/user-messages'
import {
  endTaskUser,
  getTaskByUser,
  sendUserNote,
  startTaskUser,
} from '@/services/task/useTask'
import { useAuthStore } from '@/store/authStore'
import { Task } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const HomeUser = () => {
  const { user } = useAuthStore()
  const [tasksData, setTasksData] = useState<Task[]>([])

  const getTasks = async () => {
    const data = await getTaskByUser(user?._id)
    setTasksData(data.tasks)
  }

  const startTask = async (id: string) => {
    await startTaskUser(id)
    if (getTasks) getTasks()
    toast.success(TASK_STARTED)
  }

  const endTask = async (id: string) => {
    const data = await endTaskUser(id)
    if (getTasks) getTasks()
    data.task.completedOnTime
      ? toast.success(TASK_COMPLETED_SUCCESSFULL_ON_TIME, {
          duration: 4000,
          icon: '🏅',
        })
      : toast(TASK_COMPLETED_SUCCESSFULL_NORMAL, {
          icon: '🛠️',
        })
  }
  const sendNote = async (id: string, idSender: string, content: string) => {
    const data = await sendUserNote(id, idSender, content)
    if (data) {
      toast.success(USER_SEND_NOTE)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <Container>
      <aside className="mb-4 h-[calc(100vh-2rem)] rounded-2xl border border-white/10 bg-[#212121] p-4 shadow-lg lg:col-span-2 lg:mr-4 lg:mb-0">
        <Sidebar />
      </aside>
      <Dashboard
        data={tasksData}
        getTasks={getTasks}
        startTask={startTask}
        endTask={endTask}
        sendNote={sendNote}
        section="Tareas"
      />
    </Container>
  )
}

export default HomeUser
