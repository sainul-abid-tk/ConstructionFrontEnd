import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AvarageRes from './ContextAPI/AvarageRes.jsx'
import UserWorkDetails from './ContextAPI/UserWorkDetails.jsx'
import NewWorkerNotify from './ContextAPI/NewWorkerNotify.jsx'
import TokenAuth from './ContextAPI/TokenAuth.jsx'
import NewMessageArrivedResp from './ContextAPI/NewMessageArrivedResp.jsx'
import AdminChatRuleResp from './ContextAPI/AdminChatRuleResp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TokenAuth>
    <AdminChatRuleResp>
    <NewMessageArrivedResp>  
    <NewWorkerNotify>
    <UserWorkDetails>
    <AvarageRes>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    </AvarageRes>
    </UserWorkDetails>
    </NewWorkerNotify>
    </NewMessageArrivedResp>
    </AdminChatRuleResp>  
    </TokenAuth>
  </React.StrictMode>,
)
