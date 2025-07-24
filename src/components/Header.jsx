import React,{useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../ContextApi/Context';


function Header() {


  const nav=useNavigate()
  const {setAuthStatus}=useContext(authContext)
  const handleLogout=()=>{

    sessionStorage.clear()
    setAuthStatus(false)
    toast.info("user Logged out!!")
    nav('/')

  }
  return (
   <>
    <Navbar className="bg-body-tertiary ">
        <Container>
          <Navbar.Brand href="#home">
            <i class="fa-solid fa-diagram-project"></i>
           {' '}
            Projectfare
          </Navbar.Brand>
          <button onClick={handleLogout} className='btn btn-danger'>
            Logout{' '} <i className="fa-solid fa-right-from-bracket"></i>

          </button>
        </Container>
      </Navbar>
   
   
   </>
  )
}

export default Header
