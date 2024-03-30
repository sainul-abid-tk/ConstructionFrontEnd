import React, { useContext, useEffect, useState } from 'react'
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
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
import { deleteReviewAPI, getAllReviewsAPI } from '../Services/allAPI';
import { adminReportResponseContext } from '../ContextAPI/AvarageRes';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function AdReviews() {
  
  const [allReviews,setAllReviews]=useState([])
  const [idSearch,setIdSearch]=useState("")
  const [reviewSearch,setReviewSearch]=useState("")
  const [currentPage,setCurrentPage]=useState(1)
  const recordsPerPage=5
  const lastIndex=currentPage * recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage
  const records=allReviews?.slice(firstIndex,lastIndex)
  const nPage=Math.ceil(allReviews?.length/recordsPerPage)
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
  const getAllReviews=async()=>{
    const result=await getAllReviewsAPI()
    if(result.status==200){
      setAllReviews(result.data.filter((review)=>(
        reviewSearch==""?review:review._id.includes(reviewSearch)||review.userId.includes(reviewSearch)
      )))
    }else{
      console.log(result.response.data);
    }
  }
  


  const handleDeleteReview=async(rId)=>{
    const result=await deleteReviewAPI(rId)
    if(result.status==200){
      toast.success("Review Deleted Sucessfully")
    }else{
      console.log(result.response.data)
    }
  }
  useEffect(()=>{
    getAllReviews()
    if(reviewSearch){
      setCurrentPage(1)
    }
  },[idSearch,handleDeleteReview,reviewSearch])
  return (
    <>

     <Box component="main" sx={{ flexGrow: 1,paddingLeft:10,paddingTop:10,paddingRight:3 }}>

        <h1 className='text-4xl font-bold'>Reviews List</h1>
        <div className='flex justify-between w-full  mt-5 items-center'>
          <div className='flex items-center'>
          <div className='me-5'>
            <div className='border-2 shadow-md flex justify-between rounded-md  w-96 ps-2'>
              <input onChange={e=>setReviewSearch(e.target.value)} type="text" className="outline-none w-80 text-lg" placeholder="Seacrh here...." />
              <Button  variant="text"><SearchIcon fontSize='large' className='text-black'/></Button>
            </div>
          </div>
          </div>
        </div>
        <TableContainer component={Paper} className='mt-10'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='bg-black '>
          <TableRow >
          <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >#</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Review ID</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Username</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >UserID</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Rating</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Feedback</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Created At</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          
            
             {
              allReviews!=""?records
             .map((review,index)=>(
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{fontSize:'16px'}}>{index+1}</TableCell>
              <TableCell component="th" scope="row">{review?._id}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{review?.userName}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{review?.userId}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{review?.ratingPoints}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{review?.feedback==""?'--------':review?.feedback}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{review?.createdAt.split("T")[0]}</TableCell>
              <TableCell style={{display:'flex'}}>
                <Button onClick={()=>handleDeleteReview(review?._id)}><DeleteIcon fontSize='large' color="error"/></Button>
              </TableCell>
            </TableRow>
             )):
             <h1 className='text-red-400 text-center'>No Reviews found!!!</h1>
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
          numbers?.map((n,i)=>(
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

export default AdReviews