import { Task } from '@/types'
import { Button } from '../../ui/button'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/authStore'

interface Prop extends Task {
  setSelectedTask: (arg: null) => void
  sendNote?: (id: string, userId: string, note: string) => void
}

const ModalUserDetailTask: React.FC<Prop> = ({
  description,
  location,
  status,
  completedOnTime,
  _id,
  setSelectedTask,
  sendNote,
}) => {
  const { user } = useAuthStore()
  const { register, watch, handleSubmit } = useForm()
  const values = watch()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-xl border border-white/10 bg-[#2a2a2a] shadow-lg">
        <div className="flex flex-col border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Estación</h3>
            <button
              onClick={() => setSelectedTask(null)}
              className="text-2xl leading-none text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="flex-1 space-y-4 overflow-x-hidden overflow-y-auto p-6 text-gray-400">
          <div>
            <h4 className="text-sm font-semibold text-white">Descripción</h4>
            <p className="break-words">{description}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Ubicación</h4>
            <p className="break-words">{location}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Estado</h4>
            <p
              className={`w-full text-sm font-medium ${
                status === 'En progreso'
                  ? 'text-red-500'
                  : status === 'Completada'
                    ? 'text-green-500'
                    : 'text-gray-400'
              }`}
            >
              {status}
            </p>
          </div>
          {status === 'Completada' && (
            <div>
              <p className="text-sm text-white">Completado a tiempo</p>
              <p
                className={completedOnTime ? 'text-green-500' : 'text-red-500'}
              >
                {completedOnTime ? 'Sí' : 'No'}
              </p>
            </div>
          )}
          <div>
            {status !== 'Pendiente' ? (
              <div className="flex flex-col gap-2">
                <h4>Nota:</h4>
                <textarea
                  id="message"
                  className="block min-h-20 w-full rounded-md border border-white/15 bg-white/0 p-3 text-sm font-medium text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Nota sobre el trabajo realizado..."
                  {...register('note')}
                />
                {values.note && (
                  <Button
                    onClick={handleSubmit(() => {
                      user?._id && sendNote?.(_id, user._id, values.note)
                    })}
                  >
                    Enviar Nota
                  </Button>
                )}
              </div>
            ) : null}
          </div>
        </div>
        <div className="border-t border-white/10 p-4">
          <div className="flex justify-end">
            <Button
              className="bg-red-500 hover:bg-red-400"
              onClick={() => setSelectedTask(null)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalUserDetailTask
