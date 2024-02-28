import React, { createContext, useState } from 'react'
export const UserWorkDetailsContext=createContext()
function UserWorkDetails({children}) {
    const [userWorkDetails,setUserWorkDetails]=useState()
  return (
    <UserWorkDetailsContext.Provider value={{userWorkDetails,setUserWorkDetails}}>
        {children}
    </UserWorkDetailsContext.Provider>
  )
}

export default UserWorkDetails