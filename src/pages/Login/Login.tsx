import { useAuthStore } from '@/store/authStore'
import { LoginForm } from '../../components/LoginForm'
import { useEffect } from 'react'
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
  }, [])

  const onSubmitLogin = async (loginData: LoginData) => {
    const loginResp: any = await api
      .post('/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => alert(error.response.data.message))

    if (loginResp.status === 200) {
      toast.success(LOGIN_SUCCESS)
      getUser(loginResp.data.userLogged)
      getToken(loginResp.data.token)
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex h-dvh items-center justify-center">
      <LoginForm onSubmitLogin={onSubmitLogin} />
    </div>
  )
}

export default Login
