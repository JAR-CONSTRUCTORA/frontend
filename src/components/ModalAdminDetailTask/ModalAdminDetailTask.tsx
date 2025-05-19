import { Task } from '@/types'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ComboBoxWorkers } from '../ComboBoxWorkers'

type Props = {
  task: Task
  onClose: () => void
}

const ModalAdminDetailTask: React.FC<Props> = ({ task, onClose }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { register, handleSubmit } = useForm()

  const handleEdit = (e: any) => {
    console.log(e)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[80vh] w-full max-w-md flex-col rounded-xl border border-white/10 bg-[#2a2a2a] shadow-lg">
        {/* Header */}
        <div className="border-b border-white/10 p-6">
          {isEdit && (
            <p className="text-sm text-green-500">Modo de edicion de tarea</p>
          )}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Estacion</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>
        </div>
        {/* Contenido con scroll */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6 text-gray-400">
          <div>
            <h4 className="text-sm">Descripcion</h4>
            <input
              className="w-full text-sm"
              value={isEdit ? undefined : task.description}
              {...register('description')}
              readOnly={!isEdit}
            />
          </div>
          <div>
            <h4 className="text-sm">Ubicación</h4>
            <input
              className="w-full text-sm"
              value={isEdit ? undefined : task.location}
              {...register('location')}
              readOnly={!isEdit}
            />
          </div>
          <div>
            <h4 className="text-sm">Estado</h4>
            <p
              className={`w-full text-sm font-medium ${
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
          <div>
            <p className="text-sm text-gray-400">Asignados:</p>
            <div className="mt-2 flex flex-col gap-2">
              {isEdit ? (
                task.assignees.map((user, index) => (
                  <ComboBoxWorkers {...user} isEdit={isEdit} i={index} />
                ))
              ) : (
                <div className="flex w-fit flex-col gap-2">
                  {task.assignees.map((user) => (
                    <Button disabled>
                      {user.firstName} {user.lastName}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
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
        </div>
        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <div className="flex justify-between">
            {isEdit ? (
              <div className="flex gap-2">
                <Button
                  className="bg-green-500 hover:bg-green-400"
                  onClick={handleSubmit(handleEdit)}
                >
                  Guardar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEdit(false)}
                  className="bg-red-500"
                >
                  Cancelar Cambios
                </Button>
              </div>
            ) : (
              <Button
                className="bg-green-500 hover:bg-green-400"
                onClick={() => setIsEdit(true)}
              >
                Editar
              </Button>
            )}

            <Button className="bg-red-500 hover:bg-red-400" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAdminDetailTask
