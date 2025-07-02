import { CardTask } from '@/components/CardTask'
import Filters from '@/components/Filters/Filters'
import ModalAdminDetailTask from '@/components/Modals/ModalAdminDetailTask/ModalAdminDetailTask'
import { ModalAdminTask } from '@/components/Modals/ModalAdminTask'
import { Sidebar } from '@/components/Siderbar'
import MobileSidebar from '@/components/Siderbar/MobileSidebar'
import { api } from '@/configs/axios'
import { editTask, getTasks } from '@/services/task/useTask'
import { useAuthStore } from '@/store/authStore'
import { useDataStore } from '@/store/dataStore'
import { Task } from '@/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const DashboardAdmin = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { setWorkers, workersList } = useDataStore()
  const [allTasksData, setAllTasksData] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const getWorkers = async () => {
    const workersResp = await api.get('/user/workers?active=true')
    setWorkers(workersResp.data?.workers)
  }

  const fetchTask = async () => {
    const data = await getTasks()
    setAllTasksData(data.allTasks)
  }

  const handleEdit = async (task: Task, e: any) => {
    const hasChanged =
      e.description !== task.description || e.location !== task.location

    if (!hasChanged) {
      toast.info('No se detectaron cambios.')
      return
    }

    const resp = await editTask(task, e, workersList)
    if (resp) {
      toast.success('Tarea editada con exito!')
      setSelectedTask(resp.task)
    }
  }
  useEffect(() => {
    getWorkers()
    fetchTask()
    if (user?.role != 'Admin') navigate('/dashboard')
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200">
      <div className="flex">
        <aside className="hidden h-screen w-64 flex-shrink-0 border-r border-white/10 bg-[#212121] p-4 lg:block">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 lg:p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Panel</h1>
                <p className="text-sm text-gray-400">
                  Administrador Principal • Rol: {user?.role}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Aquí podrás gestionar y crear tareas.
            </p>
            <div className="lg:hidden">
              <MobileSidebar />
            </div>
          </div>

          <div className="custom-scrollbar mx-2 h-[80dvh] space-y-6 overflow-y-scroll pr-4">
            <div className="mb-4 flex gap-4">
              <div className="w-[40%] rounded-xl border border-white/10 bg-gray-800 transition-shadow hover:bg-gray-700 hover:shadow-xl">
                <ModalAdminTask fetchTask={fetchTask} />
              </div>
              <div className="flex-1">
                <Filters setAllTasksData={setAllTasksData} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allTasksData?.map((task, i) => (
                <CardTask
                  key={i}
                  index={i}
                  {...task}
                  onClick={() => setSelectedTask(task)}
                />
              ))}
            </div>
          </div>

          {selectedTask && (
            <ModalAdminDetailTask
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
              setSelectedTask={setSelectedTask}
              handleEdit={handleEdit}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default DashboardAdmin
