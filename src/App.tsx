import { Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import './App.css'
import { useAuthStore } from './store/authStore'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Dashboard } from './pages/Dashboard'

const App = () => {
  const { token } = useAuthStore()
  const navigate = useNavigate()
  const [isExpiredToken, setIsExpiredToken] = useState<boolean>(false)

  const isTokenExpired = (token: string) => {
    if (!token) return false
    const decode = jwtDecode<JwtPayload>(token)
    let expirationTime = 0
    if (decode.exp) {
      expirationTime = decode.exp * 1000
    }
    return Date.now() > expirationTime
  }

  useEffect(() => {
    setIsExpiredToken(isTokenExpired(token ?? ''))
    if (isExpiredToken) {
      localStorage.removeItem('login-storage')
    }
    if (token) navigate('/dashboard')
  }, [token])

  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
