import React,{useEffect,useState,useContext} from 'react'
import Header from '../components/Header'
import Addproject from '../components/Addproject'
import Profile from '../components/Profile'
import { userProjectapi } from '../services/allApis'
// import { useEffect, useState } from 'react'
import { deleteprojectApi } from '../services/allApis'
import { toast } from 'react-toastify'
import Edit from '../components/Edit'
import { AddResponseContext,EditResponseContext } from '../ContextApi/Context'

function Dashboard() {
  const [project,setptoject]=useState([])
  const [user,setuser]=useState("")
  const  {addResponse}=useContext(AddResponseContext)
  const {EditResponse}=useContext(EditResponseContext)
  
  useEffect(()=>{
    if(sessionStorage.getItem("userData")){
      setuser(JSON.parse(sessionStorage.getItem("userData")))
      getData()
    }


  },[addResponse,EditResponse])
  const getData= async()=>{
    const response=await userProjectapi()
    console.log(response);
    if(response.status===200){
      setptoject(response.data)
    }
    else{
      toast.error("something went wrong")
      console.log(response);
      
    }
    

  }


  const handledelete=async(_id)=>{
    const response=await deleteprojectApi(_id)
    console.log(response);
    if(response.status===200){
      getData()
    }
    


  }
  return (
    <>
      <Header />

      <div className="container-fluid" style={{ minHeight: '70vh' }}>
        <h2 className='my-3'>Dashboard</h2>
        <h4>welcome to projectFare, <span className='text-warning'>{user?.username}</span></h4>
        <div className="row">
          {/* Left section: Addproject + cards */}
          <div className="col-12 col-md-9 mb-3">
            <Addproject />
            <div className="w-100 border border-2 border-success p-2 mt-4">
              {
                project.length>0?
                <>
                {
                  project.map((item)=>(

                     <div className="m-3 border border-2 border-warning p-2 d-flex justify-content-between flex-wrap">
                <h5>{item.title}</h5>
                <div>
                  <a href={item.gitrepo}  target='_blank'>
                    <i className="fa-brands fa-github fa-xl text-info me-3"></i>
                  </a>
                
                    
                    <Edit  project={item} />
                  
                  <button onClick={()=>handledelete(item._id)} className="btn me-2">
                    <i className="fa-solid fa-trash fa-xl text-danger"></i>
                  </button>
                </div>
              </div>

                  ))
                }
                
                
                
                </>
                :
                <h2 className='text-center text-danger'>no projects added</h2>
              }
             
            </div>
          </div>

          {/* Right section: Profile */}
          <div className="col-12 col-md-3 ">
            <Profile />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
