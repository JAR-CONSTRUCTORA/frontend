import { useAuthStore } from '@/store/authStore'
import { Button } from '../ui/button'
import {
  ArrowBigLeft,
  Check,
  House,
  Logs,
  ShieldUser,
  User,
} from 'lucide-react'

const Sidebar = () => {
  const { user } = useAuthStore()

  const handleSignOut = () => {
    useAuthStore.persist.clearStorage()
    useAuthStore.setState({ user: null, token: null })
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="mt-10 flex w-full items-center justify-center gap-2">
        <div className="flex">
          <span className="rounded-full border-2 border-white/65 px-4 py-4">
            {user?.role === 'Admin' ? (
              <ShieldUser className="text-amber-500" />
            ) : (
              <User />
            )}
          </span>
        </div>
        <div className="text-lg font-medium tracking-wide">
          <h4>{user?.firstName}</h4>
          <h4>{user?.lastName}</h4>
        </div>
      </div>
      <ul className="flex w-full cursor-pointer flex-col items-center">
        <li className="flex w-full items-center justify-center gap-2 py-2 hover:bg-white/30">
          <House className="h-5 w-5" />
          <span className="text-sm">All Tasks</span>
        </li>
        <li className="flex w-full items-center justify-center gap-2 py-2 hover:bg-white/30">
          <Logs className="h-5 w-5" />
          <span className="text-sm">Important!</span>
        </li>
        <li className="flex w-full items-center justify-center gap-2 py-2 hover:bg-white/30">
          <Check className="h-5 w-5" />
          <span className="text-sm">Completed!</span>
        </li>
      </ul>

      <div
        className="mb-4 flex cursor-pointer items-center justify-center rounded-md border-2 border-white/25 bg-inherit py-6 font-bold text-gray-300 hover:bg-white/30"
        onClick={() => handleSignOut()}
      >
        <ArrowBigLeft />
        <span>Sign Out</span>
      </div>
    </div>
  )
}

export default Sidebar
