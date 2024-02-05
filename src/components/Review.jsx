import React,{ useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserPlaceHolder from '../assets/Images/UserPlaceHolder.jpg'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";

function Review() {
    const [anchorEl, setAnchorEl] = useState(null);
  const [poperOpen, setPoperOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [value, setValue] = useState("");
    const [hover, setHover] = useState(-1);
    const [reviewStarName,setReviewStarName]=useState("")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
      setOpen(false)
    }  

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setPoperOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
      };
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };
    
    function getLabelText(value) {
      return labels[value];
    }
  
    useEffect(()=>{
      setReviewStarName(getLabelText(value))
    },[value])
  return (
    <div>
        <h1 className="text-2xl font-bold mt-10">Reviews and Ratings</h1>
        <div className="flex text-xl mt-4">
            <p className="bg-green-600 px-2 text-white rounded-md">4.5</p>&nbsp;
            <Rating size="large" name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
          </div>
          <h1 className="text-2xl font-bold mt-5">Start Your Reviews and Ratings</h1>
          <Rating
        name="hover-feedback"
        value={value}
        onClick={handleOpen}
        size="large"
        style={{fontSize:'40px'}}
        className="mt-4"
        precision={0.5}
        onChange={(event, newValue) => {  
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='rounded-xl' sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <Rating
        name="hover-feedback"
        value={value}
        onClick={handleOpen}
        size="large"
        style={{fontSize:'40px'}}
        className="mt-4"
        getLabelText={getLabelText}
        precision={0.5}
        readOnly
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        // onChangeActive={(event, newHover) => {
        //   setHover(newHover);
        // }}
      />
      <h4 className="text-xl font-bold text-yellow-300">{reviewStarName}</h4>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2,mb:4 }}>
          <TextField
          id="standard-multiline-static"
          label="Add Your Comment"
          className='w-full'
          multiline
          rows={5}
          variant="standard"
        />
          </Typography>
          <div className="flex justify-end space-x-4">
          <Button onClick={handleClose} color="error" variant="contained">Cancel</Button>
          <Button onClick={handleClose} variant="contained">Add</Button>
          </div>
        </Box>
      </Modal>
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
            <div className=' h-fit pb-5 cursor-pointer'  onClick={handleClick('bottom-end')}>
            <MoreVertIcon />
            <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={poperOpen}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography  className="bg-red-600 text-white rounded-b-lg rounded-ss-lg cursor-pointer mt-3 px-3 py-1">Report The Review</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
            </div>
           
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
            <div className=' h-fit pb-5 cursor-pointer'  onClick={handleClick('bottom-end')}>
            <MoreVertIcon />
            <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={poperOpen}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography  className="bg-red-600 text-white rounded-b-lg rounded-ss-lg cursor-pointer mt-3 px-3 py-1">Report The Review</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
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
            <div className=' h-fit pb-5 cursor-pointer'  onClick={handleClick('bottom-end')}>
            <MoreVertIcon />
            <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={poperOpen}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography  className="bg-red-600 text-white rounded-b-lg rounded-ss-lg cursor-pointer mt-3 px-3 py-1">Report The Review</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
            </div>
           
            </div>
        </div>
        <p className="mt-3 col-span-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas iusto numquam excepturi maxime autem officiis itaque doloribus sapiente, aliquid est. Sequi asperiores itaque culpa consequuntur? Voluptas cupiditate nam ea est.</p> 
      </div>
    </div>
  )
}

export default Review