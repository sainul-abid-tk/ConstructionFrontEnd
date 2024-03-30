import React, { useState } from 'react'
import { createContext } from 'react'
export const newMessageResContext=createContext()
function NewMessageArrivedResp({children}) {
    const [newMessageArrivedResp,setNewMessageArrivedResp]=useState(false)
    console.log(newMessageArrivedResp);
  return (
    <>
    <newMessageResContext.Provider value={{newMessageArrivedResp,setNewMessageArrivedResp}}>
        {children}
    </newMessageResContext.Provider>
    </>
  )
}

export default NewMessageArrivedResp