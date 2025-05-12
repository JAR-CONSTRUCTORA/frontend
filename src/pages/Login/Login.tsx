import { useAuthStore } from '@/store/authStore'
import { LoginForm } from '../../components/LoginForm'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { token, user } = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    if (token) navigate('/user/dashboard')
    if (user?.role === 'admin') navigate('/admin')
  }, [])
  return (
    <div className="flex h-dvh items-center justify-center">
      <LoginForm />
    </div>
  )
}

export default Login
