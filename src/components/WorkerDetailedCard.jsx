import React from 'react'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Rating from "@mui/material/Rating";
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import StarsIcon from '@mui/icons-material/Stars';
import {  Button } from "@mui/material";
import Electric from '../assets/Images/Electric.jpg'
import { Link } from "react-router-dom";
function WorkerDetailedCard() {
  return (
    <>
    <div className="grid grid-cols-3 px-4 h-auto py-5">
        <div className="col-span-2  max-[554px]:ps-0">
          <h3 className="text-3xl font-bold mb-3 max-[525px]:text-xl">Kaif Umer</h3>
          <div className="flex">
            <p className="bg-green-600 px-2 text-white rounded-md">4.5</p>&nbsp;
            <Rating
              className=" text-xl"
              name="read-only"
              value={4.5}
              readOnly
            />
          </div>
          <p className="mt-2 text-lg">
            <LocationOnIcon /> Kottupuram,Chennai,Tamilnadu
          </p>
          <p>
            <span className="text-green-500">Service</span>: 24hours
          </p>
          <p>
            <span className="text-green-500">Experience</span>: 10 year in this field
          </p>
          <div className="mt-2 space-x-2">
            <button className="border bg-gray-100 rounded-lg px-2">
              Electrition
            </button>
            <button className="border bg-gray-100 rounded-lg px-2">
              Plumber
            </button>
          </div>
          <div className='space-x-3  flex mt-5'>
        <Button id="contact-btns" startIcon={<CallRoundedIcon/>} style={{background:'green'}} size="small" variant="contained">Call</Button>
        <Link ><Button id="contact-btns" style={{background:'rgb(250 204 21 / var(--tw-bg-opacity))',color:'black',width:"fit-content"}} className="bg-yellow-400 " size="small" startIcon={<QuestionAnswerRoundedIcon/>} variant="contained">Chat</Button></Link>
        <div>
        <Button  id="contact-btns"  startIcon={<StarsIcon color="warning"/>} style={{background:'white',color:'black'}} size="small" variant="contained">Tap to Rating</Button>
        </div>
      </div>
        </div>
        <div className="col flex items-center justify-end max-md:items-start">
        <img src={Electric} width={350} alt="" className="rounded-md" />
        </div>
      </div>
    </>
  )
}

export default WorkerDetailedCard