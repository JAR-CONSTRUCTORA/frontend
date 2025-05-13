import { Task } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Info, TimerIcon, MapPin, CheckCircle2 } from 'lucide-react'

type Props = {
  task: Task
}

const ModalAdminDetailTask: React.FC<Props> = ({ task }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-gray-700 hover:bg-gray-600">
          <Info className="mr-2 h-4 w-4" />
          Ver detalle
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border border-white/10 bg-[#1a1a1a] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            Detalles de la Tarea
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TimerIcon className="text-gray-400" />
            <span className="font-medium">Descripción:</span> {task.description}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-gray-400" />
            <span className="font-medium">Ubicación:</span> {task.location}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Estado:</span>
            <span
              className={`${task.status === 'In progress' ? 'text-red-500' : ''} ${task.status === 'Completed' ? 'text-green-500' : 'text-gray-400'}`}
            >
              {task.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-gray-400" />
            {task.completedOnTime ? (
              <span className="font-medium text-green-500">
                Completado en tiempo
              </span>
            ) : (
              <span className="font-medium text-red-500">
                No completado a tiempo
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ModalAdminDetailTask
