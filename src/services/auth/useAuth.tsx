import { api } from '@/configs/axios'
interface LoginData {
  username: string
  password: string
}
export const login = async (loginData: LoginData) => {
  const { data } = await api.post('/login', loginData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}
