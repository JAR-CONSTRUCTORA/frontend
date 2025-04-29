import { useAuthStore } from '@/store/authStore'
import { Button } from '../ui/button'
import { Check, House, Logs } from 'lucide-react'

const Sidebar = () => {
  const { user } = useAuthStore()
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="mt-10 flex w-full items-center justify-center gap-2">
        <div>
          <span className="rounded-full border-1 px-10 py-8"></span>
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

      <div className="mb-4 flex items-center justify-center">
        <Button
          type="button"
          className="bg-gray-300 text-gray-700 hover:bg-gray-200"
        >
          {'<-'}
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
