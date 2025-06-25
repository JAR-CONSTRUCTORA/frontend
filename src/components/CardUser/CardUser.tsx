import { User } from '@/types'
import { User2 } from 'lucide-react'
import React from 'react'
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
    <div className="group relative rounded-2xl border border-white/10 bg-[#1f1f1f] p-6 shadow-md transition-all hover:bg-[#2c2c2c] hover:shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3b3b3b] text-white">
          <User2 className="h-6 w-6" />
        </div>
        <div className="flex flex-col justify-center space-y-1 text-sm text-gray-200">
          <div>
            <h3 className="text-xl leading-tight font-bold text-white">
              {firstName} {lastName}
            </h3>
            <span className="text-sm text-gray-400">Cargo: {role}</span>
          </div>
          <p className="line-clamp-2 break-words text-gray-300">
            <span className="font-semibold">Usuario:</span> {username}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Contraseña:</span> {password}
          </p>
        </div>
        <DropdownMenuActions />
      </div>
    </div>
  )
}

export default CardUser
