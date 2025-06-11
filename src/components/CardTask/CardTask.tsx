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
  status,
  completedOnTime,
  incidence,
  onClick,
  startTask,
  endTask,
}) => {
  const l = useLocation()

  return (
    <div className="group relative cursor-pointer rounded-xl border border-white/10 bg-[#1f1f1f] p-4 transition-shadow hover:bg-gray-800 hover:shadow-xl">
      <div onClick={onClick}>
        <div className="flex flex-col gap-1 font-medium text-gray-100">
          <h3 className="mb-5 text-lg font-semibold">Nombre estacion</h3>
          {incidence && (
            <p className="line-clamp-2 break-words">
              Nro. Incidencia: {incidence}
            </p>
          )}

          <p className="line-clamp-2 break-words">Descripcion: {description}</p>
          <p>Lugar: {location}</p>
          <p>
            Estado:{' '}
            <span
              className={` ${status === 'En progreso' && 'text-blue-500'} ${status === 'Completada' && 'text-blue-500'}`}
            >
              {status}
            </span>
          </p>
          <p
            className={`${completedOnTime ? 'text-green-500' : 'text-red-400'}`}
          >
            {completedOnTime && 'Completado en tiempo'}
          </p>
        </div>
      </div>
      <div className="mt-4 w-full">
        {l.pathname === '/user/home' && status === 'Pendiente' && (
          <Button className="w-full" onClick={() => startTask?.(_id!)}>
            Empezar tarea
          </Button>
        )}
        {l.pathname === '/user/home' && status === 'En progreso' && (
          <Button
            className="z-5000 w-full bg-green-500 hover:bg-green-400"
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
