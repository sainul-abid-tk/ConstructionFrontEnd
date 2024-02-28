import React, { createContext, useState } from 'react'
export const newWorkerNotificationContext=createContext()
function NewWorkerNotify({children}) {
    const [newWorkerNotification,setNewWorkerNotification]=useState()
  return (
    <>
    <newWorkerNotificationContext.Provider value={{newWorkerNotification,setNewWorkerNotification}}>
    {children}
    </newWorkerNotificationContext.Provider>
    </>
  )
}

export default NewWorkerNotify