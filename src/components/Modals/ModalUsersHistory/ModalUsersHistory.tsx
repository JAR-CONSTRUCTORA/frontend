import { Button } from '@/components/ui/button'
import { User } from '@/types'
import { User2 } from 'lucide-react'

interface Prop {
  onClick: () => void
  usersUnsubscribed: User[]
}

const ModalUsersHistory: React.FC<Prop> = ({ onClick, usersUnsubscribed }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-fit w-full max-w-md flex-col overflow-hidden rounded-xl border border-white/10 bg-[#2a2a2a] shadow-lg">
        <div className="flex flex-col border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Historial usuarios</h3>
            <button className="text-2xl leading-none text-gray-400 hover:text-white">
              &times;
            </button>
          </div>
        </div>
        <div className="flex-1 space-y-4 overflow-x-hidden overflow-y-auto p-6 text-gray-400">
          <div className="grid gap-1">
            {usersUnsubscribed.map((user) => (
              <div className="flex w-full items-center gap-2 bg-black/30 px-5 py-2">
                <div>
                  <User2 />
                </div>
                <div className="flex gap-2">
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="flex justify-end">
              <Button onClick={onClick} className="bg-red-500 hover:bg-red-400">
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalUsersHistory
