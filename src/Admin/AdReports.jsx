import React, { useContext, useEffect, useState } from 'react'
import { Box,Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import AdHeader from './AdHeader';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteReviewReportsAPI, getReportedReviewsAPI } from '../Services/allAPI';
import { adminReportResponseContext } from '../ContextAPI/AvarageRes';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function AdReports() {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [allReportedReviews,setAllReportedReviews]=useState("")
  const {adminReportResponse,setAdminReportResponse}=useContext(adminReportResponseContext)
  const getAllReportedReviews=async()=>{
    const result=await getReportedReviewsAPI()
    if(result.status==200){
      setAdminReportResponse(result.data.length)
      setAllReportedReviews(result.data)
    }else{
      console.log(result.response.data);
    }
  }
  
  const handleDeleteReviewReport=async(rrId)=>{
    const result=await deleteReviewReportsAPI(rrId)
    if(result.status==200){
      toast.success(result.data)
      getAllReportedReviews()
    }else{
      console.log(result.response.data);
    }
  }
  useEffect(()=>{
    getAllReportedReviews()
  },[])
  return (
    <>

     <Box component="main" sx={{ flexGrow: 1,paddingLeft:10,paddingTop:10,paddingRight:3 }}>

        <h1 className='text-4xl font-bold'>Reviews Reports List</h1>
        <div className='flex justify-between w-full  mt-5 items-center'>
          <div className='flex items-center'>
          <div className='me-5'>
            <div className='border-2 shadow-md flex justify-between rounded-md  w-96 ps-2'>
              <input onChange={e=>setIdSearch(e.target.value)} type="text" className="outline-none w-80 text-lg" placeholder="Seacrh By ID" />
              <Button  variant="text"><SearchIcon fontSize='large' className='text-black'/></Button>
            </div>
          </div>
          <Box sx={{ minWidth: 120 }}>
      <FormControl size='small' fullWidth className='bg-yellow-300 text-lg font-bold rounded-md'>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          className=''
          size='small'
          onChange={handleChange}
        >
          <MenuItem value="">
          <em>None</em>
        </MenuItem>
          <MenuItem value={10}>Latest</MenuItem>
          <MenuItem value={20}>Name</MenuItem>
        </Select>
      </FormControl>
    </Box>
          </div>
        </div>
        <TableContainer component={Paper} className='mt-10'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='bg-black '>
          <TableRow >
          <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >#</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Review ID</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Username</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Feedback</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Rating</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Reason</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Created At</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          
            
            
              {allReportedReviews!=""?allReportedReviews.map((report,index)=>(
                <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{fontSize:'16px'}}>{index+1}</TableCell>
                <TableCell component="th" scope="row">{report?.reviewId}</TableCell>
                <TableCell style={{fontSize:'16px'}}>{report?.userName}</TableCell>
                <TableCell style={{fontSize:'16px'}}>{report?.feedback}</TableCell>
                <TableCell style={{fontSize:'16px'}}>{report?.ratingPoints}</TableCell>
                <TableCell style={{fontSize:'16px'}}>{report?.reason}</TableCell>
                <TableCell style={{fontSize:'16px'}}>{report?.createdAt.split("T")[0]}</TableCell>
                
                <TableCell style={{display:'flex'}}>
                  <Button onClick={()=>handleDeleteReviewReport(report?._id)}><DeleteIcon fontSize='large' color="error"/></Button>
                </TableCell>
              </TableRow>
              )):
              <h1 className='text-red-400 text-center'>No Review Reports  found!!!</h1>
             }
        </TableBody>
      </Table>
    </TableContainer>
    <ToastContainer
          autoClose={2000}
          position="top-center"
          theme="colored"
        />
    </Box>
    </>
  )
}

export default AdReports