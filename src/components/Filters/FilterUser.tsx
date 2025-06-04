import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { User } from '@/types'

interface FiltrosProps {
  setUsers: (users: User[]) => void
}

const FilterUser = ({ setUsers }: FiltrosProps) => {
  const [incidencia, setIncidencia] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSearching(true)
    try {
      if (incidencia) {
        const response = await axios.get(
          `http://localhost:8000/task/incidencia/${incidencia}`,
        )

        if (response.data.incidenceFounded) {
          setUsers([response.data.incidenceFounded])
        } else {
          setUsers([])
          toast.error(response.data.message || 'No se encontró la incidencia')
        }
      } else {
        await resetFilters()
      }
    } catch (error) {
      console.error('Error searching tasks:', error)
      setUsers([])
      toast.error('Error al buscar tareas')
    } finally {
      setIsSearching(false)
    }
  }

  const resetFilters = async () => {
    setIncidencia('')

    try {
      const tasksResp = await axios.get('http://localhost:8000/task')
      setUsers(tasksResp.data.allTasks)
      toast.success('Filtros limpiados correctamente')
    } catch (error) {
      console.error('Error fetching all tasks:', error)
      toast.error('Error al cargar todas las tareas')
    }
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
            Número de incidencia
          </label>
          <input
            id="incidencia"
            type="text"
            placeholder="Número de incidencia"
            className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white focus:border-[#1e3a5f] focus:outline-none"
            value={incidencia}
            onChange={(e) => setIncidencia(e.target.value)}
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
