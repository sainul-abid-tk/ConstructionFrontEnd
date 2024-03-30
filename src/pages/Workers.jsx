import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import { city } from "../assets/AllCities/Cities";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WorkerCard from "../components/WorkerCard";
import { getAllWorkersAPI } from "../Services/allAPI";
import { addAvarageResponseContext } from "../ContextAPI/AvarageRes";
import { Button, MenuItem } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import searchNotFound from '../assets/Images/resultNotFound.gif'
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Workers() {
  const { addAvarageResponse, setAddAvarageResponse } = useContext(
    addAvarageResponseContext
  );
  const [value, setValue] = useState(0);
  const [allworkers, setAllWorkers] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [searchCity, setSearchCity] = useState("");
  const [seacrh, setSeacrh] = useState(false);
  const [skeletonLoading,setSkeltonLoading]=useState(true)
  const [currentPage,setCurrentPage]=useState(1)
  const recordsPerPage=8
  const lastIndex=currentPage * recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage
  const records=allworkers?.slice(firstIndex,lastIndex)
  const nPage=Math.ceil(allworkers?.length/recordsPerPage)
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getAllWorkers = async () => {
    const result = await getAllWorkersAPI(searchCity);
    if (result.status == 200) {
      setTimeout(() => {
        setSkeltonLoading(false)
      }, 1000);
      console.log(result.data);
      setAllWorkers(result.data);
    } else {
      console.log(result.response.data);
    }
  };
  useEffect(() => {
   
    getAllWorkers();
    if(allworkers.length==0){
      setAllWorkers([1,2,3,4,5,6,7,8])
    }
  }, [addAvarageResponse,seacrh]);
  useEffect(()=>{
    if(seacrh){
      setCurrentPage(1)
    }
  },[seacrh,searchCity])
  console.log(allworkers);
  useEffect(() => {
    if (searchCity == "") {
      setSeacrh(!seacrh);
    }
  }, [searchCity]);

  useEffect(() => {
    searchCity &&
      setFilteredCity(
        city.filter((item) => {
          if (
            item.name.toLowerCase().includes(searchCity) ||
            item.state.toLowerCase().includes(searchCity)
          ) {
            return item;
          }
        })
      );
    if (searchCity == "") {
      setSeacrh(!seacrh);
    }
  }, [searchCity]);
  const handleKey = (e) => {
    if (selectedItem < filteredCity.length) {
      if (e.key == "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
      } else if (
        e.key == "ArrowDown" &&
        selectedItem < filteredCity.length - 1
      ) {
        setSelectedItem((prev) => prev + 1);
      } else if (e.key == "Enter" && selectedItem >= 0) {
        setSearchCity(
          `${filteredCity[selectedItem].name},${filteredCity[selectedItem].state}`
        );
        setSeacrh(!seacrh);
      }
    } else {
      setSelectedItem(-1);
    }
  };
  const selectActiveProductIntoView = (index) => {
    const activeProduct = document.getElementById(`product-${index}`);
    if (activeProduct) {
      activeProduct.scrollIntoView({
        block: "nearest",
        inline: "start",
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (selectedItem != -1) {
      selectActiveProductIntoView(selectedItem);
    }
  }, [selectedItem]);
  console.log(allworkers);
  return (
    <div className="relative">
      <Header
        insideWorkers
        searchCity={searchCity}
        setSearchCity={setSearchCity}
        setSeacrh={setSeacrh}
        seacrh={seacrh}
      />
      <div className="min-h-screen">
        {/* Search City */}
        <div className="flex-col   z-10 hidden max-[820px]:flex justify-center items-center w-full mt-2">
          <div className="flex  justify-between items-center h-12 w-[350px] border border-gray-400 rounded-xl shadow-md">
            <input
              className="ms-2 outline-none w-72 text-lg"
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyDown={(e) => handleKey(e)}
              value={searchCity}
              placeholder="Search by state or city"
              type="text"
            />
            <SearchIcon
              className="me-2 cursor-pointer"
              onClick={() => setSeacrh(!seacrh)}
              fontSize="large"
              color="black"
            />
          </div>
        </div>
        <div className="hidden max-[820px]:flex absolute z-10 justify-center items-center w-full ">
          <div className=" bg-white w-[360px] space-y-1 max-h-60 min-h-fit overflow-y-auto overflow-x-hidden">
            {searchCity &&
              filteredCity?.map((data, index) => (
                <MenuItem
                  key={index}
                  id={`product-${index}`}
                  className={
                    selectedItem === index
                      ? "searchSuggestionLine active"
                      : "searchSuggestionLine"
                  }
                  onClick={() => {
                    setSearchCity(`${data.name},${data.state}`);
                    setSeacrh(!seacrh);
                  }}
                >
                  {`${data.name},${data.state}`}
                </MenuItem>
              ))}
          </div>
        </div>

        <Box sx={{ width: "100%", padding: "10px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              aria-label="basic tabs example"
            >
              <Tab
                style={{ marginLeft: "18px", marginRight: "17px" }}
                label="All"
                {...a11yProps(0)}
              />
              <Tab
                style={{ marginLeft: "18px", marginRight: "17px" }}
                label="Electrical"
                {...a11yProps(1)}
              />
              <Tab
                style={{ marginLeft: "18px", marginRight: "17px" }}
                label="Plumbing"
                {...a11yProps(2)}
              />
              <Tab
                style={{ marginLeft: "18px", marginRight: "17px" }}
                label="Carpentry"
                {...a11yProps(3)}
              />
              <Tab
                style={{ marginLeft: "18px", marginRight: "17px" }}
                label="Welding"
                {...a11yProps(4)}
              />
              <Tab
                style={{ marginLeft: "18px", marginRight: "17px" }}
                label="TileWork"
                {...a11yProps(5)}
              />
              <Tab
                style={{ marginLeft: "18px", marginRight: "17px" }}
                label="Construction"
                {...a11yProps(6)}
              />
              <Tab
                style={{ marginLeft: "18px", marginRight: "17px" }}
                label="Painting"
                {...a11yProps(7)}
              />
              <Tab
                style={{ marginLeft: "18px", marginRight: "17px" }}
                label="Centring"
                {...a11yProps(8)}
              />
              <Tab
                style={{ marginLeft: "18px", marginRight: "17px" }}
                label="Fabrication"
                {...a11yProps(9)}
              />
            </Tabs>
          </Box>
          {skeletonLoading&&<div className="grid grid-cols-4 mt-10 gap-4 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {allworkers?.map((worker)=>(
                <Stack  spacing={2} >
                <Skeleton variant="rectangular" className="w-full" height={300} />
                <div className="flex justify-between">
                <Skeleton variant="rounded" width={160} height={15} />
                <Skeleton variant="rounded" width={160} height={15} />
                </div>
                <Skeleton variant="rounded" width={150} height={10} />
                <Skeleton variant="rounded" width={130} height={10} />
                <div className="flex space-x-3  items-center">
                <Skeleton variant="rounded" width={100} height={30} />
                <Skeleton variant="rounded" width={100} height={30} />
                <Skeleton variant="rounded" width={100} height={10} />
                </div>
                 </Stack>
              ))}
            </div>}
            
          {!skeletonLoading&&<>
          <CustomTabPanel value={value} index={0}>
            <div className="grid grid-cols-4 mt-10 gap-8 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {records?.map((worker,index)=>(
                <div key={index}>
                <WorkerCard worker={worker}/>
              </div>
              ))}
              {
              allworkers?.length==0&&!seacrh&&
              <div className="w-full flex justify-center items-center flex-col">
                <img src={searchNotFound} alt="" />
                <h6 className='text-lg font-bold'>Sorry! No Result Found</h6>
              </div>
            }
            </div>
            <nav className='flex justify-center items-center mt-10 mb-5'>
      <ul className=" flex  justify-between items-center">
        <Button onClick={prePage} className='page-item'>
            Prev
        </Button>
        {
          numbers.map((n,i)=>(
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
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          {allworkers?.some(item=>item?.categories?.includes("Electrical"))?
          <div className="grid grid-cols-4 mt-10 gap-8 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {allworkers?.filter(worker=>(
                worker.categories.includes("Electrical")
              )).map((worker)=>(
                <div>
                <WorkerCard worker={worker}/>
              </div>
              ))
             }
            </div>
            :
            <div className="w-full flex justify-center items-center flex-col">
              <img src={searchNotFound} alt="" />
              <h6 className='text-lg font-bold'>Sorry! No Result Found</h6>
            </div>
            }
            
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>

             {allworkers?.some(item=>item.categories?.includes("Plumbing"))?
          <div className="grid grid-cols-4 mt-10 gap-8 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {allworkers?.filter(worker=>(
                worker.categories?.includes("Plumbing")
              )).map((worker)=>(
                <div>
                <WorkerCard worker={worker}/>
              </div>
              ))
             }
            </div>:
            <div className="w-full flex justify-center items-center flex-col">
                <img src={searchNotFound} alt="" />
                <h6 className='text-lg font-bold'>Sorry! No Result Found</h6>
              </div>
            }
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
          {allworkers?.some(item=>item?.categories?.includes("Carpentry"))?
          <div className="grid grid-cols-4 mt-10 gap-8 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {allworkers?.filter(worker=>(
                worker.categories?.includes("Carpentry")
              )).map((worker)=>(
                <div>
                <WorkerCard worker={worker}/>
              </div>
              ))
             }
            </div>:
            <div className="w-full flex justify-center items-center flex-col">
                <img src={searchNotFound} alt="" />
                <h6 className='text-lg font-bold'>Sorry! No Result Found</h6>
              </div>
            }
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
          {allworkers?.some(item=>item.categories?.includes("Welding"))?
          <div className="grid grid-cols-4 mt-10 gap-8 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {allworkers?.filter(worker=>(
                worker.categories?.includes("Welding")
              )).map((worker)=>(
                <div>
                <WorkerCard worker={worker}/>
              </div>
              ))
             }
            </div>:
            <div className="w-full flex justify-center items-center flex-col">
                <img src={searchNotFound} alt="" />
                <h6 className='text-lg font-bold'>Sorry! No Result Found</h6>
              </div>
            }
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
          {allworkers?.some(item=>item.categories?.includes("TileWork"))?
          <div className="grid grid-cols-4 mt-10 gap-8 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {allworkers?.filter(worker=>(
                worker.categories?.includes("TileWork")
              )).map((worker)=>(
                <div>
                <WorkerCard worker={worker}/>
              </div>
              ))
             }
            </div>:
            <div className="w-full flex justify-center items-center flex-col">
                <img src={searchNotFound} alt="" />
                <h6 className='text-lg font-bold'>Sorry! No Result Found</h6>
              </div>
            }
          </CustomTabPanel>
          
          <CustomTabPanel value={value} index={6}>
          {allworkers?.some(item=>item.categories?.includes("Construction"))?
          <div className="grid grid-cols-4 mt-10 gap-8 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {allworkers?.filter(worker=>(
                worker.categories?.includes("Construction")
              )).map((worker)=>(
                <div>
                <WorkerCard worker={worker}/>
              </div>
              ))
             }
            </div>:
            <div className="w-full flex justify-center items-center flex-col">
                <img src={searchNotFound} alt="" />
                <h6 className='text-lg font-bold'>Sorry! No Result Found</h6>
              </div>
            }
          </CustomTabPanel>
          <CustomTabPanel value={value} index={7}>
          {allworkers?.some(item=>item.categories?.includes("Painting"))?
          <div className="grid grid-cols-4 mt-10 gap-8 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {allworkers?.filter(worker=>(
                worker.categories?.includes("Painting")
              )).map((worker)=>(
                <div>
                <WorkerCard worker={worker}/>
              </div>
              ))
             }
            </div>:
            <div className="w-full flex justify-center items-center flex-col">
                <img src={searchNotFound} alt="" />
                <h6 className='text-lg font-bold'>Sorry! No Result Found</h6>
              </div>
            }
          </CustomTabPanel>
          <CustomTabPanel value={value} index={8}>
          {allworkers?.some(item=>item.categories?.includes("Centring"))?
          <div className="grid grid-cols-4 mt-10 gap-8 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {allworkers?.filter(worker=>(
                worker.categories?.includes("Centring")
              )).map((worker)=>(
                <div>
                <WorkerCard worker={worker}/>
              </div>
              ))
             }
            </div>:
            <div className="w-full flex justify-center items-center flex-col">
                <img src={searchNotFound} alt="" />
                <h6 className='text-lg font-bold'>Sorry! No Result Found</h6>
              </div>
            }
          </CustomTabPanel>
          <CustomTabPanel value={value} index={9}>
          {allworkers?.some(item=>item.categories?.includes("Fabrication"))?
          <div className="grid grid-cols-4 mt-10 gap-8 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              {allworkers?.filter(worker=>(
                worker.categories?.includes("Fabrication")
              )).map((worker)=>(
                <div>
                <WorkerCard worker={worker}/>
              </div>
              ))
             }
            </div>:
            <div className="w-full flex justify-center items-center flex-col">
                <img src={searchNotFound} alt="" />
                <h6 className='text-lg font-bold'>Sorry! No Result Found</h6>
              </div>
            }
          </CustomTabPanel>
          </>}
        </Box>
       
      </div>
      <Footer />
    </div>
  );
}

export default Workers;
