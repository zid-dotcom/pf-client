import React, { useContext, useState } from 'react'
import { createContext } from 'react'

export const AddResponseContext=createContext()
export const EditResponseContext=createContext()
export const authContext=createContext()

const Context = ({children}) => {
    const [addResponse,setAddResponse]=useState("")
    const [EditResponse,setEditResponse]=useState("")
    const [authStatus,setAuthStatus]=useState(true)
  return (
    <>
    <authContext.Provider value={{authStatus,setAuthStatus}}  >

    <AddResponseContext.Provider value={{addResponse,setAddResponse}}>
      <EditResponseContext.Provider value={{EditResponse,setEditResponse}}>
        {children}
        </EditResponseContext.Provider>
    </AddResponseContext.Provider>
    </authContext.Provider>

    
    </>
  )
}

export default Context
