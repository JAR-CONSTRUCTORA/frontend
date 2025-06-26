import CardUser from '@/components/CardUser/CardUser'
import FilterUser from '@/components/Filters/FilterUser'
import ModalAdminCreateUser from '@/components/Modals/ModalAdminCreateUser/ModalAdminCreateUser'
import { ModalUsersHistory } from '@/components/Modals/ModalUsersHistory'
import { Sidebar } from '@/components/Siderbar'
import MobileSidebar from '@/components/Siderbar/MobileSidebar'
import { Button } from '@/components/ui/button'
import {
  USER_CREATE_SUCCESS,
  USER_NOT_FOUNDED,
} from '@/constants/user/user-messages'
import { userSchema } from '@/schemas/formSchema'
import {
  useCreateUser,
  useGetUser,
  useGetUsers,
  useUnsubscribeUser,
} from '@/services/user/useUser'
import { useAuthStore } from '@/store/authStore'
import { User } from '@/types'
import { UserRoundX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

type userInfer = z.infer<typeof userSchema>

const DashboardUserAdmin = () => {
  const { user } = useAuthStore()
  const [users, setUsers] = useState<User[]>([])
  const [usersUnsubscribed, setUsersUnsubscribed] = useState<User[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  const getUsers = async () => {
    const data = await useGetUsers('true')
    setUsers(data.workers)
  }

  const createUser = async (e: userInfer) => {
    const data = await useCreateUser(e)
    if (data) alert(USER_CREATE_SUCCESS)
    getUsers()
  }

  const searchUser = async (
    prompt: string,
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setIsSearching(true)
    const data = await useGetUser(prompt)
    if (data.userFounded.lenght > 0) {
      setUsers(data.userFounded)
      setIsSearching(false)
    } else {
      toast.error(USER_NOT_FOUNDED)
      setIsSearching(false)
    }
  }

  const unsubscribeUser = async (id: string) => {
    const data = await useUnsubscribeUser(id)
    if (data) alert(data.message)
    getUsers()
  }

  const getUsersInactive = async () => {
    const data = await useGetUsers('false')
    setUsersUnsubscribed(data.workers)
  }

  useEffect(() => {
    getUsers()
    getUsersInactive()
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
              <div>
                <Button
                  variant={'ghost'}
                  onClick={() => setOpenModal(true)}
                  className="rounded-full"
                >
                  <UserRoundX />
                </Button>
                {openModal && (
                  <ModalUsersHistory
                    onClick={() => setOpenModal(false)}
                    usersUnsubscribed={usersUnsubscribed}
                  />
                )}
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Aquí podrás gestionar y crear usuarios.
            </p>
            <div className="lg:hidden">
              <MobileSidebar />
            </div>
          </div>

          <div className="custom-scrollbar mx-2 h-[80dvh] space-y-6 overflow-y-scroll pr-4">
            <div className="mb-4 flex gap-4">
              <div className="w-[40%] rounded-xl border border-white/10 bg-gray-800 transition-shadow hover:bg-gray-700 hover:shadow-xl">
                <ModalAdminCreateUser createUser={createUser} />
              </div>
              <div className="flex-1">
                <FilterUser
                  setUsers={setUsers}
                  searchUser={searchUser}
                  getUsers={getUsers}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {users.map((user) => (
                <CardUser
                  key={user._id}
                  {...user}
                  unsubscribeUser={unsubscribeUser}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardUserAdmin
