import { User } from '@/types'
import { DropdownMenuActions } from '../DropdownMenu'

interface Prop extends User {
  unsubscribeUser: (id: string) => void
}
const CardUser: React.FC<Prop> = ({
  _id,
  firstName,
  lastName,
  password,
  role,
  username,
  unsubscribeUser,
}) => {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-[#1f1f1f] p-4 hover:shadow-xl">
      <div className="flex items-start gap-4">
        <div className="flex flex-1 flex-col justify-center space-y-2 text-sm text-gray-200">
          <h3 className="text-lg leading-tight font-bold text-white">
            {firstName} {lastName}
          </h3>

          <div>
            <p className="text-gray-300">
              <span className="font-semibold">Cargo:</span> {role}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Usuario:</span> {username}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Contraseña:</span> {password}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <DropdownMenuActions unsubscribeUser={unsubscribeUser} idUser={_id} />
        </div>
      </div>
    </div>
  )
}

export default CardUser
