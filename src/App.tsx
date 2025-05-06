import { Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import './App.css'
import { useAuthStore } from './store/authStore'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Dashboard } from './pages/Dashboard'
import { DashboardAdmin } from './pages/DashboardAdmin'

const App = () => {
  const { token, user } = useAuthStore()
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
    if (!user) navigate('')
  }, [])

  return (
    <div className="p-4">
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<DashboardAdmin />} />
      </Routes>
    </div>
  )
}

export default App
