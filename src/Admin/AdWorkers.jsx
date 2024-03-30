import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
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
import EditIcon from '@mui/icons-material/Edit';
import AdHeader from './AdHeader';
import { Link } from 'react-router-dom';
import {  deleteWorkerAPI, getAllWorkersAPI } from '../Services/allAPI';
import { SERVER_URL } from '../Services/serverURL';
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
function AdWorkers() {
  const [workerSearch,setWorkerSearch]=useState("")
  const [allWorkers,setAllWorkers]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  
  const getAllWorkers=async()=>{
    const result=await getAllWorkersAPI("")
    if(result.status==200){
      setAllWorkers(result.data.filter((worker)=>(
        workerSearch==""?worker:worker._id.toLowerCase().includes(workerSearch.toLowerCase()) || worker.name.toLowerCase().includes(workerSearch.toLowerCase()) || worker.phoneNumber.toString().includes(workerSearch)||worker.userId.toLowerCase().includes(workerSearch.toLowerCase())||worker.place.toLowerCase().includes(workerSearch.toLowerCase())||worker.city.toLowerCase().includes(workerSearch.toLowerCase())||worker.state.toLowerCase().includes(workerSearch.toLowerCase())
      ))  )
    }else{
      console.log(result.response.data);
    }
  }
  const recordsPerPage=5
  const lastIndex=currentPage * recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage
  const records=allWorkers?.slice(firstIndex,lastIndex)
  const nPage=Math.ceil(allWorkers?.length/recordsPerPage)
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
  const deleteWorker=async(wId)=>{
    const result= await deleteWorkerAPI(wId)
    if(result.status==200){
      toast.success(result.data)
    }else{
      console.log(result.response.data);
    }
  }
  
  const generatePdf=()=>{
    let pdf=new jspdf()
    let head=[['No.','Worker','PhoneNo.','Categories','Location']]
    let body=[]
    allWorkers?.forEach((item,index)=>{
        body.push([index+1,item.name,item.phoneNumber,item.categories,[item.place,item.city,item.state]])
    })
    pdf.setFontSize(10)
    pdf.text("All Workers List",10,10)
    autoTable(pdf,{head,body})
    pdf.output("dataurlnewwindow")
    pdf.save('allWorkersList.pdf')
  }
  useEffect(()=>{
    getAllWorkers()
    if(workerSearch){
      setCurrentPage(1)
    }
  },[deleteWorker,workerSearch])
  return (
    <>

    <Box component="main" sx={{ flexGrow: 1,paddingLeft:10,paddingTop:10,paddingRight:3 }}>

        <h1 className='text-4xl font-bold'>Workers List</h1>
        <div className='flex justify-between w-full  mt-5 items-center'>
          <div className='flex items-center'>
          <div className='me-5'>
            <div className='border-2 shadow-md flex justify-between rounded-md  w-96 ps-2'>
              <input  onChange={e=>setWorkerSearch(e.target.value)} type="text" className="outline-none w-80 text-lg" placeholder="Seacrh here...." />
              <Button variant="text"><SearchIcon fontSize='large' className='text-black'/></Button>
            </div>
          </div>
          </div>
          <div className='space-x-5'>
          <Button onClick={generatePdf}  variant="contained" color="info" startIcon={<LocalPrintshopIcon/>}>Export</Button>
          <Link to={'/register'}><Button variant="contained" color="success" startIcon={<AddIcon/>}>Add</Button></Link>
          </div>
          </div>
        <TableContainer component={Paper} className='mt-10'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='bg-black '>
          <TableRow >
          <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >#</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Register Image</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Name</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Phone</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Categories</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >UserID</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Created At</TableCell>
            <TableCell style={{color:'white',fontWeight:'bold',fontSize:'18px'}} >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          
            {
            allWorkers!=""?records
            ?.map((worker,index)=>(
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{fontSize:'16px'}}>{index+1}</TableCell>
              <TableCell component="th" scope="row"><img className='border-2' width={60} height={60} src={`${SERVER_URL}/uploads/${worker?.registerImage}`}  alt="" /></TableCell>
              <TableCell style={{fontSize:'16px'}}>{worker?.name}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{worker?.phoneNumber}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{worker?.categories}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{worker?.userId}</TableCell>
              <TableCell style={{fontSize:'16px'}}>{worker?.createdAt.split("T")[0]}</TableCell>
              <TableCell style={{display:'flex'}}>
                <Link to={`/userEditReg/${worker?._id}`}><Button><EditIcon fontSize='large' /></Button></Link>
                <Button onClick={()=>deleteWorker(worker?._id)}><DeleteIcon fontSize='large' color="error"/></Button>
              </TableCell>
            </TableRow>
            )):
            <h1 className='text-red-400 text-center'>No Workers are found!!!</h1>
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

export default AdWorkers