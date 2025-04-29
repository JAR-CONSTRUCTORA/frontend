import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const ModalAdminTask = () => {
  const [assignessArray, setAssignessArray] = useState(Array(1).fill(null))
  const addWorker = () => {
    setAssignessArray([...assignessArray, null])
  }
  return (
    <Dialog>
      <DialogTrigger>
        <span>+ Create task (Sale modal)</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            <form className="flex flex-col gap-4">
              <div className="mt-2 flex flex-col gap-2">
                <Label>Descripcion</Label>
                <Input
                  type="text"
                  placeholder="Arreglar aire acondicionado..."
                />
              </div>
              <div className="flex w-full gap-2">
                <div className="flex w-full flex-col gap-1">
                  <Label>Direccion</Label>
                  <Input type="text" placeholder="Rivadavia 1200..." />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Label>Tiempo:</Label>
                  <Input type="number" placeholder="2 horas" />
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex">
                  <Label>Asigna trabajadores:</Label>
                  <Button type="button" className="w-fit" onClick={addWorker}>
                    +
                  </Button>
                </div>
                {assignessArray.map((_, index) => (
                  <div className="flex flex-col justify-center">
                    <p>Dropdown Menu W/Workers</p>
                  </div>
                ))}
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAdminTask
