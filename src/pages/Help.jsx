import React from 'react'
import Header from '../components/Header'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlagIcon from "@mui/icons-material/Flag";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Avatar, Button, TextField } from "@mui/material";
import Admin from "../assets/Images/UserPlaceHolder.jpg";
import VerifiedIcon from '@mui/icons-material/Verified';

function Help() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <Header/>
    <div className='flex justify-center mt-8 h-screen'>
    <div className="col-span-4 border-2 shadow-xl relative h-4/5 w-[450px] rounded-sm ">
            <div className="h-16 bg-slate-300 flex justify-between px-4 items-center">
              <div className="flex items-center">
                <Avatar
                  className="cursor-pointer"
                  src={Admin}
                  sx={{ width: 50, height: 50 }}
                />
                <p className="ms-3 text-lg font-bold">Admin<VerifiedIcon color='info' fontSize='small'/></p>
              </div>
              <div className=" flex justify-between ">
                {/* <Button>
                  <FlagIcon className="text-black" />
                </Button> */}
                <Button>
                  {/* <CallRoundedIcon className="text-black" /> */}
                </Button>
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
                <MenuItem onClick={handleClose}>Clear Chat</MenuItem>
                <MenuItem onClick={handleClose}>Safety</MenuItem>
              </Menu>
            </div>
            <div className="min-h-[480px] flex flex-col justify-center items-center p-2">
                <h1 className='text-2xl font-bold italic'>'Hi Kaif How can i help you'</h1>
                <h1 className='text-5xl font-bold text-yellow-400'>?</h1>
                {/* <div className='flex flex-col mt-2'>
                <div  className='w-fit max-w-96 p-2 bg-blue-600 rounded-b-xl rounded-r-xl mt-1  text-white'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius deserunt dolore numquam minima wdfewfedwdc cnnnnnnnnnnndjvds fdvmfdkvmfkfvd
                </div>
                <p className='px-2'>just now</p>
                </div>
                <div id='owned' className='flex flex-col mt-2 w-full '>
                <div id='own' className='w-fit max-w-96 p-2 bg-blue-600 rounded-b-xl rounded-r-xl mt-1  text-white'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius deserunt dolore numquam minima wdfewfedwdc cnnnnnnnnnnndjvds fdvmfdkvmfkfvd
                </div>
                <p className='px-2'>just now</p>
                </div>
                <div className='flex flex-col mt-2'>
                <div  className='w-fit max-w-96 p-2 bg-blue-600 rounded-b-xl rounded-r-xl mt-1  text-white'>
                    Lorem, ipsum dolor sit 
                </div>
                <p className='px-2'>just now</p>
                </div>
                <div id='owned' className='flex flex-col mt-2 w-full '>
                <div id='own' className='w-fit max-w-96  p-2 bg-blue-600 rounded-b-xl rounded-r-xl mt-1  text-white '>
                    Lorem,
                </div>
                <p className='px-2'>just now</p>
                </div> */}
                
            </div>
            <div className="flex items-center  min-h-12 bottom-0 absolute w-full ps-1">
              <TextField
                id="outlined-multiline-flexible"
                label="Type a message"
                multiline
                maxRows={4}
                sx={{ outline: "0"}}
                className="w-full border-0 outline-none"
                variant="standard"
                color=""
              />
            </div>
          </div>
    </div>
    </>
  )
}

export default Help