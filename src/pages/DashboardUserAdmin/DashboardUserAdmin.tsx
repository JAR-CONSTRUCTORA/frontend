import CardUser from '@/components/CardUser/CardUser'
import FilterUser from '@/components/Filters/FilterUser'
import ModalAdminCreateUser from '@/components/ModalAdminCreateUser/ModalAdminCreateUser'
import { Sidebar } from '@/components/Siderbar'
import MobileSidebar from '@/components/Siderbar/MobileSidebar'
import { api } from '@/configs/axios'
import { USER_CREATE_SUCCESS } from '@/constants/user/user-messages'
import { userSchema } from '@/schemas/formSchema'
import { useAuthStore } from '@/store/authStore'
import { User } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { z } from 'zod'

type userInfer = z.infer<typeof userSchema>

const DashboardUserAdmin = () => {
  const { user } = useAuthStore()
  const [users, setUsers] = useState<User[]>([])

  const getUsers = async () => {
    const usersResp = await axios('http://localhost:8000/user/workers')
    setUsers(usersResp.data.workers)
  }
  const createUser = async (e: userInfer) => {
    const createUserResp = await api.post('/user/createUser/', e, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (createUserResp.status === 200) alert(USER_CREATE_SUCCESS)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="h-dvh min-h-screen bg-[#1a1a1a] text-gray-200">
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
          <div className="h-full space-y-6 overflow-y-scroll">
            <div className="rounded-xl border border-white/10 bg-gray-800 p-4 transition-shadow hover:bg-gray-700 hover:shadow-xl">
              <ModalAdminCreateUser createUser={createUser} />
            </div>
            <FilterUser setUsers={setUsers} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {users.map((user) => (
                <CardUser key={user._id} {...user} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardUserAdmin
