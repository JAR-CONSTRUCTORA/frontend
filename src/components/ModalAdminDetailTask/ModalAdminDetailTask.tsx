import { Task } from '@/types'
import { Button } from '../ui/button'

type Props = {
  task: Task
  onClose: () => void
}

const ModalAdminDetailTask: React.FC<Props> = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#2a2a2a] p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Detalles de la Tarea</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Descripción</p>
            <p className="text-white">{task.description}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Ubicación</p>
            <p className="text-white">{task.location}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Estado</p>
            <p
              className={`font-medium ${
                task.status === 'In progress'
                  ? 'text-red-500'
                  : task.status === 'Completed'
                    ? 'text-green-500'
                    : 'text-gray-400'
              }`}
            >
              {task.status}
            </p>
          </div>

          {task.status === 'Completed' && (
            <div>
              <p className="text-sm text-gray-400">Completado a tiempo</p>
              <p
                className={
                  task.completedOnTime ? 'text-green-500' : 'text-red-500'
                }
              >
                {task.completedOnTime ? 'Sí' : 'No'}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModalAdminDetailTask
