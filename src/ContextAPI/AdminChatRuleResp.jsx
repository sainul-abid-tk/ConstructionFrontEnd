import React, { createContext, useState } from 'react'
export const adminChatRulesContext=createContext()

function AdminChatRuleResp({children}) {
    const [adminChatRulesResp,setAdminChatRulesResp]=useState(false)
  return (
    <>
    <adminChatRulesContext.Provider value={{adminChatRulesResp,setAdminChatRulesResp}}>
        {children}
    </adminChatRulesContext.Provider>
    </>
  )
}

export default AdminChatRuleResp