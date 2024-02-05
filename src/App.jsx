import {  Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import Register from './pages/Register'
import Workers from './pages/Workers'
import Worker from './pages/Worker'
import UserEditableRegister from './pages/UserEditableRegister'


function App() {
  return (
    
    <>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth />}/>
        <Route path='/signup' element={<Auth  insideSignup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/workers' element={<Workers/>}/>
        <Route path='/worker' element={<Worker/>}/>
        <Route path='/userEditReg' element={<UserEditableRegister/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/*' element={<Navigate to={'/'}/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
