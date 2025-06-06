import { Container } from '@/components/Container'
import { Dashboard } from '@/components/Dashboard'
import { Sidebar } from '@/components/Siderbar'
import { api } from '@/configs/axios'
import { USER_SEND_NOTE } from '@/constants/user/user-messages'
import { useAuthStore } from '@/store/authStore'
import { Task } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const HomeUser = () => {
  const { user } = useAuthStore()
  const [tasksData, setTasksData] = useState<Task[]>([])

  const getTasks = async () => {
    const tasksResp = await api.get(`/task/getTasks/${user?._id}`)
    setTasksData(tasksResp.data.tasks)
  }

  const startTask = async (id: string) => {
    await api.put(
      `/task/startTask/${id}`,
      {},
      {
        headers: {
          Content_Type: 'application/json',
        },
      },
    )
    if (getTasks) getTasks()
    toast.success('Se empezo el trabajo')
  }

  const endTask = async (id: string) => {
    const endedTaskResp = await api.put(
      `/task/endTask/${id}`,
      {},
      {
        headers: {
          Content_Type: 'application/json',
        },
      },
    )
    if (getTasks) getTasks()
    endedTaskResp.data.task.completedOnTime
      ? toast.success('¡Tarea finalizada a tiempo! 🎉 Excelente trabajo.', {
          duration: 4000,
          icon: '🏅',
        })
      : toast('Finalizada correctamente.', {
          icon: '🛠️',
        })
  }
  const sendNote = async (id: string, idSender: string, content: string) => {
    const noteResp = await api.put(
      `/task/sendnote/${id}`,
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
    if (noteResp.status === 200) {
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
