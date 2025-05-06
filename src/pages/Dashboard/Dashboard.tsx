import { CardTask } from '@/components/CardTask'
import { Sidebar } from '@/components/Siderbar'
import { useAuthStore } from '@/store/authStore'
import { Task } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const { user } = useAuthStore()
  const [tasksData, setTasksData] = useState<Task[]>([])
  console.log(tasksData)

  const getTasks = async () => {
    const tasksResp = await axios.get(
      `http://localhost:8000/task/getTasks/${user?._id}`,
    )
    setTasksData(tasksResp.data.tasks)
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="grid grid-cols-1 bg-[#1a1a1a] px-4 py-2 text-gray-200 lg:grid-cols-12">
      <aside className="mb-4 h-[calc(100vh-2rem)] rounded-2xl border border-white/10 bg-[#212121] p-4 shadow-lg lg:col-span-2 lg:mr-4 lg:mb-0">
        <Sidebar />
      </aside>
      <main className="rounded-2xl border border-white/10 bg-[#212121] p-6 shadow-lg lg:col-span-10">
        <header className="mb-6 flex gap-2">
          <p className="w-fit gap-1 border-b-4 border-green-300 text-2xl font-semibold tracking-wider">
            All
          </p>
          <p className="w-fit gap-1 text-2xl font-semibold tracking-wider">
            Tasks
          </p>
        </header>
        <section className="grid grid-cols-4 gap-6">
          {tasksData.map((task, i) => (
            <CardTask key={task._id} {...task} index={i} />
          ))}
        </section>
      </main>
    </div>
  )
}

export default Dashboard
