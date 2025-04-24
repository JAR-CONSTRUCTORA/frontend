import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { User } from '../types'

interface loginStore {
  user: User | null
  getUser: (newUser: User) => void
}

export const useAuthStore = create<loginStore>()(
  persist(
    (set) => ({
      user: null,
      getUser: (newUser) =>
        set({
          user: newUser,
        }),
    }),
    {
      name: 'login-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
