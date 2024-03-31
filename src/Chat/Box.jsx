import React, { useEffect, useState, useRef, useContext } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ScrolltoBottom from "react-scroll-to-bottom";
import { Avatar, Button, TextField } from "@mui/material";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import GavelIcon from "@mui/icons-material/Gavel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { clearChatAPI, deleteMessageAPI } from "../Services/allAPI";
import { newMessageResContext } from "../ContextAPI/NewMessageArrivedResp";
import { adminChatRulesContext } from "../ContextAPI/AdminChatRuleResp";

const socket = io("https://constructionbackend-jqba.onrender.com");


function Box({ selectedConversation }) {
  const {newMessageArrivedResp,setNewMessageArrivedResp}=useContext(newMessageResContext)
  const {adminChatRulesResp,setAdminChatRulesResp}=useContext(adminChatRulesContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);

  const [showDeleteButton, setShowDeleteButton] = useState("");

  const handleMouseEnter = (index) => {
    setShowDeleteButton(index);
  };

  const handleMouseLeave = () => {
    setShowDeleteButton("");
  };

  const scrollToBottom=()=>{
    messageContainerRef.current?.scrollIntoView();
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMessageSend = () => {
    if (message) {
      let today = new Date();
      let timeStamp = new Intl.DateTimeFormat("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(today);
      const messageData = {
        roomId: selectedConversation._id,
        from: "admin",
        to: selectedConversation.roomId,
        message: message,
        time: timeStamp,
      };
      setMessage("");
      socket.emit("adminMessage", messageData);
      
    }
  };
  useEffect(() => {
    if(newMessageArrivedResp && messages.length>0){
      scrollToBottom()
    }
    socket.emit("adminSideRoom", selectedConversation._id);
    socket.on("adminMessage", (message) => {
      if(message.length===messages.length+1){
        setNewMessageArrivedResp(true)
      }
      setMessages(message); 
      if(message.length===messages.length){
        setNewMessageArrivedResp(false) 
        setMessages(message)
      }
    });
  }, [messages,selectedConversation,newMessageArrivedResp]);
  const handleClearChat = async (roomId) => {
    const result = await clearChatAPI(roomId);
    if (result.status === 200) {
      toast.success(result.data);
      handleClose();
    } else {
      console.log(result.response.data);
    }
  };
  const handleDelete=async(id)=>{
    const result= await deleteMessageAPI(id)
    if(result.status===200){
      console.log(result.data);
    }else{
      console.log(result.response.data);
    }
  }
  return (
    <>
      <div className="col-span-4 border-r-2 relative shadow-lg">
        {selectedConversation === "" ? (
          
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col">
              <h1 className="text-5xl font-bolder text-center ">
                Welcome <span className="text-yellow-400">Admin</span>
              </h1>
              <p className="italic mt-5 text-xl">
                Click to Chat! Let's Assist Users For Solutions.
              </p>
              <Button onClick={()=>setAdminChatRulesResp(true)}>
            <GavelIcon color="info"/>
                  Rules
             </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="h-16 bg-slate-300 flex justify-between px-4 items-center">
              <div className="flex items-center">
                {selectedConversation.roomId.length === 24 ? (
                  <Avatar
                    className="cursor-pointer "
                    sx={{ width: 50, height: 50 }}
                  />
                ) : (
                  <div
                    className="cursor-pointer bg-black rounded-full"
                    style={{ width: 50, height: 50 }}
                  />
                )}
                <p className="ms-3 text-lg font-bold">
                  {selectedConversation.roomId}
                </p>
              </div>
              <div className=" flex justify-between ">
                <Button
                  id="fade-button"
                  aria-controls={anchorEl ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon className="text-black" />
                </Button>
              </div>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem
                  onClick={() => handleClearChat(selectedConversation._id)}
                >
                  <ClearIcon color="error" />
                  Clear Chat
                </MenuItem>
                <MenuItem onClick={()=>{
                  setAdminChatRulesResp(true)
                  handleClose()
                }}>
                  <GavelIcon color="info"/>
                  Rules
                </MenuItem>
              </Menu>
            </div>
            <div className="max-h-[480px] p-2">
              <ScrolltoBottom
                className="message-container max-h-[480px]"
                ref={messageContainerRef}
              >
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      id={msg.from === "admin" ? "owned" : ""}
                      className="flex flex-col mt-2"
                      onMouseLeave={handleMouseLeave}
                    >
                      <div onMouseEnter={()=>handleMouseEnter(index)}
                  style={{position:'relative'}} className='w-fit cursor-pointer'>
                      <div
                        id={msg.from === "admin" ? "own" : ""}
                        className="max-w-fit p-2 bg-blue-600 rounded-b-xl rounded-r-xl mt-1 text-white white"
                      >
                        {msg.message
                          .match(/.{1,50}/g)
                          .map((chunk, chunkIndex) => (
                            <React.Fragment key={chunkIndex}>
                              {chunk}
                              {chunkIndex !==
                                msg.message.match(/.{1,50}/g).length - 1 && (
                                <br />
                              )}{" "}
                              {/* Add <br> except for the last chunk */}
                            </React.Fragment>
                          ))}
                        <p className="px-2 float-end mt-3 text-sm font-bold">
                          {msg.time}
                        </p>
                      </div>
                      {showDeleteButton===index && msg.from==='admin' &&(
                    <button
                      onClick={()=>handleDelete(msg._id)}
                      style={{
                        position: 'absolute',
                        left : -30,
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <DeleteIcon color="error"/>
                    </button>
                    )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-[480px] flex justify-center items-center">
                    <h1 className="text-xl font-bold text-red-600">
                      No Messsages Started Yet!!
                    </h1>
                  </div>
                )}

                <div ref={messageContainerRef} />
              </ScrolltoBottom>
            </div>
            <div className="flex items-center min-h-12  bottom-0 absolute w-full ps-1">
              <TextField
                id="outlined-multiline-flexible"
                label="Type a message"
                multiline
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxRows={4}
                sx={{ outline: "0" }}
                className="w-full border-0 outline-none"
                variant="standard"
                color=""
              />
              <button onClick={handleMessageSend}>
                <SendIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Box;
