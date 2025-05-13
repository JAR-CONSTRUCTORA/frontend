import { Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import './App.css'
import { useAuthStore } from './store/authStore'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { DashboardAdmin } from './pages/DashboardAdmin'
import { HomeUser } from './pages/HomeUser'
import { TasksImportant } from './pages/TasksImportant'
import { TasksCompleted } from './pages/TasksCompleted'

const App = () => {
  const { token, user } = useAuthStore()
  console.log(user)
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
    if (user?.role === 'Admin') navigate('/admin/home')
    if (user?.role === 'Employee') navigate('/user/home')
  }, [user])

  return (
    <div className="p-4">
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/user">
          <Route path="home" element={<HomeUser />} />
          <Route path="important-tasks" element={<TasksImportant />} />
          <Route path="completed-tasks" element={<TasksCompleted />} />
        </Route>
        <Route path="/admin">
          <Route path="home" element={<DashboardAdmin />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
