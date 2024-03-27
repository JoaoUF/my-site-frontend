import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode"
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthService } from '../services/auth/auth.service';

interface ContexData {
  user: any,
  authTokens: null,
  loginUser: (data: any) => Promise<void>,
  logoutUser: () => void,
}

const AuthContext = createContext<ContexData | null>(null) as React.Context<ContexData>

export default AuthContext;

export const AuthProvider = () => {
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')!) : null)
  let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')!) : null)
  let [loading, setLoading] = useState(false)

  const history = useNavigate()

  let loginUser = async (data: any) => {
    try {
      const authService = new AuthService()
      const authOutput = await authService.getTokens(data)
      console.log(authOutput)
      setAuthTokens(authOutput)
      setUser(jwtDecode(authOutput.access))
      localStorage.setItem('authTokens', JSON.stringify(authOutput))
      history('/item')
    } catch {
      alert('Something went wrong!')
    }
  }

  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    history('/signin')
  }

  let updateToken = async () => {
    try {
      const authService = new AuthService()
      const authOutput = await authService.refreshTokens(authTokens?.refresh)
      setAuthTokens(authOutput)
      setUser(jwtDecode(authOutput.access))
      localStorage.setItem('authTokens', JSON.stringify(authOutput))
    } catch (error) {
      console.log(error)
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  }

  let contextData: ContexData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  useEffect(() => {

    if (loading) {
      updateToken()
    }

    let fourMinutes = 1000 * 60 * 4

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)

  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData} >
      {loading ? null : <Outlet />}
    </AuthContext.Provider>
  )
}