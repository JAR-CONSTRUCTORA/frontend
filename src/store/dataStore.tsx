import { User } from '@/types'
import { create } from 'zustand'

interface State {
  workers: User[] | null
  selectedWorkers: User[]
  workersList: User[]
}

interface Action {
  setWorkers: (newWorkers: User[]) => void
  setSelectedWorkers: (newWorkers: User[]) => void
  setWorkersList: (newWorker: User) => void
  replaceWorkerAtIndex: (index: number, newWorker: User) => void
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
  workersList: [],
  setWorkersList: (newWorker: User) =>
    set((state) => ({
      workersList: state.workersList.some(
        (worker) => worker._id === newWorker._id,
      )
        ? state.workersList
        : [...state.workersList, newWorker],
    })),
  replaceWorkerAtIndex: (index, newWorker) =>
    set((state) => {
      const newList = [...state.workersList]
      if (index >= 0 && index < newList.length) {
        newList[index] = newWorker
      }
      return { workersList: newList }
    }),
}))
