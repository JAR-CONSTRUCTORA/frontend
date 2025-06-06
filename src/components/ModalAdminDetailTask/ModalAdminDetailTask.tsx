import { Task } from '@/types'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ComboBoxWorkers } from '../ComboBoxWorkers'

type Props = {
  task: Task
  onClose: () => void
  setSelectedTask: (arg: Task) => void
  handleEdit: (task: Task, e: any) => void
}

const ModalAdminDetailTask: React.FC<Props> = ({
  task,
  onClose,
  handleEdit,
}) => {
  console.log(task)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { description: task.description, location: task.location },
  })

  const handleClose = () => {
    reset({
      description: task.description,
      location: task.location,
    })
    setIsEdit(false)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 text-white">
      <div className="flex w-full max-w-md flex-col rounded-xl border border-white/10 bg-[#2a2a2a] shadow-lg">
        {/* Header */}
        <div className="flex flex-col border-b border-white/10 p-6">
          <div className="min-h-[1rem]">
            {isEdit && (
              <p className="text-xs text-green-500">Modo de edicion de tarea</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Estacion: {task.station}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>
        </div>
        {/* Contenido con scroll */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6 text-gray-200">
          <div className="flex gap-2">
            <h4 className="text-sm font-bold">Descripcion:</h4>
            <input
              className="w-full text-sm"
              {...register('description')}
              readOnly={!isEdit}
            />
          </div>
          <div className="flex gap-2">
            <h4 className="text-sm font-bold">Ubicación:</h4>
            <input
              className="w-full text-sm"
              {...register('location')}
              readOnly={!isEdit}
            />
          </div>
          <div className="flex gap-2">
            <h4 className="text-sm font-bold">Estado:</h4>
            <p
              className={`w-full text-sm font-medium ${
                task.status === 'En progeso'
                  ? 'text-red-500'
                  : task.status === 'Completada'
                    ? 'text-green-500'
                    : 'text-gray-400'
              }`}
            >
              {task.status}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Trabajadores asignados:</p>
            <div className="mt-2 flex w-full flex-col gap-2">
              {isEdit ? (
                task.assignees.map((user, index) => (
                  <ComboBoxWorkers {...user} isEdit={isEdit} i={index} />
                ))
              ) : (
                <div className="flex w-full flex-col gap-2">
                  {task.assignees?.map((user) => (
                    <Button disabled className="w-full bg-red-500">
                      {user?.firstName} {user?.lastName}
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
          <div className="flex flex-col flex-wrap">
            {task.notes.length > 0 && (
              <div>
                <h4>Notas de trabajadores:</h4>
                {task.notes?.map((note) => (
                  <div className="flex gap-2 border-1 border-white/35 px-4 py-1">
                    <span className="flex items-end text-sm">
                      {note?.sender.firstName} {note?.sender.lastName}
                    </span>
                    :<p>{note?.content}</p>
                  </div>
                ))}
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
                  onClick={handleSubmit((e) => handleEdit(task, e))}
                >
                  Guardar
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClose}
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
