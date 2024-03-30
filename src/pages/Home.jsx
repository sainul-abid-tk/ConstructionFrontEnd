import React from 'react'
import construction from '../assets/Images/Construction.jpg'
import worker from '../assets/Images/worker.jpg'
import electric from '../assets/Images/Electric.jpg'
import { Button } from '@mui/material'
import ForwardIcon from '@mui/icons-material/Forward';
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import ConstructionWork from '../assets/Images/ConstructionWork.jpg'
import maintanance from '../assets/Images/maintanance.jpg'
import Footer from '../components/Footer'
function Home() {
  return (
    <>
    <Header />
      {/* Landing Page */}
      <div  className="grid grid-cols-2 h-screen  bg-cover overflow-hidden max-[575px]:grid-cols-1   p-3 max-[575px]:h-auto">
      <div className='flex flex-col justify-center items-centers max-[575px]:p-5'>
          <h1 className='text-6xl font-extrabold max-[800px]:text-5xl'>Crafting Your Building Solution <span className='text-yellow-300'>One Click Away</span> </h1>
          <h2 className=' text-2xl mt-6 '>
          where your project needs, meet skilled hands and reliable workers 
          </h2>
          <div className='flex justify-start items-start mt-5 w-full '>
          <Link to={'/workers'}>
          <Button style={{fontSize:'16px',background:'rgb(250 204 21 / var(--tw-bg-opacity))',color:'black',fontWeight:'bold'}} className='bg-yellow-300' variant="contained" endIcon={<ForwardIcon className="hover:scale-x-125" style={{fontSize:'30px'}} />}>Discover Available Talent</Button>
          </Link>
          </div>
        </div>

        <div className='grid grid-cols-2 space-x-3  max-lg:space-x-0 max-lg:grid-cols-1'>
          <div className='grid grid-rows-2 space-y-3  max-lg:hidden'>
          <div style={{backgroundImage:`url(${construction})`}} className='bg-cover   rounded-ss-2xl'></div>
          <div style={{backgroundImage:`url(${electric})`}} className='bg-cover rounded-es-2xl'></div>
          </div>
          <div style={{backgroundImage:`url(${worker})`}} className='bg-cover max-[575px]:h-[500px] rounded-e-2xl  max-lg:rounded-none'></div>
        </div>
      </div>

      {/* About */}

      <div className='bg-yellow-300 py-10 mt-10'>
        <h2 className='text-center text-4xl font-bold'>About</h2>
        <h6 className='text-xl  mt-5 text-justify px-3'>Welcome to our platform, where finding skilled workers or reputable construction companies for your projects is made simple and convenient. Whether you need an electrician, plumber, painter, carpenter, welder, or a construction company for comprehensive building works, our platform connects you with the professionals you need.

        Upon signing up and logging in, users can easily navigate to the specific service they require. With a user-friendly interface, users can browse through a wide range of workers and construction companies, filtered by their current city for localized results.

        Communication with workers and companies is made seamless with our integrated call and chat. Users can easily connect with their chosen worker or company with just a click of a button, facilitating clear and direct communication.

        For those seeking employment opportunities, our platform offers a hassle-free registration process. Employees can sign up, create a profile highlighting their skills and experience, and connect with potential employers in need of their services.

        Experience the convenience and efficiency of our platform today. Let us help you find the skilled professionals and construction companies to bring your projects to life.</h6>
      </div>

      {/* Services */}
      <div className="grid grid-cols-2 mx-36  mt-24 max-lg:mx-5 max-md:grid-cols-1 overflow-hidden" id="services">
  <div className="grid me-5 max-md:me-0">
    <div className="w-full">
      <img src={maintanance} className=" w-full" alt=""/>
    </div>
    <div className="h-[550px] max-sm:h-[450px] flex flex-col justify-center px-5 mt-5 max-md:mt-0 "> 
      <h1 className="text-4xl font-bold  max-sm:text-2xl">Maintenance Services</h1>
      <p className="mt-12 text-xl max-sm:text-sm ">Building maintenance services involve the comprehensive upkeep and management of a structure to ensure its safety, functionality, and aesthetics. These services encompass routine inspections, repairs, and cleaning to address wear and tear, prevent deterioration, and extend the lifespan of building components. Maintenance tasks may include HVAC system checks, plumbing repairs, electrical inspections, and structural integrity assessments. Building maintenance services also cover exterior upkeep, including landscaping, painting.
       </p>
    </div>
  </div>
  <div className="grid">
    <div className="h-[550px] max-sm:h-[400px] flex flex-col justify-center px-5 bg-black text-white"> 
      <h1 className="text-4xl font-bold max-sm:text-2xl">Construction Services</h1>
      <p className="mt-12 text-xl max-sm:text-sm">Construction services encompass the planning, design, and building of structures for various purposes such as residential, commercial, and infrastructure projects. They involve stages like architectural and engineering design, site preparation, and foundation laying. Construction progresses with the erection of structural elements and installation of essential systems like electrical, plumbing, and HVAC. Interior and exterior finishing work completes the construction process, ensuring quality and safety standards are met.
       </p>
    </div>
    <div className="w-full mt-5 max-md:mt-0">
    <img src={ConstructionWork} class=" w-full" alt=""/>
    </div>
  </div>
</div>
<Footer />
    </>
  )
}

export default Home