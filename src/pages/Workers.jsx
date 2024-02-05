import React, { useState } from 'react'
import Header from '../components/Header'
import SearchIcon from '@mui/icons-material/Search';
import { city } from '../assets/AllCities/Cities';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WorkerCard from '../components/WorkerCard';

function Workers() {
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  const [searchCity,setSearchCity]=useState("")
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  searchCity&&city.filter(item=>{
    if(item.name.toLowerCase().includes(searchCity)||item.state.toLowerCase().includes(searchCity)){
      return item
    }
  }).map(data=>{
    console.log(data.name,data.state)
  })
  return (
    <>
    <Header insideWorkers setSearchCity={setSearchCity}/>
    <div className="min-h-screen">
      {/* Search City */}
    <div className='flex justify-center mt-2'>
    <div className='hidden max-[820px]:flex justify-between items-center h-12 w-[350px] border border-black rounded-xl'>
          <input className='ms-2 outline-none w-72 text-lg' onChange={e=>setSearchCity(e.target.value)} placeholder="Search By State or City" type="text"  />
          <SearchIcon className='me-2 cursor-pointer' fontSize='large' color='black' />
        </div>
    </div>
    <div className='grid grid-cols-8  max-lg:grid-cols-4 mt-4 max-[686px]:grid-cols-3 max-sm:px-5 items-center justify-center max-sm:grid-cols-1'>
    <FormControl sx={{ minWidth: 200 }} className='ms-5 max-sm:w-full max-sm:ms-0 ' size="small">
      <InputLabel style={{fontWeight:'bold'}} id="demo-select-small-label">All</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
        MenuProps={MenuProps}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}

      </Select>
    </FormControl>
    <div className='flex items-center justify-center max-sm:hidden'>
    <p className='font-bold text-lg cursor-pointer'>Electrical</p>
    </div>
       
    <div className='flex items-center justify-center max-sm:hidden'>
    <p className='font-bold text-lg cursor-pointer border-b-4 border-yellow-400'>Plumbing</p>
    </div>
    <div className='flex items-center justify-center max-sm:hidden'>
    <p className='font-bold text-lg cursor-pointer'>Painting</p>
    </div>
    <div className='flex items-center justify-center max-sm:hidden'>
    <p className='font-bold text-lg cursor-pointer'>Welding</p>
    </div>
    <div className='flex items-center justify-center max-sm:hidden'>
    <p className='font-bold text-lg cursor-pointer'>Construction</p>
    </div>
    <div className='flex items-center justify-center max-sm:hidden'>
    <p className='font-bold text-lg cursor-pointer'>Centring</p>
    </div>
    <div className='flex items-center justify-center max-sm:hidden'>
    <p className='font-bold text-lg cursor-pointer'>Fabrication</p>
    </div>
    </div>
    <div className='grid grid-cols-4 mt-10 gap-4 px-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
    <div>
    <WorkerCard/>
    </div>
    </div>
    </div>
    </>

  )
}

export default Workers