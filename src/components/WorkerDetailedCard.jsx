import React, { useState } from 'react'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Rating from "@mui/material/Rating";
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import StarsIcon from '@mui/icons-material/Stars';
import {  Button } from "@mui/material";
import Electric from '../assets/Images/Electric.jpg'
import { Link } from "react-router-dom";
import { SERVER_URL } from '../Services/serverURL';
import { toast } from 'react-toastify';
function WorkerDetailedCard({workerDetails}) {
  const [showPhoneNumber,setShowPhoneNumber]=useState(false)
  return (
    <>
    <div className="grid grid-cols-3 px-4 h-auto py-5">
        <div className="col-span-2  max-[554px]:ps-0">
          <h3 className="text-3xl font-bold mb-3 max-[525px]:text-xl">{workerDetails?.name}</h3>
          {workerDetails?.avarageReview!=0&&<div className="flex">
            <p style={{background:workerDetails?.avarageReview<3?'red':'green'}} className=" px-2 text-white rounded-md">{workerDetails?.avarageReview}</p>&nbsp;
            <Rating
              className=" text-xl"
              name="half-rating-read"
              value={parseFloat(workerDetails?.avarageReview)}
              precision={0.5}
              readOnly
            />
          </div>}
          <p className="mt-2 text-lg">
            <LocationOnIcon /> {`${workerDetails?.place},${workerDetails?.city},${workerDetails?.state}`}
          </p>
          <p>
            <span className="text-green-500">Service</span>:{workerDetails?.availableTime}
          </p>
          <p>
            <span className="text-green-500">Experience</span>: {workerDetails?.experience} year in this field
          </p>
          <div className="mt-2 space-x-2">
          {workerDetails?.categories?.map((category) => (
                <button className="border bg-gray-100 rounded-lg px-2 me-2">
                  {category}
                </button>
              ))}
          </div>
          
          <div className='space-x-3  flex mt-5 items-center'>
          
          <Link  to={sessionStorage.getItem('token')&& `https://api.whatsapp.com/send?phone=+91(${workerDetails?.whatsappNumber})&text=Hi+${workerDetails?.name}+I'm+Connected+via+CONNECTIE+I+would+like+to+contact+you!` }>
            <Button
            onClick={()=>{
              if(!sessionStorage.getItem("token")){
                toast.warning("Please Login!!")
              }
            }}
              style={{
                background: "rgb(250 204 21 / var(--tw-bg-opacity))",
                color: "black",
                fontWeight:'bold'
              }}
              className="bg-yellow-400"
              size="small"
              startIcon={<WhatsAppIcon />}
              variant="contained"
            >
              Chat
            </Button>
            </Link>
        <Link to={sessionStorage.getItem('token')&&`tel:${workerDetails?.phoneNumber}`}>
              <Button
                onClick={()=>{
                  if(!sessionStorage.getItem("token")){
                    toast.warning("Please Login!!")
                  }
                }}
                startIcon={<CallRoundedIcon />}
                style={{ background: "green" }}
                size="small"
                variant="contained"
              >
                {showPhoneNumber?workerDetails.phoneNumber:'**********'}
              </Button>
              </Link>
        <p onClick={()=>{
                if(sessionStorage.getItem("token")){
                  setShowPhoneNumber(!showPhoneNumber)
                }else{
                  toast.warning("Please Login!!")
                }
              }} className="text-blue-400 text-sm cursor-pointer ">Show Number</p>
             
      </div>
        </div>
        <div className="col flex items-center justify-end max-md:items-start">
        <img width={400} src={`${SERVER_URL}/uploads/${workerDetails?.registerImage}`}  alt="" className="rounded-md max-h-72" />
        </div>
      </div>
    </>
  )
}

export default WorkerDetailedCard