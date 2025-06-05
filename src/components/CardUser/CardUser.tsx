import { User } from '@/types'
import { User2 } from 'lucide-react'
import React from 'react'

type Prop = User
const CardUser: React.FC<Prop> = ({
  firstName,
  lastName,
  password,
  role,
  username,
}) => {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-[#2a2a2a] p-4 transition-shadow hover:bg-gray-800 hover:shadow-xl">
      <div className="flex h-full gap-5">
        <div className="flex items-center">
          <span className="rounded-full border-1 p-5">
            <User2 />
          </span>
        </div>
        <div className="flex h-full flex-col justify-center gap-2 font-medium text-gray-100">
          <div>
            <h3 className="text-lg font-semibold">
              {firstName} {lastName}
            </h3>
            <span>Cargo: {role}</span>
          </div>
          <p className="line-clamp-2 break-words">
            Nombre de usuario: {username}
          </p>
          <p>Contraseña: {password}</p>
        </div>
      </div>
    </div>
  )
}

export default CardUser
