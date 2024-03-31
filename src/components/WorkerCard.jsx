import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Electric from "../assets/Images/Electric.jpg";
import Rating from "@mui/material/Rating";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../Services/serverURL";
import { toast } from "react-toastify";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
function WorkerCard({ worker }) {
  const navigate=useNavigate()
  const [showPhoneNumber,setShowPhoneNumber]=useState(false)
  return (
    <>
        <Card className="cursor-pointer min-w-[350px] shadow-lg hover:scale-105 hover:duration-700">
        <Link to={`/worker/${worker._id}`}>
          <CardContent>
            <div  style={{backgroundImage:`url(${SERVER_URL}/uploads/${worker?.registerImage})`}} className="h-64 min-w-[270px] bg-black bg-cover rounded-lg"></div>
            <div className="text-black  font-bold mt-2 flex justify-between">
              <p className="text-lg w-fit">{worker?.name}</p>
              {worker?.avarageReview!=0&&<div className="flex">
                <p style={{background:worker?.avarageReview<3?'red':'green'}} className=" text-sm px-1 text-white rounded-md h-fit">{worker?.avarageReview}</p>
                <Rating
                  name="half-rating-read"
                  defaultValue={parseFloat(worker?.avarageReview)}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </div>}
            </div>
            <p className="mt-2 text-base">
              <LocationOnIcon />
              {`${worker?.place},${worker?.city},${worker?.state}`}
            </p>
            <div className="mt-2 ">
              {worker.categories?.map((category) => (
                <button className="border bg-gray-100 rounded-lg px-2 me-2">
                  {category}
                </button>
              ))}
            </div>
          </CardContent>
          </Link>
          <CardActions className="space-x-2">
           
            <Link  to={sessionStorage.getItem('token')&& `https://api.whatsapp.com/send?phone=+91(${worker?.whatsappNumber})&text=Hi+${worker?.name}+I'm+Connected+via+CONNECTIE+I+would+like+to+contact+you!` }>
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
              <Link to={sessionStorage.getItem('token')&&`tel:${worker?.phoneNumber}`}>
              
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
                {showPhoneNumber?worker?.phoneNumber:'**********'}
              </Button>
              </Link>
              <p onClick={()=>{
                if(sessionStorage.getItem("token")){
                  setShowPhoneNumber(!showPhoneNumber)
                }else{
                  toast.warning("Please Login!!")
                }
              }} className="text-blue-400 text-sm cursor-pointer">Show Number</p>
          </CardActions>
        </Card>
      
    </>
  );
}

export default WorkerCard;
