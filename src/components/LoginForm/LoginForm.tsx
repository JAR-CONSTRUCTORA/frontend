'use client'

import type React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Building2, HardHat, User, Lock } from 'lucide-react'

interface LoginData {
  username: string
  password: string
}

type Props = {
  onSubmitLogin: (data: LoginData) => void
}

const LoginForm: React.FC<Props> = ({ onSubmitLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mb-4 flex items-center justify-between">
              <Building2 className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">
                Sistema de Gestión
              </h1>
              <img
                src="../../public/jar-logo.png"
                alt="JAR Construcciones"
                className="h-12 w-12 object-contain"
              />
            </div>
            <p className="text-sm text-slate-400">Tucumán, Argentina</p>
          </div>

          <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="flex items-center gap-2 text-sm text-slate-300"
              >
                <User className="h-4 w-4" />
                Usuario
              </label>
              <input
                type="text"
                id="username"
                placeholder="Ingrese su usuario"
                {...register('username', {
                  required: 'El usuario es requerido',
                })}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm text-slate-300"
              >
                <Lock className="h-4 w-4" />
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'La contraseña es requerida',
                  })}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 pr-12 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <span className="flex items-center justify-center gap-2">
                <HardHat className="h-5 w-5" />
                Acceder al Sistema
              </span>
            </button>
          </form>

          <div className="mt-8 border-t border-slate-700 pt-6 text-center text-xs text-slate-400">
            <p>© 2024 JAR Construcciones y Servicios</p>
            <p className="text-slate-500">Sistema de Gestión de Tareas</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
