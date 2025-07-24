import React, { useState ,useContext} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { regUserApi ,logUserApi} from '../services/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../ContextApi/context';
import Profile from '../components/Profile';


function Auth() {
  const [authstate, setAuthstate] = useState(false)
  const [userData,setUserData]=useState({
    email:"",username:"",password:""
  })
  const nav=useNavigate()
  const {setAuthStatus}=useContext(authContext)


  const handleRegister= async()=>{
    console.log(userData);
    const {username,email,password}=userData
    if(!username||!email||!password){
      toast.warning("Enter valid inputs")


    }
    else{
      const response= await regUserApi(userData)
      console.log(response);
      if(response.status===201){
        toast.success("registration completed")
        handleAuthstate()

        /* form will be cleared automatically by calling setUserData  */

        setUserData({
          email:"",username:"",password:""
        })


      }
      else{
        toast.error("something went wrong")

      }
      
    }

    

  }



  const handlelogin=async()=>{
    const{email,password}=userData
    if(!email || !password){
      toast.warning('Enter valid inputs')
    }
    else{
      const  response=await logUserApi(userData)
      console.log(response);
      if(response.status===200){
        toast.success("Login successfull")
        sessionStorage.setItem("token",response.data.token)
        sessionStorage.setItem("userData",JSON.stringify({username:response.data.user,github:response.data.github,linkedin:response.data.linkedin,profile:response.data.profile}))
        setAuthStatus(true)
        nav('/')
      }
      else{
        toast.error("something went wrong")
      }
      

      
    }
  }
  const handleAuthstate = () => {
    setAuthstate(!authstate)
  }
  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="border p-3 border-dark border-2 w-75">
          <div className="row">
            <div className="col  p-3 m-3  ">
              {
                authstate?
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZlSpSeeypU2Qd_4hr3ro7JroeD7kclQ7hg&s" alt=""  className='img-fluid'/>
                :
                <img src="data:image/png;base64,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" alt="" className='img-fluid'  />

              }
              

            </div>
            <div className="col">
              <h2>
                {
                  authstate ?
                    <>Register</>
                    :
                    <>Login</>

                }

              </h2>
              <div className="mt-4">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                {
                  authstate&&
                   <FloatingLabel controlId="floatingInp" label="username">
                  <Form.Control value={userData.username}  onChange={(e)=>setUserData({...userData,username:e.target.value})} type="Text" placeholder="username" />
                </FloatingLabel>


                }
                <FloatingLabel  controlId="floatingPassword" label="Password">
                  <Form.Control value={userData.password}  onChange={(e)=>setUserData({...userData,password:e.target.value})} className='mt-3' type="password" placeholder="Password" />
                </FloatingLabel>

              </div>

              <div className="d-flex justify-content-between mt-5">
                {authstate?


                <button onClick={handleRegister} className="btn btn-success">Register</button>
                
                
                :
                
                <button onClick={handlelogin} className="btn btn-success">Login</button>}
                
                <button className="btn btn-link" onClick={handleAuthstate}>{authstate?"Already a user?":"New User?"}</button>
              </div>



            </div>
          </div>
        </div>

      </div>



    </>
  )
}

export default Auth

// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { useState } from 'react';







// import React from 'react'

// function Auth() {

//   const [auth, setAuth] = useState(false)
//   const handleAuthstate = () => {
//     setAuth(!auth)

//   }


//   return (
//     <div>
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <div className="border border-dark border-2 p-3 w-75">
//           <div className="row">
//             <div className="col">
//               {
//                 auth ?
//                 <img src="data:image/jpeg;base64,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" alt="" />

//                 :
//                   <img src="data:image/jpeg;base64,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" alt="" />

//               }
//             </div>
//             <div className="col">
//               {
//                 auth ? <h2>Register</h2>
//                   :
//                   <h2>LOgin</h2>


//               }
//               <FloatingLabel
//                 controlId="floatingInput"
//                 label="Email address"
//                 className="mb-3"
//               >
//                 <Form.Control type="email" placeholder="name@example.com" />
//               </FloatingLabel>
//               {
//                 auth &&
//                 <FloatingLabel
//                   controlId="floatingInp"
//                   label="Username"
//                   className="mb-3"
//                 >
//                   <Form.Control type="text" placeholder="name@example.com" />
//                 </FloatingLabel>

//               }


//               <FloatingLabel controlId="floatingPassword" label="Password">
//                 <Form.Control type="password" placeholder="Password" />
//               </FloatingLabel>

//               <div className="d-flex justify-content-between  mt-3">
//                 {
//                   auth ?
//                     <button className='btn btn-success'>Register</button>
//                     :
//                     <button className='btn btn-success'>LOgin</button>


//                 }


//                 <button onClick={handleAuthstate} className='btn-link btn  '>

//                   {
//                     auth ?
//                       <>Already a user?</>
//                       :
//                       <>New user</>
//                   }

//                 </button>


//               </div>

//             </div>
//           </div>
//         </div>

//       </div>


//     </div>
//   )
// }

// export default Auth
