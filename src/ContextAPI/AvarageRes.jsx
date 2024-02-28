import React, { createContext, useState } from 'react'
export const addAvarageResponseContext=createContext()
export const profileUpdateResponseContext=createContext()
export const adminReportResponseContext=createContext()

function AvarageRes({children}) {
    const [addAvarageResponse,setAddAvarageResponse]=useState("")
    const [profileUpdateResponse,setProfileUpdateResponse]=useState("")
    const [adminReportResponse,setAdminReportResponse]=useState()
  return (
    <>
    <adminReportResponseContext.Provider value={{adminReportResponse,setAdminReportResponse}}>
    <profileUpdateResponseContext.Provider value={{profileUpdateResponse,setProfileUpdateResponse}}> 
    <addAvarageResponseContext.Provider value={{addAvarageResponse,setAddAvarageResponse}}>
        {children}
    </addAvarageResponseContext.Provider>
    </profileUpdateResponseContext.Provider>
    </adminReportResponseContext.Provider>
    </>
  )
}

export default AvarageRes