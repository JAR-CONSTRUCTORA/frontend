import { User } from '@/types'
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
      <div>
        <div className="flex flex-col gap-1 font-medium text-gray-100">
          <h3 className="mb-5 text-lg font-semibold">
            Empleado: {firstName} {lastName}
          </h3>

          <p className="line-clamp-2 break-words">{username}</p>
          <p>Contraseña: {password}</p>
          <p>Cargo:{role}</p>
        </div>
      </div>
      <div className="mt-4 w-full"></div>
      <span className="absolute top-full left-1/2 z-10 mt-2 hidden -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-sm text-white group-hover:block">
        Ver detalle
      </span>
    </div>
  )
}

export default CardUser
