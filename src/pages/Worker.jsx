import React, {  useContext, useEffect,useState } from "react";
import Header from "../components/Header";
import Photos from "../components/Photos";
import Review from "../components/Review";
import Address from "../components/Address";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WorkerDetailedCard from "../components/WorkerDetailedCard";
import Modal from '@mui/material/Modal';
import { TextField,Button, Stack, Skeleton } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { getAWorkerAPI } from "../Services/allAPI";
import { addAvarageResponseContext } from "../ContextAPI/AvarageRes";
import Footer from "../components/Footer";
function CustomTabPanel(props) {
  
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Worker() {
  const {addAvarageResponse,setAddAvarageResponse}=useContext(addAvarageResponseContext)
  const {wId}=useParams()
  const [workerDetails,setWorkerDetails]=useState()
    const getAWorker=async()=>{
      try{
        const result=await getAWorkerAPI(wId)
        if(result.status==200){
          setWorkerDetails(result.data[0])
        }else{
          console.log(result.response.data);
        }
      }catch(err){
        console.log(err);
      }
    }
    useEffect(()=>{
      getAWorker()
    },[wId,addAvarageResponse])
    const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
    <Header insideWorker/>
    <div className="min-h-screen px-8 py-5 max-[850px]:px-0 max-[850px]:py-2">
    {/* Worker Detailed Card */}
    {
      workerDetails==undefined&&
      <div>
      <Stack  spacing={5} >
        <div className="grid grid-cols-3 px-4 h-auto py-5">
        <div className="col-span-2 space-y-6  max-[554px]:ps-0">
        <Skeleton variant="rounded" width={160} height={15} />
        <Skeleton variant="rounded" width={190} height={15} />
        <Skeleton variant="rounded" width={210} height={15} />
          <Skeleton variant="rounded" width={160} height={10} />
          <Skeleton variant="rounded" width={180} height={10} />
          <Skeleton variant="rounded" width={170} height={10} />
          
          <div className='space-x-3  flex mt-5 items-center'>
          <Skeleton variant="rounded" width={100} height={30} />
        <Skeleton variant="rounded" width={100} height={30} />
          <Skeleton variant="rounded" width={100} height={10} />
      </div>
        </div>
        <div className="col flex items-center justify-end max-md:items-start">
        <Skeleton variant="rectangular" className="w-full" height={250} width={400} />
        </div>
      </div>
       </Stack>
       <Stack>
       <Skeleton variant="rounded" width={170} height={20} className="mt-5"  />
       <div className="space-x-3 flex justify-between mt-5">
        <Skeleton variant="rectangular" className="w-full" height={250} width={200}/>
        <Skeleton variant="rectangular" className="w-full" height={250} width={200}/>
        <Skeleton variant="rectangular" className="w-full" height={250} width={200}/>
        <Skeleton variant="rectangular" className="w-full" height={250} width={200}/>
        <Skeleton variant="rectangular" className="w-full" height={400} width={400}/>
       </div>
      
       </Stack>
       </div>
    }
    {workerDetails!=undefined&&<>
      <WorkerDetailedCard  workerDetails={workerDetails}/>
      <div className="grid grid-cols-8 mt-6 max-[850px]:hidden">
        <div className="col-span-6 p-2">
        <Photos workerDetails={workerDetails} />
        <Review workerDetails={workerDetails}/>
        </div>
        <div className="col-span-2 bg-slate-100 shadow-lg h-fit p-2">
        <Address workerDetails={workerDetails}/>
        </div>
      </div>
        {/* Max-w-850px */}
        <Box className='hidden max-[850px]:block' sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} variant="scrollable" aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Address" {...a11yProps(1)} />
          <Tab label="Photos" {...a11yProps(2)} />
          <Tab label="Reviews" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
      <Address workerDetails={workerDetails}/>
      <Photos  workerDetails={workerDetails}/>
      <Review workerDetails={workerDetails}/>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
      <Address workerDetails={workerDetails}/>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
      <Photos workerDetails={workerDetails}/>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={3}>
        <Review workerDetails={workerDetails}/>
      </CustomTabPanel>
    </Box>
    </>}
    </div>
    <Footer />
    </>
  );
}

export default Worker;
