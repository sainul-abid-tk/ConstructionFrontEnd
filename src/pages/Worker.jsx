import React, {  useState } from "react";
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
    const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <>
    <Header insideWorker/>
    <div className="min-h-screen px-8 py-5 max-[850px]:px-0 max-[850px]:py-2 max-[]:">
    {/* Worker Detailed Card */}
      <WorkerDetailedCard/>
      <div className="grid grid-cols-8 mt-6 max-[850px]:hidden">
        <div className="col-span-6 p-2">
        <Photos/>
        <Review/>
        </div>
        <div className="col-span-2 bg-slate-100 shadow-lg h-fit p-2">
        <Address/>
        </div>
      </div>
        {/* Max-w-850px */}
        <Box className='hidden max-[850px]:block' sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" aria-label="basic tabs example">
        <Tab label="All" {...a11yProps(0)} />
          <Tab label="Address" {...a11yProps(1)} />
          <Tab label="Photos" {...a11yProps(2)} />
          <Tab label="Reviews" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Address/>
      <Photos/>
      <Review/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Address/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <Photos/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Review/>
      </CustomTabPanel>
    </Box>
    </div>
    </>
  );
}

export default Worker;
