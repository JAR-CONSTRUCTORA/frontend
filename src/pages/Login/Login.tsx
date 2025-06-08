'use client'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { LoginForm } from '../../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '@/configs/axios'
import { LOGIN_SUCCESS } from '@/constants/auth/login-successfull'

interface LoginData {
  username: string
  password: string
}

const Login = () => {
  const { token, user } = useAuthStore()
  const navigate = useNavigate()
  const { getUser, getToken } = useAuthStore()

  useEffect(() => {
    if (token) navigate('/user/dashboard')
    if (user?.role === 'admin') navigate('/admin')
  }, [token, user, navigate])

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
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión')
    }
  }

  return <LoginForm onSubmitLogin={onSubmitLogin} />
}

export default Login
