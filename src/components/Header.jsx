import { Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Add from '@mui/icons-material/Add'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import UserPlaceHolder from "../assets/Images/UserPlaceHolder.jpg";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { SERVER_URL } from '../Services/serverURL';
function Header({insideWorkers,setSearchCity,insideRegister,insideWorker}) {
  const [loginedUser,setLoginedUser]=useState()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(()=>{
    setLoginedUser(JSON.parse(sessionStorage.getItem("user")))
  },[])
  return (
    <>
    <div className='py-3 min-h-16 px-3 shadow-xl'>
      <div className='flex w-full  justify-between'>
        <Link className='flex justify-center items-center' to={'/'}>
        <EngineeringIcon fontSize='large'/>
        <h4 className='text-2xl text-yellow-400 font-extrabold'>Connectie </h4>
        </Link>
        {insideWorkers&&<div className='flex max-[820px]:hidden justify-between items-center h-12 w-[360px] border border-black rounded-xl'>
          <input onChange={e=>setSearchCity(e.target.value)} className='ms-2 outline-none w-72 text-lg' placeholder="Search By State or City" type="text" />
          <SearchIcon className='me-2 cursor-pointer' fontSize='large' color='black' />
        </div>
        }
        <div className='flex  max-[598px]:block'>
        {insideWorker&&
          <Link to={'/workers'} className='max-[598px]:float-end'><Button  className='bg-yellow-300' variant="text">Back to Search</Button></Link>
        } 
        {!loginedUser?<div className="max-[598px]:float-end max-[598px]:mb-3 ">
        <Link to={'/login'}><Button style={{background:'rgb(250 204 21 / var(--tw-bg-opacity))',color:'black'}} className='bg-yellow-300' variant="contained">LogIn / SignUp</Button></Link>
        </div>:
        <div className='flex  space-x-5 max-[598px]:float-end max-[598px]:mb-3'>
        <Badge size="large" badgeContent={4} color="primary">
        <MailIcon className="cursor-pointer" fontSize='large' style={{color:'black'}} />
         </Badge>
         <Tooltip title="Account settings">
        { loginedUser.profileImage?<Avatar 
             onClick={handleClick}
             className="cursor-pointer"
             src={loginedUser.password==""?loginedUser.profileImage:`${SERVER_URL}/uploads/${loginedUser.profileImage}`} sx={{ width: 36, height: 36 }}/>:
             <Avatar 
             onClick={handleClick}
             className="cursor-pointer"
             src={UserPlaceHolder} sx={{ width: 36, height: 36 }}/>
             }
             
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem style={{background:'white',width:'270px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            {
              loginedUser.profileImage?
              <div style={{backgroundImage:loginedUser.password==""?`url(${loginedUser.profileImage})`:`url(${SERVER_URL}/uploads/${loginedUser.profileImage})`}} className="rounded-full w-28 h-28 bg-cover"></div>:
              <div style={{backgroundImage:`url(${UserPlaceHolder})`}} className="rounded-full w-28 h-28 bg-cover"></div>
            }
            <p className='font-bold text-lg mt-4'>{loginedUser.username}</p>
            <p className='font-bold '>{loginedUser.email}</p>
            <Link to={'/profile'} className='mt-1'><Button className='w-full mt-1' size='small' color='primary'  variant="contained">Edit Your Profile</Button></Link>
        </MenuItem>
        <Divider />
        <MenuItem  onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Help
        </MenuItem>
        <MenuItem  onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
        </div>}
        <div className='ms-5'>
        {!insideRegister&&<Link to={'/register'} className='max-[598px]:float-end max-[598px]:mb-3'><Button  color="success"  variant="contained" startIcon={<Add/>}>
         Register
        </Button></Link>}
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Header