import { ModalAdminTask } from '@/components/ModalAdminTask'
import { Sidebar } from '@/components/Siderbar'
import { useAuthStore } from '@/store/authStore'

const DashboardAdmin = () => {
  const { user } = useAuthStore()
  return (
    <div className="mx-2 grid h-dvh grid-cols-12 gap-10 text-gray-200">
      <div className="col-span-2 my-2 rounded-xl border-2 border-white/20 bg-[#212121]">
        <Sidebar />
      </div>
      <div className="col-span-10 my-2 rounded-xl border-2 border-white/20 bg-[#212121]">
        <div className="mt-10 ml-2">
          <h2 className="text-xl font-medium">Create Task</h2>
        </div>
        <div className="mx-10 grid grid-cols-4 gap-2 gap-y-5">
          <div className="cursor-pointer rounded border-1 border-white/20">
            <ModalAdminTask />
          </div>
          <div className="rounded border-1 border-white/20">Task</div>
          <div>Task</div>
          <div>Task</div>
          <div>Task</div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
