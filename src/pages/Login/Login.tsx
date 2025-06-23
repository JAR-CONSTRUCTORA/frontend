'use client'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { LoginForm } from '../../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  LOGIN_CREDENTIALS_INVALID,
  LOGIN_SUCCESS,
} from '@/constants/auth/login-messages'
import { login } from '@/services/auth/useAuth'

interface LoginData {
  username: string
  password: string
}

const Login = () => {
  const { token, user } = useAuthStore()
  const navigate = useNavigate()
  const { getUser, getToken } = useAuthStore()

  const onSubmitLogin = async (loginData: LoginData) => {
    try {
      const resp = await login(loginData)

      if (resp) {
        toast.success(LOGIN_SUCCESS)
        getUser(resp.userLogged)
        getToken(resp.token)
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(LOGIN_CREDENTIALS_INVALID)
    }
  }

  useEffect(() => {
    if (token) navigate('/user/dashboard')
    if (user?.role === 'admin') navigate('/admin')
  }, [token, user, navigate])

  return <LoginForm onSubmitLogin={onSubmitLogin} />
}

export default Login
