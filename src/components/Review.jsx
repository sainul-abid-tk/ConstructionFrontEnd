import React,{ useState } from 'react'
import UserPlaceHolder from '../assets/Images/UserPlaceHolder.jpg'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {  Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

function Review({handleOpen,value,setValue}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const [anchorEl, setAnchorEl] = useState(null);
  // const [poperOpen, setPoperOpen] = useState(false);
  // const [placement, setPlacement] = useState();
  

  // const handleClick = (newPlacement) => (event) => {
  //   setAnchorEl(event.currentTarget);
  //   setPoperOpen((prev) => placement !== newPlacement || !prev);
  //   setPlacement(newPlacement);
  // };
   
      
    
    
  return (
    <div>
        <h1 className="text-2xl font-bold mt-10">Reviews and Ratings</h1>
        <div className="flex text-xl mt-4">
            <p className="bg-green-600 px-2 text-white rounded-md">4.5</p>&nbsp;
            <Rating size="large" name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
          </div>
          <h1 className="text-2xl font-bold mt-5">Start Your Reviews and Ratings</h1>
         <Rating
         onClick={handleOpen}
        size="large"
        style={{fontSize:'40px'}}
        className="mt-4"
        precision={0.5}
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      {/* <div className="grid grid-cols-6 border mt-5 w-full h-auto p-3">
        <div className="col-span-4">
        <div className="flex space-x-3">
        <img width={35} className="rounded-full" src={UserPlaceHolder} alt="" />
        <p className="font-bold text-lg">Adithyan</p>
        </div>
        <div className="flex mt-3">
            <p className="bg-green-600 px-2 text-white rounded-md">2.5</p>&nbsp;
            <Rating
              className=" text-xl"
              name="read-only"
              value={2.5}
              readOnly
              precision={0.5}

            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
            <div className="flex space-x-1">
            <p className="font-bold">20 jan 2023</p>
            <DeleteIcon  className='text-red-500 cursor-pointer'/>
            </div>
        </div>
        <p className="mt-3 col-span-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas iusto numquam excepturi maxime autem officiis itaque doloribus sapiente, aliquid est. Sequi asperiores itaque culpa consequuntur? Voluptas cupiditate nam ea est.</p> 
      </div> */}
      
      <h1 className="text-2xl font-bold mt-5">Customer Reviews</h1>
      <div className="flex space-x-4  mt-3">
        <Button size="small" variant="outlined">Latest</Button>
        <Button size="small" variant="outlined">High to Low</Button>
        <Button size="small" variant="outlined">Low to High</Button>
      </div>
      <div className="grid grid-cols-6 border mt-5 w-full h-auto p-3">
        <div className="col-span-4">
        <div className="flex space-x-3">
        <img width={35} className="rounded-full" src={UserPlaceHolder} alt="" />
        <p className="font-bold text-lg">Gafoor</p>
        </div>
        <div className="flex mt-3">
            <p className="bg-green-600 px-2 text-white rounded-md">3.5</p>&nbsp;
            <Rating
              className=" text-xl"
              name="read-only"
              value={3.5}
              readOnly
              precision={0.5}
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
            <div className="flex">
            <p className="font-bold">1 Feb 2023</p>
            <div className=' h-fit pb-5 cursor-pointer' onClick={handleClickOpen} >
            <MoreVertIcon />
            </div>
            <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className='text-red-500 font-bold'>Report The Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Why are you reporting this comment?
          </DialogContentText>
          <TextField
            autoFocus
            required
            multiline
            margin="dense"
            id="name"
            label="Reason"
            type="text"
            fullWidth
            rows={2}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained" color='error'>Report</Button>
        </DialogActions>
      </Dialog>
            </div>
        </div>
        <p className="mt-3 col-span-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas iusto numquam excepturi maxime autem officiis itaque doloribus sapiente, aliquid est. Sequi asperiores itaque culpa consequuntur? Voluptas cupiditate nam ea est.</p> 
      </div>
      <div className="grid grid-cols-6 border mt-5 w-full h-auto p-3">
        <div className="col-span-4">
        <div className="flex space-x-3">
        <img width={35} className="rounded-full" src={UserPlaceHolder} alt="" />
        <p className="font-bold text-lg">Antony</p>
        </div>
        <div className="flex mt-3">
            <p className="bg-green-600 px-2 text-white rounded-md">4.0</p>&nbsp;
            <Rating
              className=" text-xl"
              name="read-only"
              value={4.0}
              readOnly
              precision={0.5}
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
            <div className="flex">
            <p className="font-bold">30 jan 2023</p>
            <div className=' h-fit pb-5 cursor-pointer' onClick={handleClickOpen} >
            <MoreVertIcon />
            <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className='text-red-500 font-bold'>Report The Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Why are you reporting this comment?
          </DialogContentText>
          <TextField
            autoFocus
            required
            multiline
            margin="dense"
            id="name"
            label="Reason"
            type="text"
            fullWidth
            rows={2}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained" color='error'>Report</Button>
        </DialogActions>
      </Dialog>
            </div>
           
            </div>
        </div>
        <p className="mt-3 col-span-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas iusto numquam excepturi maxime autem officiis itaque doloribus sapiente, aliquid est. Sequi asperiores itaque culpa consequuntur? Voluptas cupiditate nam ea est.</p> 
      </div>
      <div className="grid grid-cols-6 border mt-5 w-full h-auto p-3">
        <div className="col-span-4">
        <div className="flex space-x-3">
        <img width={35} className="rounded-full" src={UserPlaceHolder} alt="" />
        <p className="font-bold text-lg">Adithyan</p>
        </div>
        <div className="flex mt-3">
            <p className="bg-green-600 px-2 text-white rounded-md">2.5</p>&nbsp;
            <Rating
              className=" text-xl"
              name="read-only"
              value={2.5}
              readOnly
              precision={0.5}

            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
            <div className="flex">
            <p className="font-bold">20 jan 2023</p>
            <div className=' h-fit pb-5 cursor-pointer' onClick={handleClickOpen} >
            <MoreVertIcon />
            </div>
            <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className='text-red-500 font-bold'>Report The Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Why are you reporting this comment?
          </DialogContentText>
          <TextField
            autoFocus
            required
            multiline
            margin="dense"
            id="name"
            label="Reason"
            type="text"
            fullWidth
            rows={2}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained" color='error'>Report</Button>
        </DialogActions>
      </Dialog>
            </div>
        </div>
        <p className="mt-3 col-span-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas iusto numquam excepturi maxime autem officiis itaque doloribus sapiente, aliquid est. Sequi asperiores itaque culpa consequuntur? Voluptas cupiditate nam ea est.</p> 
      </div>
    </div>
  )
}

export default Review