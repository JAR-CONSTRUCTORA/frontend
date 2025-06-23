'use client'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { LoginForm } from '../../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '@/services/auth/useAuth'

const Login = () => {
  const { token, user } = useAuthStore()
  const navigate = useNavigate()
  const { onSubmitLogin } = useLogin()

  useEffect(() => {
    if (token) navigate('/user/dashboard')
    if (user?.role === 'admin') navigate('/admin')
  }, [token, user, navigate])

  return <LoginForm onSubmitLogin={onSubmitLogin} />
}

export default Login
