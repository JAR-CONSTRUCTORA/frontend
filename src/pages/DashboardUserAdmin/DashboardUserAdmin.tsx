import ModalAdminCreateUser from '@/components/ModalAdminCreateUser/ModalAdminCreateUser'
import { Sidebar } from '@/components/Siderbar'
import MobileSidebar from '@/components/Siderbar/MobileSidebar'
import { useAuthStore } from '@/store/authStore'

const DashboardUserAdmin = () => {
  const { user } = useAuthStore()
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
              Aquí podrás gestionar y crear usuarios.
            </p>
          </div>
          <div className="lg:hidden">
            <MobileSidebar />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-gray-800 p-4 transition-shadow hover:bg-gray-700 hover:shadow-xl">
              <ModalAdminCreateUser />
            </div>

            <div className="grid h-[50dvh] grid-cols-1 gap-4 overflow-y-scroll sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"></div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardUserAdmin
