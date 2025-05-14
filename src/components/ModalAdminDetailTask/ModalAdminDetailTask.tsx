import { Task } from '@/types'
import { Button } from '../ui/button'
import { useState } from 'react'

type Props = {
  task: Task
  onClose: () => void
}

const ModalAdminDetailTask: React.FC<Props> = ({ task, onClose }) => {
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({})

  const toggleExpand = (field: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const renderTextWithToggle = (
    text: string,
    field: string,
    maxLength = 100,
  ) => {
    const isExpanded = expandedDescriptions[field] || false

    if (text.length <= maxLength) {
      return <p className="break-words text-white">{text}</p>
    }

    return (
      <div>
        <p className="break-words text-white">
          {isExpanded ? text : `${text.substring(0, maxLength)}...`}
        </p>
        <button
          onClick={() => toggleExpand(field)}
          className="mt-1 text-sm text-blue-400 hover:text-blue-300"
        >
          {isExpanded ? 'Leer menos' : 'Leer más'}
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[80vh] w-full max-w-md flex-col rounded-xl border border-white/10 bg-[#2a2a2a] shadow-lg">
        {/* Header */}
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Detalles de la Tarea</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          <div>
            <p className="text-sm text-gray-400">Descripción</p>
            {renderTextWithToggle(task.description, 'description')}
          </div>

          <div>
            <p className="text-sm text-gray-400">Ubicación</p>
            {renderTextWithToggle(task.location, 'location')}
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

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="bg-red-400 hover:bg-red-300"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAdminDetailTask
