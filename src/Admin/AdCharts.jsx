import React, { PureComponent } from 'react'
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import AdHeader from './AdHeader';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,AreaChart, Area} from 'recharts'
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const users=[
  {month:'Jan',users:23},
  {month:'Feb',users:34},
  {month:'Mar',users:20},
  {month:'Apr',users:10},
  {month:'May',users:28},
  {month:'Jun',users:13},
  {month:'Jul',users:35},
  {month:'Aug',users:20},
  {month:'Sep',users:32},
  {month:'Oct',users:40},
  {month:'Nov',users:26},
  {month:'Dec',users:28},
]
const workers=[
  {month:'Jan',workers:5},
  {month:'Feb',workers:10},
  {month:'Mar',workers:20},
  {month:'Apr',workers:22},
  {month:'May',workers:15},
  {month:'Jun',workers:26},
  {month:'Jul',workers:35},
  {month:'Aug',workers:30},
  {month:'Sep',workers:24},
  {month:'Oct',workers:40},
  {month:'Nov',workers:26},
  {month:'Dec',workers:28},
]
function AdCharts() {
  return (
    <>
    <AdHeader/>
    <Box component="main" sx={{ flexGrow: 1,paddingLeft:3,paddingTop:3 }}>
      <DrawerHeader/>
        <div className='flex space-x-2'>
        <BarChart
          width={750}
          height={530}
          data={users}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={30}
        >
          <XAxis dataKey="month" scale="point" padding={{ left: 28, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar  dataKey="users" fill="#0088FE" background={{ fill: '#eee' }} />
        </BarChart>
          <div>
          <AreaChart
          width={750}
          height={500}
          data={workers}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="workers" stroke="#000000" fill="#00C49F" />
        </AreaChart>
        <div className='flex mt-2  items-center space-x-2 justify-center'>
        <div style={{background:'#00C49F'}} className='w-4 h-3'></div>
        <h1 className='text-center font-bold' style={{color:'#00C49F'}}>Workers</h1>
        </div>
          </div>
        </div>
    </Box>
    </>
    
  )
}

export default AdCharts