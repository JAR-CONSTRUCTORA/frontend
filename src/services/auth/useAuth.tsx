import { api } from '@/configs/axios'
import { LOGIN_SUCCESS } from '@/constants/auth/login-successfull'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface LoginData {
  username: string
  password: string
}

export const useLogin = () => {
  const { getUser, getToken } = useAuthStore()
  const navigate = useNavigate()

  const onSubmitLogin = async (loginData: LoginData) => {
    try {
      const loginResp = await api.post('/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (loginResp.status === 200) {
        toast.success(LOGIN_SUCCESS)
        getUser(loginResp.data.userLogged)
        getToken(loginResp.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      console.error(error)
      toast.error('Credenciales inválidas, intente nuevamente')
    }
  }

  return { onSubmitLogin }
}
