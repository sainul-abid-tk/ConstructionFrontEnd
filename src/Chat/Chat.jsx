import React, { useState } from "react";
import Header from "../components/Header";
import { Avatar, Button } from "@mui/material";
import welding from "../assets/Images/Electric.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Box from "./Box";

function Chat() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Header />
      <div className="flex justify-center  h-screen pt-4">
        <div className="grid grid-cols-6 w-3/4 max-[1000px]:px-3 max-[1000px]:w-auto h-5/6 ">
          <div className="col-span-2 border-2">
            <div className="bg-slate-300 h-[62px] flex justify-center items-center ">
              <p className="text-2xl font-bold ">Inbox</p>
            </div>
            <div className=" border-b-2 h-20 flex  px-3  justify-between cursor-pointer">
              <div className="flex items-center">
                <Avatar
                  className="cursor-pointer"
                  src={welding}
                  sx={{ width: 50, height: 50 }}
                />
                <div className="flex flex-col ms-4">
                  <p className=" font-bold">Kaif Umer</p>
                  <p>Plumber,Electretion</p>
                </div>
                
              </div>
              <MoreVertIcon  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined} 
                  onClick={handleClick} className="mt-3 cursor-pointer" />
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
                <MenuItem onClick={handleClose}>Delete Chat</MenuItem>
                <MenuItem onClick={handleClose}>Safety</MenuItem>
                <MenuItem onClick={handleClose}>Report</MenuItem>
              </Menu>
          </div>
          <Box/>
        </div>
      </div>
    </>
  );
}

export default Chat;
