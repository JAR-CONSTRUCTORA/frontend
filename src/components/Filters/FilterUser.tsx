import { useState } from 'react'
import { User } from '@/types'

interface FiltrosProps {
  setUsers: (users: User[]) => void
  searchUser: (
    prompt: string,
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void
  getUsers: () => void
}

const FilterUser = ({ searchUser, getUsers }: FiltrosProps) => {
  const [prompt, setPrompt] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    searchUser(prompt, setIsSearching)
  }

  const resetFilters = async () => {
    setPrompt('')
    setIsSearching(false)
    getUsers()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl border border-white/10 bg-gray-800 p-4"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">
        Filtrar usuarios
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="incidencia"
            className="mb-1 block text-sm text-gray-300"
          >
            Nombre completo de usuario
          </label>
          <input
            id="incidencia"
            type="text"
            placeholder="Nombre y apellido de usuario"
            className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white focus:border-[#1e3a5f] focus:outline-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-2">
        <button
          type="button"
          onClick={resetFilters}
          disabled={isSearching}
          className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50"
        >
          Limpiar filtros
        </button>
        <button
          type="submit"
          disabled={isSearching}
          className="rounded-md bg-[#1e3a5f] px-6 py-2 text-white hover:bg-[#25446f] disabled:opacity-50"
        >
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  )
}

export default FilterUser
