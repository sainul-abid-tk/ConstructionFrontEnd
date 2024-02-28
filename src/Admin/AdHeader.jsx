import React, { useContext, useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ReportIcon from '@mui/icons-material/Report';
import MessageIcon from '@mui/icons-material/Message';
import Person4Icon from '@mui/icons-material/Person4';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminReportResponseContext } from '../ContextAPI/AvarageRes';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { newWorkerNotificationContext } from '../ContextAPI/NewWorkerNotify';
import { getAdminAllworkersAPI, getReportedReviewsAPI } from '../Services/allAPI';
const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
function AdHeader() {
  const {newWorkerNotification,setNewWorkerNotification}=useContext(newWorkerNotificationContext)
  const {adminReportResponse,setAdminReportResponse}=useContext(adminReportResponseContext)
  const [newRowCount,setNewRowCount]=useState(0)
    const navigate=useNavigate()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [activeIcon, setActiveIcon] = useState(null);
    const handleIconClick = (iconName) => {
      setActiveIcon(iconName);
      navigate('/ad' + iconName);
    };
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const getAllWorkers = async () => {
      const result = await getAdminAllworkersAPI();
      if (result.status === 200) {
        setNewRowCount(result.data.filter((item=>(
          item.status=="pending"
        ))).length);
      } else {
        console.log(result.response.data);
      }
    };
    const getAllReportedReviews=async()=>{
      const result=await getReportedReviewsAPI()
      if(result.status==200){
        setAdminReportResponse(result.data.length)
      }else{
        console.log(result.response.data);
      }
    }
    useEffect(()=>{
      getAllWorkers()
      getAllReportedReviews()
    },[newWorkerNotification,activeIcon,])
  return (
    <Box >
    <CssBaseline />
    <AppBar position="fixed" style={{background:'white'}}  open={open}>
      <Toolbar  className='flex justify-between'>
        <IconButton
          style={{color:'black'}}
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <div className='w-full '>
        <Link to={'/'} className="cursor-pointer flex  w-44 ">
        <EngineeringIcon style={{color:'black'}} fontSize='large'/>
        <h4 className='text-2xl text-yellow-400 font-extrabold'>Connectie </h4>
         </Link>
        </div>
        
        <Typography className='flex space-x-4'>
          <Badge badgeContent={newRowCount} color="error">
          <NotificationsIcon onClick={()=>{
          handleIconClick('approve')
        }} style={{ color: activeIcon === 'approve' ? 'blue' : 'black' }} fontSize='large' className=' cursor-pointer'/>
          </Badge>
        <Button onClick={()=>{
          toast.success("LogOut Successfully")
           setTimeout(() => {
            sessionStorage.removeItem("user")
           sessionStorage.removeItem("token")
           navigate('/')
           }, 2000);
        }} style={{width:'150px'}} color='error' variant='contained' startIcon={<LogoutIcon/>}>LogOut</Button>
          
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer  variant="permanent"  open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List className='space-y-5 mt-5'>
        <div  className='flex  h-12  items-center px-3 cursor-pointer '  style={{color:activeIcon=='home'?'blue':'black'}}>
       <HomeIcon onClick={()=>{
          handleIconClick('home')
        }} style={{ color: activeIcon === 'home' ? 'blue' : 'black' }} className='me-5' fontSize='large' />
        <p style={{color:activeIcon=='home'?'blue':'black'}} className='text-lg font-bold'>HOME</p>
        </div>
        <Divider />
        <div  style={{color:activeIcon=='users'?'blue':'black'}} className='flex  h-10  items-center px-3 cursor-pointer'>
        <PeopleAltIcon onClick={()=>{
          handleIconClick('users')
        }} style={{ color: activeIcon === 'users' ? 'blue' : 'black' }} className='me-5' fontSize='large'/>
        <p className='text-lg font-bold'>USERS</p>
        </div>
        <Divider/>
        <div  style={{color:activeIcon=='workers'?'blue':'black'}} className='flex  h-10  items-center px-3 cursor-pointer'>
        <EngineeringIcon onClick={()=>{
          handleIconClick('Workers')
        }} style={{ color: activeIcon === 'Workers' ? 'blue' : 'black' }} className='me-5' fontSize='large'/>
        <p className='text-lg font-bold'>WORKERS</p>
        </div>
        <Divider />
        <div  style={{color:activeIcon=='charts'?'blue':'black'}} className='flex  h-10  items-center px-3 cursor-pointer'>
        <BarChartIcon onClick={()=>{
          handleIconClick('Chart')
        }} style={{ color: activeIcon === 'Chart' ? 'blue' : 'black' }} className='me-5' fontSize='large'/>
        <p className='text-lg font-bold'>CHARTS</p>
        </div>
        <Divider/>
        <div  style={{color:activeIcon=='reviews'?'blue':'black'}}  className='flex  h-10  items-center px-3 cursor-pointer'>
        <ReviewsIcon onClick={()=>{
          handleIconClick('Reviews')
        }} style={{ color: activeIcon === 'Reviews' ? 'blue' : 'black' }} className='me-5' fontSize='large'/>
        <p className='text-lg font-bold'>REVIEWS</p>
        </div>
        <Divider/>
        <div  style={{color:activeIcon=='report'?'blue':'black'}}  className='flex  h-10  items-center px-3 cursor-pointer'>
        <Badge onClick={()=>{
          handleIconClick('Reports')
        }} style={{ color: activeIcon === 'Reports' ? 'blue' : 'black' }} badgeContent={adminReportResponse} color="error" className='me-5'>
        <ReportIcon  fontSize='large'/>
        </Badge>
        <p className='text-lg font-bold'>REPORTS</p>
        </div>
        <Divider/>
        <div style={{color:activeIcon=='contact'?'blue':'black'}}  className='flex  h-10  items-center px-3 cursor-pointer'>
        <Badge onClick={()=>{
          handleIconClick('Contact')
        }} style={{ color: activeIcon === 'Contact' ? 'blue' : 'black' }} badgeContent={1} color="error" className='me-5'> 
        <MessageIcon  fontSize='large'/>
        </Badge>
        <p className='text-lg font-bold'>CONTACT</p>
        </div>
        <Divider/>
        <div  style={{color:activeIcon=='profile'?'blue':'black'}} className='flex  h-10  items-center px-3 cursor-pointer'>
        <Person4Icon onClick={()=>{
          handleIconClick('Profile')
        }} style={{ color: activeIcon === 'Profile' ? 'blue' : 'black' }} className='me-5' fontSize='large'/>
        <p className='text-lg font-bold'>PROFILE</p>
        </div>
      </List>
    </Drawer>
    <ToastContainer
          autoClose={2000}
          position="top-center"
          theme="colored"
        />
 </Box>
  )
}

export default AdHeader