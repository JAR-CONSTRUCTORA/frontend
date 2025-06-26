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
        <Button variant="ghost">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="center">
        <DropdownMenuLabel className="flex items-center gap-1">
          <span>
            <Pen size={15} />
          </span>
          Acciones
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => unsubscribeUser(idUser)}
          >
            <span>
              <Delete color="red" size={15} />
            </span>
            Dar de baja
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownMenuActions
