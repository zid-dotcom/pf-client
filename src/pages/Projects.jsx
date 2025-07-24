import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import Projectcard from '../components/Projectcard'
import { allprojectsApi } from '../services/allApis'

function Projects() {
  const [projectlist,setprojectlist]=useState([])
  const [datalist,setdatalist]=useState([])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){  
    getData()


    }


  },[])
  
  const getData=async()=>{
    const response=await allprojectsApi()
    if(response.status==200){
      setprojectlist(response.data)
      setdatalist(response.data)
    }

  }


  const handlesearch=(val)=>{
    const data=datalist.filter((item)=>item.languages.toLowerCase().includes(val.toLowerCase()))
    setprojectlist(data)

  }


  return (
   <>

   <Header/>
   <div className="container-fluid  " style={{minHeight:'70vh'}}>
    <div className="d-flex justify-content-between my-5">
      <h1>All projects</h1>
      <input type="search" onChange={(e)=>handlesearch(e.target.value)} placeholder='search with language' className='form-control w-25'/>

    </div>
    <div className="d-flex flex-wrap justify-content-around">
      {
        projectlist.length>0?
        <>
        {
          projectlist.map((item)=>(
            <Projectcard project={item}/>

          ))
        }
    

        
        </>
        :
        <h4 className='text-center text-danger'>No projects available</h4>
      }
    </div>

   </div>
   </>
  )
}

export default Projects
