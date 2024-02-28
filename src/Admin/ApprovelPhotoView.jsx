import React, { useState } from 'react'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { SERVER_URL } from '../Services/serverURL';
import Slide from '@mui/material/Slide';
import { Button } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function ApprovelPhotoView({worker}) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
  return (
         <>
        <Button onClick={handleClickOpen}>
            <PermMediaIcon className="cursor-pointer" />
            </Button>
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
             Work Images
            </Typography>
            
          </Toolbar>
        </AppBar>
        <div className='grid grid-cols-4 w-full justify-evenly items-center mt-5 ps-8'>
        {worker?.workImages?.map((image)=>(
              <img width={300} src={`${SERVER_URL}/uploads/${image?.filename}`} alt="" />
            ))}
        </div>
    </Dialog>
</>   
  )
}

export default ApprovelPhotoView