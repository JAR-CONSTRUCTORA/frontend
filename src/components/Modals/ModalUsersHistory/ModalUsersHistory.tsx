import { Button } from '@/components/ui/button'

interface Prop {
  onClick: () => void
}

const ModalUsersHistory: React.FC<Prop> = ({ onClick }) => {
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
          <div className="flex">
            <div className="w-full border-t-1 border-b-1 border-white/35"></div>
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
