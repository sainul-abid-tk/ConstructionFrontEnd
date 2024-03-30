import React, { useContext, useEffect, useState } from 'react'
import AdHeader from './AdHeader';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { getAllCountsAPI, getReportedReviewsAPI } from '../Services/allAPI';
import { adminReportResponseContext } from '../ContextAPI/AvarageRes';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';




const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
function AdHome() {
  
  const [allCounts,setAllCounts]=useState()
  const data = [
    { name: 'Users', value: allCounts?.usersCount },
    { name: 'Workers', value: allCounts?.workersCount },
    { name: 'Reviews', value: allCounts?.reviewsCount},
  ];
  const userWorkers=[
    {month:'Jan',workers:5,users:10},
    {month:'Feb',workers:10,users:20},
    {month:'Mar',workers:20,users:28},
    {month:'Apr',workers:22,users:30},
    {month:'May',workers:15,users:18},
    {month:'Jun',workers:26,users:32},
    {month:'Jul',workers:35,users:42},
    {month:'Aug',workers:30,users:35},
    {month:'Sep',workers:24,users:46},
    {month:'Oct',workers:40,users:64},
    {month:'Nov',workers:26,users:38},
    {month:'Dec',workers:28,users:34},
  ]
  const getAllCounts=async()=>{
    const result=await getAllCountsAPI()
    if(result.status==200){
      setAllCounts(result.data)
    }else{
      console.log(result.response.data);
    }
  }
  console.log(allCounts);
  useEffect(()=>{
    getAllCounts()
  },[])
  return (
    <>
    <Box component="main" sx={{ flexGrow: 1,paddingLeft:13,paddingTop:10 }}>
      
        <div className='flex justify-between w-full px-5'>
          <div style={{background:'#0088FE'}} className="w-72  h-48 rounded-lg shadow-md">
            <div className='flex w-full justify-between h-36 items-center px-4'>
                <h4 className='text-2xl  text-white'><span className='font-bold'>{allCounts?.usersCount}</span> <br />Users</h4>
                <PersonIcon style={{fontSize:'50px'}}  className='text-white'/>
            </div>
            <Link to={'/adusers'}>
            <div className='show-items h-12 flex items-center justify-center rounded-b-lg'>
                <h6 className='text-center text-lg text-white'>Show Users</h6>
            </div>
            </Link>
          </div>

          <div style={{background:'#00C49F'}} className="w-72 h-48 rounded-lg shadow-md">
            <div className='flex w-full justify-between h-36 items-center px-4'>
                <h4 className='text-2xl  text-white'><span className='font-bold'>{allCounts?.workersCount}</span> <br />Workers</h4>
                <EngineeringIcon style={{fontSize:'50px'}}  className='text-white'/>
            </div>
            <Link to={'/adworkers'}>
            <div className='show-items h-12 flex items-center justify-center rounded-b-lg'>
                <h6 className='text-center text-lg text-white'>Show Workers</h6>
            </div>
            </Link>
          </div>

          <div style={{background:'#FFBB28'}} className="w-72  h-48 rounded-lg shadow-md">
            <div className='flex w-full justify-between h-36 items-center px-4'>
                <h4 className='text-2xl  text-white'><span className='font-bold'>{allCounts?.reviewsCount}</span> <br />Reviews</h4>
                <ReviewsIcon style={{fontSize:'50px'}}  className='text-white'/>
            </div>
            <Link to={'/adReviews'}>
            <div className='show-items h-12 flex items-center justify-center rounded-b-lg'>
                <h6 className='text-center text-lg text-white'>Show Reviews</h6>
            </div>
            </Link>
          </div>

          <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        </div>
        <div className='-mt-16 -ms-12'>
        <BarChart
          width={1100}
          height={450}
          data={userWorkers}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={35}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#0088FE" background={{ fill: '#eee' }} />
          <Bar dataKey="workers" fill="#00C49F" />
        </BarChart>
        </div>
    </Box>
    </>
  )
}

export default AdHome