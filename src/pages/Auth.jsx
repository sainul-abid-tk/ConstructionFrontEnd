import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Google from '../assets/Images/google.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home';
import UserPlaceHolder from '../assets/Images/UserPlaceHolder.jpg'
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
function Auth({insideSignup}) {
  
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
    <div className='min-h-screen flex flex-col justify-center items-center bg-yellow-300 py-3'>
    <h1 className='text-center text-5xl mb-10 font-extrabold'>{insideSignup?'Sign Up':'Log In'}</h1>
    
        <div className='max-w-md space-y-10 rounded-xl px-3'>
        {insideSignup&&<div className="flex justify-center items-center mt-10">
          <label className="text-center">
          <input className="hidden " type="file" name="" id="" />
            <div style={{backgroundImage:`url(${UserPlaceHolder})`}} className="w-32 h-32 rounded-full bg-cover  cursor-pointer
            relative flex justify-center items-center">
            <AddAPhotoIcon className='absolute bottom-2 ' style={{color:'white'}}/>
            </div>
          </label>
        </div>}
        {insideSignup&&<TextField type="text" className='w-full border-black border-2 ' id="standard-basic" label="Username" variant="standard" />}
        <TextField type="email" className='w-full border-black border-2' id="standard-basic" label="Email" variant="standard" />
        <FormControl sx={{  width:'100%' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
          {insideSignup?<Button style={{width:'100%',background:' rgb(22 180 74 / var(--tw-bg-opacity))',fontSize:'16px',fontWeight:'bold'}} className='bg-green-600' variant="contained">SignUp</Button>:
          <Button style={{width:'100%',background:' rgb(22 180 74 / var(--tw-bg-opacity))',fontSize:'16px',fontWeight:'bold'}} className='bg-green-600' variant="contained">LogIn</Button>
          }
          {!insideSignup&&
          <div>
          <p className=' text-center font-bold'>OR</p>
          <Button style={{width:'100%',background:'white',color:'black',fontWeight:"bold"}} variant="contained"><img width={20} src={Google} alt="" />&nbsp;Continue With Google</Button>
          </div>}
          {insideSignup?
          <div className='flex flex-col  w-full items-center mt-2'>
          <p className='text-md mt-2'>Already have an account?<Link to={'/login'} className='text-blue-500'>Login</Link></p>
          <Link to={'/'}><HomeIcon className="cursor-pointer" fontSize='large'/></Link>
          </div>
          :
         <div className='flex flex-col  w-full items-center mt-2'>
          <p className='text-md'>Don't have an accout?<Link to={'/signup'} className='text-blue-500'>Signup</Link></p>
          <Link to={'/'}><HomeIcon className="cursor-pointer" fontSize='large'/></Link>
         </div>
         }
        </div>
       
        </div>
    </>
  )
}

export default Auth