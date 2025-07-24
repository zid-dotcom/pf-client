import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Projectcard from '../components/Projectcard'
import { allprojectsApi } from '../services/allApis'

function Landing() {

  const [logstate,setlogstate]=useState(false)
  const [samples,setsamples]=useState([])
  useEffect(()=>{
    getData()
    if(sessionStorage.getItem("token")){
      setlogstate(true)
    }else{
      setlogstate(false)
    }

  },[])
  const getData=async()=>{
    const response= await allprojectsApi()
    console.log(response);
    if(response.status==200){
      setsamples(response.data.slice(0,3))
    }
    else{
      console.log(response);
      
    }
    
  }


  return (
    <>
    <div className="container-fluid ">
      <div className="w-100 row" style={{minHeight:'70vh'}}>
        <div className="col-sm-12 col-md-6 d-flex justify-content-center flex-column">

          <h1>projectFare 2025</h1>
          <p style={{textAlign:'justify'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iste blanditiis voluptatibus, esse sapiente voluptate quo fugiat magni neque nesciunt quam officia! Voluptates amet molestias cupiditate at rem et dolorum?
            

          </p>
          <div className='d-grid'>{
            logstate ?
            <Link className='btn btn-warning' to={'/dash'}> dashboard</Link>
            :
            
            <Link className='btn btn-warning' to={'/auth'}> Explore now...</Link>


            }
          

          </div> 
        </div>
        <div className="col-sm-12 col-md-6 d-flex justify-content-center">
          <img className='h-50 img-fluid mt-5' src="https://img.freepik.com/premium-photo/business-meeting-whiteboard-woman-speaker-with-presentation-office-planning-schedule-project-management-leadership-coaching-manager-hand-pointing-objectives-note-priority_590464-372214.jpg?ga=GA1.1.1842626415.1747459649&semt=ais_hybrid&w=740" alt=""   />
        </div>

      </div>
      <div className="w-100 my-5">
        <h3>projects you may like...</h3>
        <div className="d-flex justify-content-around my-5 gap-3">
          {
            samples.length>0?
            <>
            {samples.map((item)=>(
          <Projectcard project={item}/>



            ))}
            
            </>
            :
            <h4 className='text-center text-danger'>No projects available</h4>
          }
         

        </div>
        <div className="text-center">
          <Link to={'/allproject'}>View more...</Link>
        </div>
      </div>

    </div>
    
    
    </>
  )
}

export default Landing
