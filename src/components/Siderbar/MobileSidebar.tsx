import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import {
  LogOut,
  Check,
  House,
  Logs,
  ShieldUser,
  User,
  Menu,
  X,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { LOGOUT_QUESTION } from '@/constants/auth/logout-message'

const MobileSidebar = () => {
  const { user } = useAuthStore()
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const basePath = user?.role === 'Admin' ? 'admin' : 'user'
  const path = {
    pathOne: user?.role === 'Admin' ? 'create-user' : 'important-tasks',
  }

  const handleSignOut = () => {
    useAuthStore.persist.clearStorage()
    useAuthStore.setState({ user: null, token: null })
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleSignOutClick = () => {
    toast.warning(LOGOUT_QUESTION, {
      action: {
        label: 'Sí',
        onClick: () => {
          handleSignOut()
          toggleMenu()
          return
        },
      },
      cancel: {
        label: 'No',
        onClick: () => {
          return
        },
      },
    })
  }

  return (
    <div className="mt-2">
      <button
        onClick={toggleMenu}
        className="rounded-md bg-[#2a2a2a] p-2 text-white shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={toggleMenu}
      />

      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-[#212121] shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-full flex-col justify-between p-4">
          {/* Contenido del sidebar */}
          <div>
            {/* Header del sidebar */}
            <div className="mt-10 flex w-full items-center gap-4">
              <div className="flex">
                <span className="rounded-full border-2 border-white/65 px-4 py-4">
                  {user?.role === 'Admin' ? (
                    <ShieldUser className="text-gray-600" />
                  ) : (
                    <User />
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-lg tracking-wide">
                <div className="flex flex-wrap gap-1 font-medium">
                  <h4>
                    {user?.firstName} {user?.lastName}
                  </h4>
                </div>
                <div className="text-sm">
                  <p>Rol: {user?.role}</p>
                </div>
              </div>
            </div>

            {/* Menú de navegación */}
            <div className="mt-8 flex w-full flex-col items-center gap-2">
              <Link
                to={`/${basePath}/home`}
                onClick={toggleMenu}
                className={`flex w-full gap-2 rounded px-4 py-3 hover:bg-white/30 ${pathname === `/${basePath}/home` && 'bg-white/30'}`}
              >
                <House className="h-5 w-5" />
                <span className="text-sm">Home</span>
              </Link>
              <Link
                to={`/${basePath}/${path.pathOne}`}
                onClick={toggleMenu}
                className={`flex w-full gap-2 rounded px-4 py-3 hover:bg-white/30 ${pathname === `/${basePath}/important-tasks` && 'bg-white/30'}`}
              >
                <Logs className="h-5 w-5" />
                {user?.role == 'Admin' ? 'Usuarios' : 'Importantes'}
              </Link>
              {user?.role === 'Employee' && (
                <Link
                  to={`/${basePath}/completed-task`}
                  onClick={toggleMenu}
                  className={`flex w-full gap-2 rounded px-4 py-3 hover:bg-white/30 ${pathname === `/${basePath}/completed-tasks` && 'bg-white/30'}`}
                >
                  <Check className="h-5 w-5" />
                  <span className="text-sm">Completadas!</span>
                </Link>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              handleSignOutClick()
            }}
            className="mb-4 flex items-center justify-center gap-2 rounded-md border-2 border-red-300 bg-red-400 py-3 font-bold text-gray-300 hover:bg-red-500"
          >
            <LogOut />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileSidebar
