import {  Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Chat from './Chat/Chat'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Workers from './pages/Workers'
import Worker from './pages/Worker'
import UserEditableRegister from './pages/UserEditableRegister'
import AdHome from './Admin/AdHome'
import AdUsers from './Admin/AdUsers'
import AdWorkers from './Admin/AdWorkers'
import AdReviews from './Admin/AdReviews'
import AdReports from './Admin/AdReports'
import AdProfile from './Admin/AdProfile'
import AdContact from './Admin/AdContect'
import AdCharts from './Admin/AdCharts'
import AdEditUser from './Admin/AdEditUser'
import Help from './pages/Help'
import WorkerApprov from './Admin/WorkerApprov'
import { useContext, useEffect, useState } from 'react'
import { tokenAuthenticationContext } from './ContextAPI/TokenAuth'
import AdHeader from './Admin/AdHeader'
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
function App() {
  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthenticationContext)
  const [adminEmail,setAdminEmail]=useState("")
  useEffect(()=>{
    setAdminEmail(JSON.parse(sessionStorage.getItem('user'))?.email)
    if(adminEmail){
      socket.emit('adminPageOpen')
    }
  },[adminEmail])
  return (
    <>
    {adminEmail=='admin123@gmail.com'&&<AdHeader setAdminEmail={setAdminEmail}/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth setAdminEmail={setAdminEmail}/>}/>
        <Route path='/signup' element={<Auth  insideSignup/>}/>
        <Route path='/profile' element={isAuthorized?<Profile/>:<Home/>}/>
        <Route path='/register' element={isAuthorized?<Register/>:<Home/>}/>
        <Route path='/workers' element={<Workers/>}/>
        <Route path='/worker/:wId' element={<Worker/>}/>
        <Route path='/userEditReg/:wId' element={isAuthorized?<UserEditableRegister/>:<Home/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/adhome' element={isAuthorized?<AdHome/>:<Home/>}/>
        <Route path='/adusers' element={isAuthorized?<AdUsers/>:<Home/>}/>
        <Route path='/adWorkers' element={isAuthorized?<AdWorkers/>:<Home/>}/>
        <Route path='/adReviews' element={isAuthorized?<AdReviews/>:<Home/>}/>
        <Route path='/adReports' element={isAuthorized?<AdReports/>:<Home/>}/>
        <Route path='/adProfile' element={isAuthorized?<AdProfile/>:<Home/>}/>
        <Route path='/adContact' element={isAuthorized?<AdContact/>:<Home/>}/>
        <Route path='/adChart' element={isAuthorized?<AdCharts/>:<Home/>}/>
        <Route path='/adapprove' element={isAuthorized?<WorkerApprov/>:<Home/>}/>
        <Route path='/*' element={<Navigate to={'/'}/>}/>
      </Routes>
    </>
  )
}

export default App
