import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "./Box";
import {io} from "socket.io-client"
import { deleteRoomAPI } from "../Services/allAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const socket=io('https://constructionbackend-jqba.onrender.com')
function Chat() {
  const [selectedConversation,setSelectedConversation]=useState("")
  const [allRooms,setAllRooms]=useState([])
  const [msgNotification,setMsgNotification]=useState("")
  const [msgCount,setMsgCount]=useState(0)
  const getAllRooms=()=>{
    socket.emit('adminRoomOpen')
    
    socket.on('adminRooms',(rooms)=>{
      console.log(rooms);
      setAllRooms(rooms)
    })
  }
  useEffect(()=>{
    getAllRooms()
    const intervalId = setInterval(() => {
    socket.emit("adminConnected",'admin')
    socket.on('notification',(notification)=>{
      setMsgNotification(notification)
     })
    }, 500); // Toggle every 2 seconds
  
    return () => clearInterval(intervalId);
  },[])
  console.log(msgNotification);
  const handleRoomDelete=async(id)=>{
    const result =await deleteRoomAPI(id)
    if(result.status===200){
      toast.success(result.data)
      getAllRooms()
      setSelectedConversation("")
    }else{
      console.log(result.response.data);
    }
  }
  const roomNotification=(roomId)=>{
    if(msgNotification.length>0){
    return msgNotification?.filter((msg)=>(
      msg.roomId===roomId
    )).length
    }else{
      return 0
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen pt-4">
        <div className="grid grid-cols-6 w-3/4 max-[1000px]:px-3 max-[1000px]:w-auto h-5/6 ">
          <div className="col-span-2 border-2">
            <div className="bg-slate-300 h-[62px] flex justify-center items-center ">
              <p className="text-2xl font-bold ">Inbox</p>
            </div>
            {allRooms.length>0?allRooms.map((room)=>(
              <div  className=" border-b-2 h-20 flex  px-3  justify-between items-center cursor-pointer">
              <div onClick={()=>setSelectedConversation(room)} className="flex items-center">
                {room.roomId.length===24?<Avatar
                  className="cursor-pointer "
                  sx={{ width: 50, height: 50 }}
                />:
                <div
                  className="cursor-pointer bg-black rounded-full"
                  style={{ width: 50, height: 50 }}
                />}
                <div className="flex flex-col ms-4">
                  <p className=" font-bold">{room.roomId}</p>
                </div>
                <div>
                  {roomNotification(room._id)!==0&& 
                    <div className="ms-3 h-7 w-7 bg-green-400 flex justify-center items-center rounded-full">
                      <p className="font-bold">{roomNotification(room._id)}</p>
                    </div>
                  }
                </div>
              </div>
              <h3 className="cursor-pointer" onClick={()=>handleRoomDelete(room._id)}><DeleteIcon color="error"/></h3>
            </div>
            )):
            <div className="h-full flex justify-center items-center">
              <h1 className="text-xl font-bold text-red-600">No Users Found !!!</h1>
            </div>
          }
            </div>
          <Box selectedConversation={selectedConversation}/>
      </div>
      </div>
    </>
  );
}

export default Chat;
