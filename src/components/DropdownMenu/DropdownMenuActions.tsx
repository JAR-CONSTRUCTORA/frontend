import { Delete, Menu, Pen } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '../ui/dropdown-menu'

interface Prop {
  idUser: string
  unsubscribeUser: (idUser: string) => void
}
const DropdownMenuActions: React.FC<Prop> = ({ idUser, unsubscribeUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-gray-700"
        >
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 border border-gray-800 bg-gray-800"
        align="center"
      >
        <DropdownMenuLabel className="flex items-center gap-2 text-sm font-bold text-gray-300">
          <Pen size={15} />
          Acciones:
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer text-sm text-gray-300"
            onClick={() => unsubscribeUser(idUser)}
          >
            <Delete size={15} color="red" />
            Dar de baja
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownMenuActions
