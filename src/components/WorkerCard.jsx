import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Electric from '../assets/Images/Electric.jpg'
import Rating from '@mui/material/Rating';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import { Link } from 'react-router-dom';
function WorkerCard() {
  return (
    <>
    <Link to={'/worker'}><Card className="cursor-pointer">
      <CardContent>
        <img src={Electric} alt="" className='rounded-lg' />
        <div className='text-black  font-bold mt-2 flex justify-between'>
          <p className='text-xl'>Kaif Umer</p>
          <div className='flex'>
          <p className='bg-green-600 px-2 text-white rounded-md'>4.5</p>
          <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
          </div>
        </div>
        <p className='mt-2 text-base'><LocationOnIcon/> Kottupuram,Chennai,Tamilnadu</p>
        <div className='mt-2 space-x-2'>
          <button className='border bg-gray-100 rounded-lg px-2'>Electrition</button>
          <button className='border bg-gray-100 rounded-lg px-2'>Plumber</button>
        </div>
      </CardContent>
      <CardActions className='space-x-2'>
        <Button startIcon={<CallRoundedIcon/>} style={{background:'green'}} size="small" variant="contained">Call</Button>
        <Button style={{background:'rgb(250 204 21 / var(--tw-bg-opacity))',color:'black'}} className="bg-yellow-400" size="small" startIcon={<QuestionAnswerRoundedIcon/>} variant="contained">Chat</Button>
      </CardActions>
    </Card></Link>
    </>
  )
}

export default WorkerCard