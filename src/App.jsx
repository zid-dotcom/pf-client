import './App.css'
import { Route,Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import { authContext } from './ContextApi/context'
import { useContext } from 'react'

import Landing from './pages/Landing'
import NotFound from './pages/Notfound'
import './bootstrap.min.css'


function App() {
  const{authStatus}=useContext(authContext)

  return (
    <>
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/dash' element={authStatus?<Dashboard/>:<Auth/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/allproject' element={authStatus?<Projects/>:<Auth/>}/>
      <Route path='*' element={<NotFound/>}/>
      </Routes> 
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App
