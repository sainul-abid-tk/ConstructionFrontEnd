import React, { useContext, useEffect } from 'react'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Rating from "@mui/material/Rating";
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {  Button } from "@mui/material";
import Electric from '../assets/Images/Electric.jpg'
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteWorkerAPI, getUserWorkDetailsAPI } from '../Services/allAPI';
import { UserWorkDetailsContext } from '../ContextAPI/UserWorkDetails';
import EmptyWorker from '../assets/Images/EmptyWorker.gif'
import { Add } from '@mui/icons-material';
import { SERVER_URL } from '../Services/serverURL';
function UserEditableWorkCard() {
  const {userWorkDetails,setUserWorkDetails}=useContext(UserWorkDetailsContext)
  const getUserWorkerDetail=async()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"application/json",
         "Authorization": `Bearer ${token}`,
      }
      const result=await getUserWorkDetailsAPI(reqHeader)
      if(result.status==200){
        setUserWorkDetails(result.data)
      }else{
        console.log(result.response.data);
      }
    }
  }
  console.log(userWorkDetails);
  const handleWorkerDelete=async(wId)=>{
    const result =await deleteWorkerAPI(wId)
    if(result.status==200){
       alert(result.data)
    }else{
      console.log(result.response.data);
    }
  }
  useEffect(()=>{
    getUserWorkerDetail()
  },[handleWorkerDelete])
  return (
    <>
     {userWorkDetails?.length>0?<div className="grid grid-cols-3 px-4  h-auto ">
      {userWorkDetails.map((data)=>(
      <>
        <div className="col-span-2  max-[554px]:ps-0 mt-12">
          <h3 className="text-3xl font-bold mb-3 max-[525px]:text-xl">{data.name}</h3>
        { data.avarageReview!=0&&<div className="flex">
            <p className="bg-green-600 px-2 text-white rounded-md">{data.avarageReview}</p>&nbsp;
            <Rating
              className=" text-xl"
              name="read-only"
              value={data.avarageReview}
              readOnly
            />
          </div>}
          <p className="mt-2 text-lg ">
            <LocationOnIcon /> {`${data.place},${data.city},${data.state}`}
          </p>
          <p>
            <span className="text-green-500">Service</span>: {data.availableTime}
          </p>
          <p>
            <span className="text-green-500">Experience</span>: {data.experience} year in this field
          </p>
          <div className="mt-2 space-x-2">
            {data.categories?.map((category)=>(
              <button className="border bg-gray-100 rounded-lg px-2">
              {category}
            </button>
            ))
              }
          </div>
          <div className='flex  mt-5'>
          <Link to={`/userEditReg/${data._id}`}>
          <Button  id="contact-btns" className='bg-yellow-400' startIcon={<BorderColorIcon/>} style={{background:'rgb(250 204 21 / var(--tw-bg-opacity))',color:'black'}} size="small" variant="contained">Edit</Button>
          </Link>
          <DeleteIcon onClick={()=>handleWorkerDelete(data._id)} color="error" className='ms-5 cursor-pointer' fontSize='large'/>
          </div>
        </div>
        <img src={`${SERVER_URL}/uploads/${data.registerImage}`} width={460} alt="" className="rounded-md mt-12" />
        </>
        ))
        }</div>  :
       <div className="flex flex-col justify-center items-center h-full w-full py-5">
        <img src={EmptyWorker} width={600} alt="" />
        <h4 className='text-xl font-bold text-red-600'>Your not a worker, if you are a worker?</h4>
       <Link to={'/register'}>
       <Button variant="contained" style={{marginTop:'10px'}} color="success" startIcon={<Add/>}>Register</Button>
       </Link>
       </div>
     }
      
    </>
  )
}

export default UserEditableWorkCard