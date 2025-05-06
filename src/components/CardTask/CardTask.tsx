import { Task } from '@/types'

type Props = Partial<Task> & {
  index: number
}

const CardTask: React.FC<Props> = ({
  index,
  description,
  location,
  status,
}) => {
  return (
    <div className="rounded-xl border border-white/10 bg-[#2a2a2a] p-4 transition-shadow hover:shadow-xl">
      <h3 className="mb-5 text-lg font-semibold">Task {index + 1}</h3>
      <div className="flex flex-col gap-1 font-medium text-gray-100">
        <p>Tarea: {description}</p>
        <p>Lugar: {location}</p>
        <p>
          Status: <span className="text-gray-400">{status}</span>
        </p>
      </div>
    </div>
  )
}

export default CardTask
