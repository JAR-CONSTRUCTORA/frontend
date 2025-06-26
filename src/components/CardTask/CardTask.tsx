import { Task } from '@/types'
import { Button } from '../ui/button'
import { useLocation } from 'react-router-dom'

type Props = Partial<Task> & {
  index: number
  onClick?: () => void
  getTasks?: () => void
  startTask?: (id: string) => void
  endTask?: (id: string) => void
}

const CardTask: React.FC<Props> = ({
  _id,
  description,
  location,
  station,
  status,
  completedOnTime,
  incidence,
  onClick,
  startTask,
  endTask,
  estimatedTime,
}) => {
  const l = useLocation()

  return (
    <div className="group relative cursor-pointer rounded-xl border border-white/10 bg-[#1f1f1f] p-4 transition-shadow hover:bg-gray-800 hover:shadow-xl">
      <div onClick={onClick} className="space-y-2 text-sm">
        <h3 className="text-lg font-bold text-white">{station}</h3>

        {incidence && (
          <div>
            <p className="font-semibold text-gray-400">Nro. Incidencia</p>
            <p className="break-words text-gray-200">{incidence}</p>
          </div>
        )}

        <div>
          <p className="font-semibold text-gray-400">Descripción</p>
          <p className="line-clamp-2 break-words text-gray-200">
            {description}
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-400">Lugar</p>
          <p className="text-gray-200">{location}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-400">Estado</p>
          <p
            className={`font-medium ${
              status === 'En progreso' || status === 'Completada'
                ? 'text-blue-500'
                : 'text-gray-200'
            }`}
          >
            {status}
          </p>
        </div>

        {status !== 'Completada' && (
          <div>
            <p className="font-semibold text-gray-400">Tiempo estimado</p>
            <p className="text-gray-200">{estimatedTime} horas</p>
          </div>
        )}

        {status === 'Completada' && (
          <div>
            <p className="font-semibold text-gray-400">Resultado</p>
            <p
              className={`${
                completedOnTime ? 'text-green-500' : 'text-red-400'
              } font-medium`}
            >
              {completedOnTime
                ? 'Completado en tiempo'
                : 'Finalizado fuera de tiempo'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 w-full">
        {l.pathname === '/user/home' && status === 'Pendiente' && (
          <Button className="w-full" onClick={() => startTask?.(_id!)}>
            Empezar tarea
          </Button>
        )}
        {l.pathname === '/user/home' && status === 'En progreso' && (
          <Button
            className="w-full bg-green-500 hover:bg-green-400"
            onClick={() => endTask?.(_id!)}
          >
            Finalizar trabajo
          </Button>
        )}
      </div>

      <span className="absolute top-full left-1/2 z-10 mt-2 hidden -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-sm text-white group-hover:block">
        Ver detalle
      </span>
    </div>
  )
}

export default CardTask
