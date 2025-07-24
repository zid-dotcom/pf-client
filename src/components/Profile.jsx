import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { updateprofileApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../ContextApi/context'
import { useContext } from 'react'
import js from '@eslint/js'
import base_Url from '../services/base_url'

  

function Profile() {
    const nav=useNavigate()
    const {setAuthStatus}=useContext(authContext)
    const [profileshow,setprofileshow]=useState(false)
    const [profileData,setprofileData]=useState({
        username:"",github:"",linkedin:"",profile:""

    })
    const [preview,setpreview]=useState("")

    useEffect(()=>{

        if(sessionStorage.getItem('userData')){
            const userData=JSON.parse(sessionStorage.getItem('userData'))
            setprofileData({...userData})
        }


    },[])


    useEffect(()=>{
        if(profileData.profile.type){
            setpreview(URL.createObjectURL(profileData.profile))
        }
        else{
            setpreview("")
        }

    },[profileData.profile.type])

    

    const handleupdate=async()=>{
        console.log(profileData);
        const { username,github,linkedin,profile}=profileData
        if(!username||!github||!linkedin||!profile){
            toast.warning("Enter valid inputs")
        }
        else{
            let header={}
            if(profile.type){
                 header={
                    "Authorization":`Token ${sessionStorage.getItem('token')}`,
                    "Content-Type":"multipart/form-data"
                }
            }
            else{
                header={
                     "Authorization":`Token ${sessionStorage.getItem('token')}`,
                    "Content-Type":"application/json"

                }

            }
            const response=await updateprofileApi(profileData,header)
            if(response.status==200){
                toast.success("profile Updated")
                nav('/')
                sessionStorage.clear()
                setAuthStatus(false)

            }
            else{
                toast.error("Updation failed")
                console.log(response);
                
            }
            

        }
        
    }
    const toggleprofile=()=>{
        setprofileshow(!profileshow)
    }
  return (
    <>
    <div className="container-fluid border border-3 border-info p-3">
        <div className=" container d-flex justify-content-between">
            <h2>Profile</h2>
            <button onClick={toggleprofile}  className='btn '>
            {
                profileshow?
                <i class="fa-solid fa-toggle-on fa-xl"></i>
                :
                <i class="fa-solid fa-toggle-off fa-xl"></i>

            }
            </button>
        </div>
        {
            profileshow&&
            <div className="w-100">
                <div >
                    <label htmlFor="f"> 
                        <input onChange={(e)=>setprofileData({...profileData,profile:e.target.files[0]})} style={{display:'none'}} type="file" className="form-control"  id='f'/>

                        <img className='img-fluid' src={preview?preview:(profileData.profile?`${base_Url}/projectimg/${profileData.profile}`:"data:image/png;base64,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")} alt=""  />
                    </label>
                    <input onChange={(e)=>setprofileData({...profileData,username:e.target.value})} defaultValue={profileData.username} type="text" placeholder='Username' className='form-control my-3' />
                    <input onChange={(e)=>setprofileData({...profileData,github:e.target.value})} defaultValue={profileData.github} type="text" placeholder='Git link' className='form-control my-3' />
                    <input onChange={(e)=>setprofileData({...profileData,linkedin:e.target.value})} defaultValue={profileData.github} type="text" placeholder='Linkdin' URL className='form-control my-3' />

                </div>
                <div className="my-2 d-flex justify-content-between ">
                    <button onClick={handleupdate} className="btn-success btn ">update</button>
                    <button  className="btn-success btn">cancel/close</button>

                </div>
            </div>

        }
         
    </div>
    
    </>
  )
}

export default Profile





