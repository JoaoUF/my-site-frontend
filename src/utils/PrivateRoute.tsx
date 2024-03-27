import { Navigate, Outlet, Route, redirect } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = () => {
    let { user }: any = useContext(AuthContext)
    return user ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute;