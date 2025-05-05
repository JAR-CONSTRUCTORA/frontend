import { ModalAdminTask } from '@/components/ModalAdminTask'
import { Sidebar } from '@/components/Siderbar'
// import { useAuthStore } from '@/store/authStore'

const DashboardAdmin = () => {
  // const { user } = useAuthStore() no se usa porque no se necesita en este momento
  return (
    <div className="mx-2 grid h-dvh grid-cols-12 gap-6 text-gray-200">
      <aside className="col-span-2 my-2 rounded-xl border border-white/20 bg-[#212121]">
        <Sidebar />
      </aside>

      <main className="col-span-10 my-2 rounded-xl border border-white/20 bg-[#212121] p-6">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold">Create Task</h2>
        </header>

        <section className="grid grid-cols-4 gap-4">
          <div className="cursor-pointer rounded-lg border border-white/20 p-4">
            <ModalAdminTask />
          </div>
          <div className="rounded-lg border border-white/20 p-4">Task</div>
          <div className="rounded-lg border border-white/20 p-4">Task</div>
          <div className="rounded-lg border border-white/20 p-4">Task</div>
          <div className="rounded-lg border border-white/20 p-4">Task</div>
        </section>
      </main>
    </div>
  )
}

export default DashboardAdmin
