import { Task } from '@/types'
import { Button } from '../ui/button'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { on } from 'events'
type Props = Partial<Task> & {
  index: number
  onClick: () => void
}

const CardTask: React.FC<Props> = ({
  index,
  _id,
  description,
  location,
  status,
  completedOnTime,
  onClick,
}) => {
  const l = useLocation()

  const startTask = async () => {
    await axios.put(
      `http://localhost:8000/task/startTask/${_id}`,
      {},
      {
        headers: {
          Content_Type: 'application/json',
        },
      },
    )
    alert('Se empezo el trabajo')
  }

  const endTask = async () => {
    const endedTaskResp = await axios.put(
      `http://localhost:8000/task/endTask/${_id}`,
      {},
      {
        headers: {
          Content_Type: 'application/json',
        },
      },
    )
    if (endedTaskResp.status === 200) alert('Se termino el trabajo')
  }

  return (
    <button
      onClick={onClick}
      className="group relative rounded-xl border border-white/10 bg-[#2a2a2a] p-4 transition-shadow hover:shadow-xl"
    >
      <h3 className="mb-5 text-lg font-semibold">Tarea {index + 1}</h3>
      <div className="flex flex-col gap-1 font-medium text-gray-100">
        <p className="truncate">Tarea: {description}</p>
        <p>Lugar: {location}</p>
        <p>
          Status:{' '}
          <span
            className={`text-gray-400 ${status === 'In progress' && 'text-red-500'} ${status === 'Completed' && 'text-green-500'}`}
          >
            {status}
          </span>
        </p>
        <p className={`${completedOnTime ? 'text-green-500' : 'text-red-500'}`}>
          {completedOnTime ? 'Completado en tiempo' : 'No completo a tiempo'}
        </p>
        <div className="mt-4 w-full">
          {l.pathname === '/dashboard' && status === 'Pending' && (
            <Button className="w-full" onClick={startTask}>
              Empezar tarea
            </Button>
          )}
          {l.pathname === '/dashboard' && status === 'In progress' && (
            <Button
              className="w-full bg-green-500 hover:bg-green-400"
              onClick={endTask}
            >
              Finalizar trabajo
            </Button>
          )}
        </div>
      </div>
      <span className="absolute top-full left-1/2 z-10 mt-2 hidden -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-sm text-white group-hover:block">
        Ver detalle
      </span>
    </button>
  )
}

export default CardTask
