import React from 'react'
import { Link } from 'react-router-dom'
import CallIcon from '@mui/icons-material/Call';
import { Button } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EmailIcon from '@mui/icons-material/Email';
function Footer() {
  return (
    <div className='absolute'>
    <div className='grid grid-cols-4 px-8 py-5 max-lg:grid-cols-2 max-[500px]:grid-cols-1 mt-10'>
      <div>
      <Link className='flex  items-center' to={'/'}>
        <EngineeringIcon fontSize='large'/>
        <h4 className='text-2xl text-yellow-400 font-extrabold'>Connectie </h4>
        </Link>
      <p className='text-md italic font-bold'>"where your project needs, meet skilled hands and reliable workers"</p>
      </div>
      <div>
        <h6 className='font-bold text-xl'>Pages</h6>
        <ul className='mt-3'>
          <Link to={'/'}><li className='mb-2 text-lg'>Home</li></Link>
          <Link to={'/workers'}><li className='mb-2 text-lg'>Workers</li></Link>
          <Link to={'/'}><li className='mb-2 text-lg'>About</li></Link>
          <Link to={'/profile'}><li className='mb-2 text-lg'>Dashboard</li></Link>
        </ul>
      </div>
      <div>
      <h6 className='font-bold text-xl'>Customer Services</h6>
        <ul className='mt-3'>
          <Link to={'/help'}><li className='mb-2 text-lg'>Help</li></Link>
          <Link to={'/'}><li className='mb-2 text-lg'>Terms</li></Link>
          <Link to={'/'}><li className='mb-2 text-lg'>Privacy Policy</li></Link>
          <Link to={'/'}><li className='mb-2 text-lg'>FAQ</li></Link>
        </ul>
      </div>
      <div className='space-y-5'>
        <h4 className='text-xl font-bold '>Contact Us</h4>
        <Button variant='contained' className='w-full mb-5' startIcon={<CallIcon/>} color='success'>Call</Button>
        <Button variant="contained" className='w-full' startIcon={<EmailIcon/>} color='error'>E-mail</Button>
      </div>
    </div>
    <h6 className='text-lg text-center '>All Rights are recieved &copy;</h6>
    </div>
  )
}

export default Footer