import { User } from '@/types'
import { create } from 'zustand'

interface State {
  workers: User[] | null
  selectedWorkers: User[]
}

interface Action {
  setWorkers: (newWorkers: User[]) => void
  setSelectedWorkers: (newWorkers: User[]) => void
}

export const useDataStore = create<State & Action>((set) => ({
  workers: [],
  setWorkers: (newWorkers) =>
    set({
      workers: newWorkers,
    }),
  selectedWorkers: [],
  setSelectedWorkers: (newWorkers) =>
    set({
      selectedWorkers: newWorkers,
    }),
}))
