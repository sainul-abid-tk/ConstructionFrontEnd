import { Avatar, Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Add from '@mui/icons-material/Add'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { SERVER_URL } from '../Services/serverURL';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { city } from "../assets/AllCities/Cities";
import HomeIcon from "@mui/icons-material/Home";
import { profileUpdateResponseContext } from '../ContextAPI/AvarageRes';
function Header({insideWorkers,setSearchCity,insideRegister,insideWorker,searchCity,setSeacrh,seacrh}) {
  const {profileUpdateResponse,setProfileUpdateResponse}=useContext(profileUpdateResponseContext)
  const navigate=useNavigate()
  const [loginedUser,setLoginedUser]=useState()
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredCity,setFilteredCity]=useState([])
  const [selectedItem,setSelectedItem]=useState(-1)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(()=>{
    setLoginedUser(JSON.parse(sessionStorage.getItem("user")))
    searchCity &&
    setFilteredCity(city
        .filter((item) => {
          if (
            item.name.toLowerCase().includes(searchCity) ||
            item.state.toLowerCase().includes(searchCity)
          ) {
            return item;
          }
        }))
        if(searchCity==""){
          setSeacrh(!seacrh)
        }
  },[searchCity,profileUpdateResponse])
  const handleKey=(e)=>{
    if(selectedItem<filteredCity.length){
      if(e.key=="ArrowUp"&&selectedItem>0){
        setSelectedItem(prev=>prev-1)
      }else if(e.key=="ArrowDown"&&selectedItem<filteredCity.length-1){
        setSelectedItem(prev=>prev+1)
      }else if(e.key=="Enter" && selectedItem>=0){
        setSearchCity(`${filteredCity[selectedItem].name},${filteredCity[selectedItem].state}`)
        setSeacrh(!seacrh)
      }
    }else{
      setSelectedItem(-1)
    }
  }
  const selectActiveProductIntoView=(index)=>{
    const activeProduct=document.getElementById(`product-${index}`)
    if(activeProduct){
      activeProduct.scrollIntoView({
        block:'nearest',inline:'start',
        behavior:'smooth'
      })
    }
  }
  useEffect(()=>{
    if(selectedItem!=-1){
      selectActiveProductIntoView(selectedItem)
    }
  },[selectedItem])

  

  return (
    <>
    <ToastContainer
          autoClose={3000}
          position="top-center"
          theme="colored"
        />
    <div className='py-3 min-h-16 px-3 shadow-xl relative '>
    
      <div className='flex w-full  justify-between'>
        <Link className='flex justify-center items-center' to={'/'}>
        <EngineeringIcon fontSize='large'/>
        <h4 className='text-2xl text-yellow-400 font-extrabold'>Connectie </h4>
        </Link>
        {insideWorkers&&
        <div className='relative'>
        <div className='flex max-[820px]:hidden justify-between items-center h-12 w-[360px] border border-gray-400 rounded-xl shadow-md'>
          <input value={searchCity} onKeyDown={e=>handleKey(e)} onChange={e=>setSearchCity(e.target.value)} className='ms-2 outline-none w-72 text-lg' placeholder="Search by state or city" type="text" />
          <SearchIcon
          onClick={()=>setSeacrh(!seacrh)}
           className='me-2 cursor-pointer' fontSize='large' color='black' />
        </div>
        <div className="absolute z-10 flex justify-center items-center w-full max-[820px]:hidden">
        <div  className="bg-white w-[360px] space-y-1 max-h-60 min-h-fit overflow-y-auto overflow-x-hidden">
            {searchCity&&
        filteredCity?.map((data,index) => (
          <MenuItem
          key={index}
          value={`${data.name},${ data.state}`}
          id={`product-${index}`}
          className={selectedItem===index?'searchSuggestionLine active':'searchSuggestionLine'}
          onClick={()=>{
            setSearchCity(`${data.name},${data.state}`)
            setSeacrh(!seacrh)
          }}
        >
          {`${data.name},${ data.state}`}
        </MenuItem>
        ))}
            </div>
        </div>
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
        {JSON.parse(sessionStorage.getItem("user")).email=="admin123@gmail.com"&&
        <Link to={'/adhome'}><Button variant='outlined'startIcon={<HomeIcon/>}>Back To Home</Button></Link>
         }
         {JSON.parse(sessionStorage.getItem("user")).email!="admin123@gmail.com"&&<Tooltip title="Account settings">
        <Avatar 
             onClick={handleClick}
             className="cursor-pointer"
             src={loginedUser?.password!=""?`${SERVER_URL}/uploads/${loginedUser?.profileImage}`:loginedUser?.profileImage.startsWith('https')?loginedUser?.profileImage:`${SERVER_URL}/uploads/${loginedUser?.profileImage}`} sx={{ width: 36, height: 36 }}/>
        </Tooltip>}
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
              
              <div style={{backgroundImage:loginedUser?.password!=""?`url(${SERVER_URL}/uploads/${loginedUser?.profileImage})`:loginedUser?.profileImage.startsWith('https')?`url(${loginedUser?.profileImage})`:`url(${SERVER_URL}/uploads/${loginedUser?.profileImage})`}} className="rounded-full w-28 h-28 bg-cover"></div>
            }
            <p className='font-bold text-lg mt-4'>{loginedUser.username}</p>
            <p className='font-bold '>{loginedUser.email}</p>
            <Link to={'/profile'} className='mt-1'><Button className='w-full mt-1' size='small' color='primary'  variant="contained">Edit Your Profile</Button></Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={()=>{
          navigate('/help')
        }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Help
        </MenuItem>
        <MenuItem  onClick={()=>{
          toast.success("Log-Out Successfully")
           setTimeout(() => {
            sessionStorage.removeItem("user")
           sessionStorage.removeItem("token")
           setLoginedUser("")
           navigate('/')
           }, 2000);
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
        </div>}
        <div className='ms-5'>
        {!insideRegister&&<div  className='max-[598px]:float-end max-[598px]:mb-3'><Button onClick={()=>{
          if(sessionStorage.getItem("token")){
            navigate('/register')
          }else{
            toast.info("Please Login!!!")
          }
        }} color="success"  variant="contained" startIcon={<Add/>}>
         Register
        </Button></div>}
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Header