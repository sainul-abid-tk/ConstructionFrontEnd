import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Avatar, Button, TextField } from "@mui/material";
import Admin from "../assets/Images/UserPlaceHolder.jpg";
import VerifiedIcon from "@mui/icons-material/Verified";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from "@mui/icons-material/Clear";
import GavelIcon from "@mui/icons-material/Gavel";
import { io } from "socket.io-client";
import { newMessageResContext } from "../ContextAPI/NewMessageArrivedResp";
import { clearChatAPI, deleteMessageAPI } from "../Services/allAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const socket = io("https://constructionbackend-jqba.onrender.com");
console.log(socket);
function Help() {
  const {newMessageArrivedResp,setNewMessageArrivedResp}=useContext(newMessageResContext)
  const [userId, setUserId] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);
  const [showDeleteButton, setShowDeleteButton] = useState("");
  const [rulesIsOpened,setRulesIsOpened]=useState(false)
  const handleMouseEnter = (index) => {
    setShowDeleteButton(index);
  };

  const handleMouseLeave = () => {
    setShowDeleteButton("");
  };
  const scrollToBottom = () => {
    messageContainerRef.current.scrollIntoView()
  };
  
  const handleMessageSend = async() => {
    if (message) {
      let today = new Date();
      let timeStamp = new Intl.DateTimeFormat("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(today);
      const messageData = {
        from: userId,
        to: "admin",
        message: message,
        time: timeStamp,
      };
      setMessage("");
      socket.emit("userMessage",messageData)
    }
  };
  useEffect(() => {
    setUserId(
      sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user"))._id
        : new Date().toString().slice(0, 24).replace(/\s+/g, "")
    );
    if (userId) {
      socket.emit("userConnected", userId);
    }
  }, [userId]);
  useEffect(()=>{
    if(newMessageArrivedResp && messages.length>0){
      scrollToBottom()
    } 
    socket.emit("userSideRoom", userId);
      socket.on("adminMessage", (message) => {
            if(message.length===messages.length+1){
              setNewMessageArrivedResp(true)
            }
            setMessages(message); 
            if(message.length===messages.length ){
              setNewMessageArrivedResp(false) 
              setMessages(message); 
            }
      });
  },[messages,newMessageArrivedResp,rulesIsOpened])
  const handleDelete=async(id)=>{
      const result= await deleteMessageAPI(id)
    if(result.status===200){
      console.log(result.data)
    }else{
      console.log(result.response.data);
    }
    
  }
  const handleClearChat = async (roomId) => {
    const result = await clearChatAPI(roomId);
    if (result.status === 200) {
      messages.length>0&&toast.info(result.data);
      handleClose();
    } else {
      console.log(result.response.data);
    }
  };
  
  return (
    <>
      <Header />
      
        {rulesIsOpened?
        <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          <div className="flex justify-end items-end">
          <Button onClick={()=>setRulesIsOpened(false)}>
                Back To Chat
              </Button>
          </div>
  <h2 className="text-2xl font-semibold mb-4">Rules for Chat Platform <GavelIcon color="info"/></h2>

  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">1. User Identification:</h3>
    <p>All users engaging with the chat platform must be identified either as logged-in users or non-logged-in users. Logged-in users are those who have an active account on the website, while non-logged-in users are visitors who haven't logged in or have logged out.</p>
  </div>

  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">2. Message Retrieval:</h3>
    <p>Logged-in users have the privilege of accessing previous chat messages upon revisiting the chat platform. However, non-logged-in users, hereafter referred to as "temporary users," do not have this privilege. Messages exchanged by temporary users will not be retrievable once they leave the chat platform or refresh the page.</p>
  </div>

  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">3. Session Persistence:</h3>
    <p>For logged-in users, chat sessions are persistent across multiple visits. They can resume conversations seamlessly and access previous messages. Conversely, temporary users' chat sessions are transient and do not persist beyond their current session. If a temporary user leaves the page or refreshes it, their chat history will be lost</p>
  </div>

  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">4. Admin Interaction:</h3>
    <p>The chat platform is exclusively for communication between users and administrators. Users are expected to engage respectfully and within the guidelines of the website's terms of service. Any misuse or abuse of the chat platform may result in suspension or termination of chat privileges.</p>
  </div>

  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">5. Privacy and Security:</h3>
    <p>Users are responsible for the content of their messages. Personal information should not be shared in public chat sessions. Administrators will not solicit sensitive information such as passwords or financial details through the chat platform. Users are encouraged to report any suspicious activity or breaches of privacy.</p>
  </div>

  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">6. Moderation:</h3>
    <p>Administrators reserve the right to monitor and moderate chat conversations. Any messages deemed inappropriate, offensive, or in violation of the website's policies will be removed. Users who repeatedly violate chat rules may face disciplinary action, including account suspension or banning from the chat platform.</p>
  </div>

  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">7.Technical Support:</h3>
    <p> The chat platform also serves as a help center for technical support and assistance. Users can seek help from administrators regarding website functionality, account issues, or any other related queries. Administrators will endeavor to provide timely and helpful responses to user inquiries.</p>
  </div>


  <div className="mt-6">
    <p className="text-sm text-gray-600">
      By engaging with the chat platform, users agree to abide by these rules and guidelines. Failure to comply may result in restrictions or termination of chat privileges. Administrators reserve the right to amend or update these rules as necessary to ensure the smooth operation of the chat platform and the safety of its users.
    </p>
  </div>
</div>
        
        :
        <div className="flex justify-center mt-8 h-[83vh] ">
        <div className="col-span-4 border-2 shadow-xl relative  w-[450px]  rounded-sm">
          <div className="h-16 bg-slate-300 flex justify-between px-4 items-center">
            <div className="flex items-center">
              <Avatar
                className="cursor-pointer"
                src={Admin}
                sx={{ width: 50, height: 50 }}
              />
              <p className="ms-3 text-lg font-bold">
                Admin
                <VerifiedIcon color="info" fontSize="small" />
              </p>
            </div>
            <div className=" flex justify-between ">
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
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
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={()=>handleClearChat(messages.length>0&&messages[0].roomId)}><ClearIcon color="error" />Clear Chat</MenuItem>
              <MenuItem onClick={()=>{
                setRulesIsOpened(true)
                handleClose()
              }}><GavelIcon color="info"/>Rules</MenuItem>
            </Menu>
          </div>
            {messages?.length > 0 && !rulesIsOpened ? ( 
              <div className="message-container max-h-[500px] p-2">
                {messages?.map((msg, index) => (
                  <div
                    key={index}
                    id={msg.from === userId ? "owned" : ""}
                    className="flex flex-col mt-2"
                    ref={messageContainerRef}
                    onMouseLeave={handleMouseLeave}
                  >
                    
                    <div onMouseEnter={()=>handleMouseEnter(index)}
                  style={{position:'relative'}} className='w-fit cursor-pointer'>
                    <div
                      id={msg.from === userId ? "own" : ""}
                      className="max-w-fit p-2 bg-blue-600 rounded-b-xl rounded-r-xl mt-1 text-white white"
                    >
                      {msg.message
                        .match(/.{1,35}/g)
                        .map((chunk, chunkIndex) => (
                          <React.Fragment key={chunkIndex}>
                            {chunk}
                            {chunkIndex !==
                              msg.message.match(/.{1,35}/g).length - 1 && (
                              <br />
                            )}{" "}
                            {/* Add <br> except for the last chunk */}
                          </React.Fragment>
                        ))}
                      <p className="px-2 float-end mt-3 text-sm font-bold">
                        {msg.time}
                      </p>
                    </div>
                    {showDeleteButton===index && msg.from===userId &&(
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
                ))}
              </div>
            ) : 
            (
              <div className="min-h-[480px] flex flex-col justify-center items-center p-2">
          
                  {sessionStorage.getItem("user")
                    ?<>
                    <h1 className="text-2xl font-bold italic"> {`Hi ${
                        JSON.parse(
                          sessionStorage.getItem("user")
                        ).username.split(" ")[0]
                      } How can i help you`}</h1>
                      <h1 className="text-5xl font-bold text-yellow-400">?</h1>
                    </>
                    :
                    <h1 className="text-2xl font-bold italic text-center">" <span className="text-2xl font-bold italic text-center text-yellow-400">Welcome!</span> Kindly refrain from navigating away once the chat begins. For further details, please review the rules section !"</h1>
                    }
            
                
              </div>
            )
            }

            
           {!rulesIsOpened&&<div className="flex items-center  min-h-10 bottom-0 absolute w-full ps-1 bg-white">
            <TextField
              id="outlined-multiline-flexible"
              label="Type a message"
              multiline
              value={message}
              onChange={(e)=> setMessage(e.target.value)}
              maxRows={4}
              sx={{ outline: "0" }}
              className="w-full border-0 outline-none "
              variant="standard"
              color=""
            />
            <button onClick={handleMessageSend}>
              <SendIcon />
            </button>
          </div>}
          </div>
        </div>}
    </>
  );
}

export default Help;
