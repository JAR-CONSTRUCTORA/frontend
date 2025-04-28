import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import './App.css'
import { useAuthStore } from './store/authStore'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

const App = () => {
  const { token } = useAuthStore()
  const [isExpired, setIsExpired] = useState<boolean>(false)

  const isTokenExpired = () => {
    const decode = jwtDecode(token ?? '')
    const expirationTime = decode.exp * 1000
    if (Date.now() > expirationTime) setIsExpired(true)
    return isExpired
  }

  useEffect(() => {
    isTokenExpired()
  }, [token])

  return (
    <Routes>
      <Route path="" element={<Login />} />
    </Routes>
  )
}

export default App
