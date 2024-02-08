import React, {  useEffect,useState } from "react";
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
import { TextField,Button } from "@mui/material";
import Rating from "@mui/material/Rating";
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
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const [value, setValue] = useState("");
    const [reviewStarName,setReviewStarName]=useState("")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = (e) => {
      setValue("")
      setOpen(false)
    } 
    const handleAdd=()=>{
      console.log("hloo");
      setOpen(false)
    }
    const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  function getLabelText(value) {
    return labels[value];
  }

  useEffect(()=>{
    setReviewStarName(getLabelText(value))
  },[value])
  console.log(value);
  return (
    <>
    <Header insideWorker/>
    <div className="min-h-screen px-8 py-5 max-[850px]:px-0 max-[850px]:py-2 max-[]:">
    {/* Worker Detailed Card */}
      <WorkerDetailedCard handleOpen={handleOpen} />
      <div className="grid grid-cols-8 mt-6 max-[850px]:hidden">
        <div className="col-span-6 p-2">
        <Photos />
        <Review handleOpen={handleOpen} value={value} setValue={setValue}/>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='rounded-xl' sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <Rating
        name="hover-feedback"
        value={value}
        onClick={handleOpen}
        size="large"
        style={{fontSize:'40px'}}
        className="mt-4"
        getLabelText={getLabelText}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <h4 className="text-xl font-bold text-yellow-300">{reviewStarName}</h4>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2,mb:4 }}>
          <TextField
          id="standard-multiline-static"
          label="Add Your Comment"
          className='w-full'
          multiline
          rows={5}
          variant="standard"
        />
          </Typography>
          <div className="flex justify-end space-x-4">
          <Button onClick={handleClose} color="error" variant="contained">Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Add</Button>
          </div>
        </Box>
      </Modal>
        </div>
        <div className="col-span-2 bg-slate-100 shadow-lg h-fit p-2">
        <Address/>
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
      <Address/>
      <Photos/>
      <Review handleOpen={handleOpen} value={value} setValue={setValue}/>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
      <Address/>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
      <Photos/>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={3}>
        <Review/>
      </CustomTabPanel>
    </Box>
    </div>
    </>
  );
}

export default Worker;
