import React, { useContext, useEffect, useState } from 'react'
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import AdHeader from './AdHeader';
import { Link } from 'react-router-dom';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import GoogleIcon from '@mui/icons-material/Google';
import AdEditUser from './AdEditUser';
import { deleteUserAPI, getAdAllUsersAPI, getDecryptedEnvAPI } from '../Services/allAPI';
import { SERVER_URL } from '../Services/serverURL';
import {decrypt} from 'n-krypta'
import { profileUpdateResponseContext } from '../ContextAPI/AvarageRes';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function AdUsers() {
  const {profileUpdateResponse,setProfileUpdateResponse} =useContext(profileUpdateResponseContext)
  const [userSearch,setUserSearch]=useState("")
  const [allUsers,setAllUsers]=useState([])
  const [decryptKey,setDecryptKey]=useState("")
  const [currentPage,setCurrentPage]=useState(1)
  const recordsPerPage=5
  const lastIndex=currentPage * recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage
  const records=allUsers?.slice(firstIndex,lastIndex)
  const nPage=Math.ceil(allUsers?.length/recordsPerPage)
  const numbers=[...Array(nPage+1).keys()].slice(1)
  const prePage=()=>{
    if(currentPage!==1){
      setCurrentPage(currentPage-1)
    }
  }
  const nextPage=()=>{
    if(currentPage!==nPage){
      setCurrentPage(currentPage+1)
    }
  }
  const changeCPage=(id)=>{
    setCurrentPage(id)
  }
  const getAllUsers=async()=>{
    const result=await getAdAllUsersAPI()
    if(result.status==200){
      setAllUsers(result.data.filter((user)=>(
       userSearch==""?user:user._id.includes(userSearch) || user.username.includes(userSearch) || user.email.includes(userSearch)
      )))
    
    }else{
      console.log(result.response.data);
    }
  }
  const getDecryptingEnv=async()=>{
    const result=await getDecryptedEnvAPI()
    if(result.status==200){
      setDecryptKey(result.data)
    }else{
      console.log(result.response.data);
    }
  }
  const generatePdf=()=>{
    let pdf=new jspdf()
    let head=[['No.','Username','Email','Login Type']]
    let body=[]
    allUsers?.forEach((item,index)=>{
        body.push([index+1,item.username,item.email,item.password==""?'Google':'Normal'])
    })
    pdf.setFontSize(16)
    pdf.text("All Users List",10,10)
    autoTable(pdf,{head,body})
    pdf.output("dataurlnewwindow")
    pdf.save('alluserslist.pdf')
  }
  
  const deleteUser=async(uId)=>{
    console.log(uId);
    const result=await deleteUserAPI(uId)
    if(result.status==200){
      toast.success(result.data)
    }else{
      console.log(result.response.data)
    }
  }
  
 
  useEffect(()=>{
    getAllUsers()
    getDecryptingEnv()
    if(userSearch){
      setCurrentPage(1)
    }
  },[profileUpdateResponse,deleteUser,userSearch])
  return (
    <>

    <Box component="main" sx={{ flexGrow: 1,paddingLeft:10,paddingTop:10,paddingRight:1 }}>

        <h1 className='text-4xl font-bold'>Users List</h1>
        <div className='flex max-[715px]:block  max-[715px]:space-y-3 justify-between w-full  mt-5 items-center'>
          <div className='flex max-[715px]:inline items-center max-[715px]:space-y-3'>
          <div className='me-5'>
            <div className='border-2 shadow-md flex justify-between rounded-md w-96 w- max-[465px]:w-[277px] ps-2'>
              <input onChange={e=>setUserSearch(e.target.value)} type="text" className="outline-none w-80  text-lg" placeholder="Seacrh here...." />
              <Button  variant="text"><SearchIcon fontSize='large' className='text-black'/></Button>
            </div>
          </div>
          </div>
          <div className='space-x-5' >
          <Button onClick={generatePdf}  variant="contained" color="info" startIcon={<LocalPrintshopIcon/>}>Export</Button>
          <Link  to={'/signup'}><Button  variant="contained" color="success" startIcon={<AddIcon/>}>Add</Button></Link>
          </div>
        </div>
        <TableContainer component={Paper} className='mt-10'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='bg-black '>
          <TableRow >
          <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >#</TableCell>
          <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >UserID</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >User Photo</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Username</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Email</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Password</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Login Type</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Created At</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          
            {allUsers!==""?records
            .map((user,index)=>(
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{fontSize:'16px'}}>{index+1}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{user?._id}</TableCell>
              <TableCell component="th" scope="row"><Avatar alt="Remy Sharp" src={user?.profileImage?.startsWith('https:')?user?.profileImage:`${SERVER_URL}/uploads/${user?.profileImage}`} /></TableCell>
              <TableCell style={{fontSize:'16px'}}>{user?.username}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{user?.email}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{user?.password!==""?decrypt(user.password,decryptKey):'***************'}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{user?.password==""?<GoogleIcon/>:<SensorOccupiedIcon/>}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{user?.createdAt.split("T")[0]}</TableCell>
              <TableCell style={{display:'flex'}}>
                <AdEditUser user={user} decryptKey={decryptKey} />
                <Button onClick={()=>deleteUser(user?._id)}><DeleteIcon fontSize='large' color="error"/></Button>
              </TableCell>
            </TableRow>
            )):
            <h1 className='text-red-400 text-center'>No Users are found!!!</h1>
            }
            
        </TableBody>
      </Table>
    </TableContainer>
    <nav className='flex justify-center items-center mt-5 mb-5'>
      <ul className=" flex  justify-between items-center">
        <Button onClick={prePage} className='page-item'>
            Prev
        </Button>
        {
          numbers.map((n,i)=>(
            <li className='' key={i}>
              <div  style={{background:currentPage==n?'rgb(217, 214, 214)':''}} className='w-8 h-8 me-1 ms-1 border cursor-pointer rounded-full flex justify-center items-center text-black' onClick={()=>changeCPage(n)}>{n}</div>
            </li>
          ))
        }
        <Button onClick={nextPage} className='page-item'>
            Next
        </Button>
      </ul>
    </nav>
    <ToastContainer
          autoClose={2000}
          position="top-center"
          theme="colored"
        />
    </Box>
    </>
  )
}

export default AdUsers