import { Sidebar } from '@/components/Siderbar'
import { TasksBoard } from '@/components/TasksBoard'
import { useAuthStore } from '@/store/authStore'
import axios from 'axios'
import { useEffect } from 'react'

const Dashboard = () => {
  const { user } = useAuthStore()

  const getTasks = async () => {
    const tasksResp = await axios.get(
      `http://localhost:8000/task/getTasks/${user?._id}`,
    )
    console.log(tasksResp)
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="mx-2 grid h-dvh grid-cols-12 gap-10 text-gray-100">
      <div className="col-span-2 my-2 rounded-xl border-2 border-white/20 bg-[#212121]">
        <Sidebar />
      </div>
      <div className="col-span-10 my-2 rounded-xl border-2 border-white/20 bg-[#212121] px-4">
        <div className="mt-10 flex gap-2">
          <p className="w-fit gap-1 border-b-4 border-green-300 text-2xl font-semibold tracking-wider">
            All
          </p>
          <p className="w-fit gap-1 text-2xl font-semibold tracking-wider">
            Tasks
          </p>
        </div>
        <TasksBoard />
      </div>
    </div>
  )
}

export default Dashboard
