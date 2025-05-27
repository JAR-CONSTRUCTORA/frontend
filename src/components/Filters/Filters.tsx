import axios from 'axios'
import { useState } from 'react'
import React from 'react'
import { Task } from '@/types'
import { toast } from 'sonner'

interface FiltrosProps {
  setAllTasksData: (tasks: Task[]) => void
}

const Filters = ({ setAllTasksData }: FiltrosProps) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [incidencia, setIncidencia] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [activeFilter, setActiveFilter] = useState<
    'worker' | 'incidencia' | null
  >(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if ((firstName || lastName) && incidencia) {
      toast.error('Solo puedes filtrar por un campo a la vez')
      return
    }

    setIsSearching(true)
    try {
      if (firstName || lastName) {
        // Búsqueda por trabajador
        const response = await axios.get('http://localhost:8000/user/search', {
          params: { firstName, lastName },
        })

        if (response.data.userFounded?.length > 0) {
          const userIds = response.data.userFounded.map((user: any) => user._id)
          const tasksResponse = await axios.get('http://localhost:8000/task', {
            params: { userIds: userIds.join(',') },
          })
          setAllTasksData(tasksResponse.data.allTasks || [])
        } else {
          setAllTasksData([])
          toast.error('No se encontraron trabajadores con ese nombre')
        }
        setActiveFilter('worker')
      } else if (incidencia) {
        // Búsqueda por incidencia
        const response = await axios.get(
          `http://localhost:8000/task/incidencia/${incidencia}`,
        )

        if (response.data.incidenceFounded) {
          setAllTasksData([response.data.incidenceFounded])
        } else {
          setAllTasksData([])
          toast.error(response.data.message || 'No se encontró la incidencia')
        }
        setActiveFilter('incidencia')
      } else {
        // Si ambos campos están vacíos, obtener todas las tareas
        await resetFilters()
      }
    } catch (error) {
      console.error('Error searching tasks:', error)
      setAllTasksData([])
      toast.error('Error al buscar tareas')
    } finally {
      setIsSearching(false)
    }
  }

  const resetFilters = async () => {
    setFirstName('')
    setLastName('')
    setIncidencia('')
    setActiveFilter(null)

    try {
      const tasksResp = await axios.get('http://localhost:8000/task')
      setAllTasksData(tasksResp.data.allTasks)
      toast.success('Filtros limpiados correctamente')
    } catch (error) {
      console.error('Error fetching all tasks:', error)
      toast.error('Error al cargar todas las tareas')
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'firstName' | 'lastName' | 'incidencia',
  ) => {
    const value = e.target.value

    if (type === 'incidencia' && (firstName || lastName)) {
      toast.error(
        'Solo puedes filtrar por un campo a la vez. Limpia el filtro de trabajador primero.',
      )
      return
    }

    if ((type === 'firstName' || type === 'lastName') && incidencia) {
      toast.error(
        'Solo puedes filtrar por un campo a la vez. Limpia el filtro de incidencia primero.',
      )
      return
    }

    switch (type) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      case 'incidencia':
        setIncidencia(value)
        break
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl border border-white/10 bg-gray-800 p-4"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">Filtrar tareas</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="first-name"
            className="mb-1 block text-sm text-gray-300"
          >
            Nombre del trabajador
          </label>
          <input
            id="first-name"
            type="text"
            placeholder="Nombre"
            className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white focus:border-[#1e3a5f] focus:outline-none"
            value={firstName}
            onChange={(e) => handleInputChange(e, 'firstName')}
            disabled={activeFilter === 'incidencia'}
          />
        </div>

        <div>
          <label
            htmlFor="last-name"
            className="mb-1 block text-sm text-gray-300"
          >
            Apellido del trabajador
          </label>
          <input
            id="last-name"
            type="text"
            placeholder="Apellido"
            className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white focus:border-[#1e3a5f] focus:outline-none"
            value={lastName}
            onChange={(e) => handleInputChange(e, 'lastName')}
            disabled={activeFilter === 'incidencia'}
          />
        </div>

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
            onChange={(e) => handleInputChange(e, 'incidencia')}
            disabled={activeFilter === 'worker'}
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

export default Filters
