import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { User } from '../types'

interface loginStore {
  user: User | null
  token: string | null
  getUser: (newUser: User) => void
  getToken: (newToken: string) => void
}

export const useAuthStore = create<loginStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      getUser: (newUser) =>
        set({
          user: newUser,
        }),
      getToken: (newToken) =>
        set({
          token: newToken,
        }),
    }),
    {
      name: 'login-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
