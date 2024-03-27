import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import Base from './layout/Base'
import Items from './pages/Items'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthProvider />}>
        <Route path='/' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Base />}>
            <Route path='item' element={<Items />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App;
