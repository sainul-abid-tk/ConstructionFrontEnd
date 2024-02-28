import React, { useContext, useEffect, useState } from 'react';
import AdHeader from './AdHeader';
import { Box, Button, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BlockIcon from '@mui/icons-material/Block';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { getAdminAllworkersAPI, updateStatusAPI } from '../Services/allAPI';
import { SERVER_URL } from '../Services/serverURL';
import ApprovelPhotoView from './ApprovelPhotoView';
import { newWorkerNotificationContext } from '../ContextAPI/NewWorkerNotify';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function WorkerApprov() {
  const {newWorkerNotification,setNewWorkerNotification}=useContext(newWorkerNotificationContext)
  const [allworkers, setAllWorkers] = useState([]);
  const [sortValue,setSortValue]=useState("pending")
  const getAllWorkers = async () => {
    const result = await getAdminAllworkersAPI();
    if (result.status === 200) {
      setAllWorkers(result.data);
    } else {
      console.log(result.response.data);
    }
  };

  
  const handleChange = async(event, index,id) => {
    const { value } = event.target;
    console.log(value);
    const updatedWorkers = [...allworkers];
    updatedWorkers[index].status = value;
    const result=await updateStatusAPI(id,{status:`${value}`})
    if(result.status==200){
      console.log(result.data);
      setNewWorkerNotification(result.data)
    }else{
      console.log(result.response.data);
    }
  };
  useEffect(() => {
    getAllWorkers();
  }, [handleChange]);
  const handleSortChange=(value)=>{
    setSortValue(value)
  }
  
  return (
    <>
      <AdHeader />
      <Box component="main" sx={{ flexGrow: 1, paddingLeft: 10, paddingTop: 3, paddingRight: 3 }}>
        <DrawerHeader />
        <div className='flex justify-between'>
        <h1 className="text-4xl font-bold">Admin Approvel</h1>
        <Box sx={{ minWidth: 120 }}>
      <FormControl size='small' className='bg-yellow-300 text-lg font-bold rounded-md w-32'>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Age"
          className=''
          size='small'
          onChange={e=>handleSortChange(e.target.value)}
        >
          <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"pending"}><PauseCircleOutlineIcon color="info" />&nbsp;Pending</MenuItem>
        <MenuItem value={"approved"}><CheckCircleOutlineIcon color="success" />&nbsp;Approved</MenuItem>
        <MenuItem value={"block"}><BlockIcon fontSize='small' color='error' />&nbsp;Block</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </div>
       
        <TableContainer component={Paper} className='mt-10'>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className='bg-black '>
              <TableRow >
                <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }} >#</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }} >Register Image</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }} >Name</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }} >Phone</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }} >Categories</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }} >UserId</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }} >WorkImages</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }} >Created At</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }} >Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {allworkers?.length > 0?allworkers?.filter((worker)=>(
                sortValue==""?worker:worker.status==sortValue
              ))
              .map((worker, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell style={{ fontSize: '16px' }}>{index + 1}</TableCell>
                  <TableCell component="th" scope="row"><img className='border-2' width={60} height={60} src={`${SERVER_URL}/uploads/${worker.registerImage}`} alt="" /></TableCell>
                  <TableCell style={{ fontSize: '16px' }}>{worker.name}</TableCell>
                  <TableCell style={{ fontSize: '16px' }}>{worker.phoneNumber}</TableCell>
                  <TableCell style={{ fontSize: '16px' }}>{worker.categories}</TableCell>
                  <TableCell style={{ fontSize: '16px' }}>{worker.userId}</TableCell>
                  <TableCell style={{ fontSize: '16px' }}>
                    <ApprovelPhotoView worker={worker} />
                  </TableCell>
                  <TableCell style={{ fontSize: '16px' }}>{worker.createdAt.split("T")[0]}</TableCell>
                  <TableCell style={{ fontSize: '16px' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} className=' font-bold rounded-md ' size='small'>
                      <Select
                        value={worker.status}
                        onChange={(event) => handleChange(event, index,worker?._id)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value={"pending"}><PauseCircleOutlineIcon color="info" />&nbsp;Pending</MenuItem>
                        <MenuItem value={"approved"}><CheckCircleOutlineIcon color="success" />&nbsp;Approved</MenuItem>
                        <MenuItem value={"block"}><BlockIcon fontSize='small' color='error' />&nbsp;Block</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              )) :
                <TableRow>
                  <TableCell colSpan={9} className='text-red-400 text-center'>No Request Approvel found!!!</TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default WorkerApprov;
