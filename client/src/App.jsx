import { Route, Routes, Navigate} from 'react-router-dom'
import { useContext } from 'react'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from 'react-hot-toast'
import  { AuthContext } from '../context/AuthContext.jsx'

const App = () => {
   const { authUser } = useContext(AuthContext) //AuthContext
  return (
    <div className="bg-[url('./src/assets/bg_purple.png')] bg-contain">
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App
