import commonApi from "./commonApi";
import base_Url from "./base_url";
import { data } from "react-router-dom";
import Header from "../components/Header";

 
 export const regUserApi=async(data)=>{
    return await commonApi(`${base_Url}/reg`,"POST","",data)
}
 export const logUserApi=async(data)=>{
    return  await commonApi(`${base_Url}/login`,"POST","",data)

} 
export const addprojectApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data"
    }
    return await commonApi(`${base_Url}/addproject`,"POST",header,data)
}

export const userProjectapi=async()=>{
    const header={
         "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json"

    }
        return await commonApi(`${base_Url}/userprojects`,"GET",header,"")



}


export const deleteprojectApi=async(id)=>{
     const header={
         "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json"

    }

    return await commonApi(`${base_Url}/deleteproject/${id}`,"DELETE",header,[])

}
export const editprojectApi=async(id,data,header)=>{
    return await commonApi(`${base_Url}/editproject/${id}`,"PUT",header,data)
}
export const updateprofileApi=async(data,header)=>{
    return await commonApi(`${base_Url}/updateprofile`,"PUT",header,data)
}
export const allprojectsApi=async()=>{
    return await commonApi(`${base_Url}/allprojects`,"GET","","")

}


   