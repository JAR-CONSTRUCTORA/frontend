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
        <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-2xl backdrop-blur-sm">
          <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-blue-600/20 to-transparent" />
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-slate-600/20 to-transparent" />

          <div className="relative z-10 mb-2 text-center">
            <div className="mb-4 flex items-center justify-between gap-4">
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

          <form
            onSubmit={handleSubmit(onSubmitLogin)}
            className="relative z-10 space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="flex items-center gap-2 text-sm font-medium text-slate-300"
              >
                <User className="h-4 w-4" />
                Usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  placeholder="Ingrese su usuario"
                  {...register('username', {
                    required: 'El usuario es requerido',
                  })}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-slate-300"
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
                  className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 pr-12 text-white placeholder-slate-400 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors duration-200 hover:text-white"
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
              className="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none"
            >
              <span className="flex items-center justify-center gap-2">
                <HardHat className="h-5 w-5" />
                Acceder al Sistema
              </span>
            </button>
          </form>

          <div className="relative z-10 mt-8 border-t border-slate-700/50 pt-6 text-center">
            <p className="text-xs text-slate-400">
              © 2024 JAR Construcciones y Servicios
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Sistema de Gestión de Tareas
            </p>
          </div>
        </div>

        <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-blue-600/20" />
        <div className="absolute -right-4 -bottom-4 h-6 w-6 rounded-full bg-slate-600/20" />
      </div>
    </div>
  )
}

export default LoginForm
