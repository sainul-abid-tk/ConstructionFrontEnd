import React,{useContext, useEffect, useState} from 'react'
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Header from "../components/Header";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { UserWorkDetailsContext } from '../ContextAPI/UserWorkDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { city } from "../assets/AllCities/Cities";
import { SERVER_URL } from '../Services/serverURL';
import { toast } from 'react-toastify';
import { getAWorkerAPI, updateWorkerAPI } from '../Services/allAPI';
import Footer from '../components/Footer';
function UserEditableRegister() {
  const navigate=useNavigate()
  const {wId}=useParams()
  const [open, setOpen] = useState(false);
  const [registerData, setRegisterData] = useState({
    registerImage: "",
    name: "",
    phoneNumber: "",
    whatsappNumber:"",
    categories: [],
    experience: "",
    workingDays: "",
    availableTime:"",
    address:"",
    paymentMode: "",
    state: "",
    city: "",
    place: "",
    workImages: []
  });
  
  const [regImagePreview, setRegImagePreview] = useState("");
  const [registerExistingImage,setRegisterExistingImage]=useState("")
  const [preview, setPreview] = useState([]);
  const [workExistingImage,setWorkExistingImage]=useState('')
  const [workerNeedToUploadImageResponse,setWorkerNeedToUploadImageResponse]=useState(true)
  const [IndianStates, setIndianStates] = useState([]);
  const [categoriesNull,setCategoriesNull]=useState(false)
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
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
    "Welding",
    "TileWork",
    "Centring",
    "Construction",
    "Fabrication",
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRegisterData({
      ...registerData,
      categories: typeof value === "string" ? value.split(",") : value,
    });
  };
  const UpdateWorkerData=async()=>{
    // const editableData= userWorkDetails?.filter(item=>item._id==wId)[0]
    const result=await getAWorkerAPI(wId)
    const editableData=result.data[0]
   setRegisterData({...registerData,name:editableData?.name,phoneNumber:editableData?.phoneNumber,whatsappNumber:editableData?.whatsappNumber,categories:editableData?.categories,experience:editableData?.experience,workingDays:editableData?.workingDays,availableTime:editableData?.availableTime,address:editableData?.address,paymentMode:editableData?.paymentMode,state:editableData?.state,city:editableData?.city,place:editableData?.place})
   setRegisterExistingImage(editableData?.registerImage)
   setWorkExistingImage(editableData?.workImages)
  }
  useEffect(()=>{
   UpdateWorkerData()
   const states = Array.from(new Set(city.map((city) => city.state)));
   setIndianStates(states);
  },[])
  useEffect(()=>{
    registerData.workImages.length > 0 &&
      registerData.workImages?.map((images) => {
        setPreview([...preview, URL.createObjectURL(images)]);
      });
    if (registerData.registerImage) {
      setRegImagePreview(URL.createObjectURL(registerData.registerImage));
    }
  },[registerData.registerImage,registerData.workImages])
  console.log(registerData);
  const handleSubmit=async()=>{
    const {
      registerImage,
      name,
      phoneNumber,
      whatsappNumber,
      categories,
      experience,
      workingDays,
      availableTime,
      address,
      paymentMode,
      state,
      city,
      place,
      workImages,
    } = registerData;
    if (
      !name ||
      !phoneNumber ||
      !whatsappNumber||
      !categories ||
      !experience ||
      !workingDays ||
      !availableTime ||
      !address ||
      !paymentMode ||
      !state ||
      !city ||
      !place 
    ) {
      toast.warning("Please fill the form completely!!!");
    }else{
        //  reqBody setUp
      const reqBody = new FormData();
      reqBody.append("registerImage",regImagePreview?registerImage:registerExistingImage);
      reqBody.append("name", name);
      reqBody.append("phoneNumber", phoneNumber);
      reqBody.append("whatsappNumber", whatsappNumber);
      reqBody.append("categories", categories);
      reqBody.append("experience", experience);
      reqBody.append("workingDays", workingDays);
      reqBody.append("availableTime", availableTime);
      reqBody.append("address", address);
      reqBody.append("paymentMode", paymentMode);
      reqBody.append("state", state);
      reqBody.append("city", city);
      reqBody.append("place", place);
      reqBody.append("status",status)
      if(preview.length>0){
        for (let i = 0; i < workImages.length; i++) {
          reqBody.append("workImages", workImages[i]);
        }
      }else{
        reqBody.append("workImages",JSON.stringify(workExistingImage));
      }
      // reqHeader setUp
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": preview.length>0||regImagePreview?"multipart/form-data":"application/json",
         " Authorization": `Bearer ${token}`,
        };
        // api call
        try {
          if(preview&&preview.length>=3){
            try{
              const result =await updateWorkerAPI(wId,reqBody,reqHeader)
              if(result.status==200){
                setOpen(true);
            setTimeout(() => {
              if(JSON.parse(sessionStorage.getItem("user")).email=="admin123@gmail.com"){
                toast.success("Worker Deatails Updated Successfully!!");
              }else{
                toast.success("Your Deatails Updated Successfully!!");
              }
              
            }, 2000);
            setTimeout(() => {
              setOpen(false)
              if(JSON.parse(sessionStorage.getItem("user")).email=="admin123@gmail.com"){
                navigate('/adWorkers')
              }else{
                navigate('/')
              }
            }, 6000);
              }else{
                console.log(result.response.data);
              }
            }catch(err){
              console.log(err);
            }
           }else if(preview.length==0&&workerNeedToUploadImageResponse){
            try{
              const result =await updateWorkerAPI(wId,reqBody,reqHeader)
              if(result.status==200){
                setOpen(true);
                setTimeout(() => {
                  if(JSON.parse(sessionStorage.getItem("user")).email=="admin123@gmail.com"){
                    toast.success("Worker Deatails Updated Successfully!!");
                  }else{
                    toast.success("Your Deatails Updated Successfully!!");
                  }
                }, 2000);
                setTimeout(() => {
                  setOpen(false)
                  if(JSON.parse(sessionStorage.getItem("user")).email=="admin123@gmail.com"){
                    navigate('/adWorkers')
                  }else{
                    navigate('/')
                  }
                }, 6000);
              }else{
                console.log(result.response.data);
              }
            }catch(err){
              console.log(err);
            }
           }else{
            toast.warning("Upload atleast Three Images")
           }
        } catch (err) {
          console.log(err);
        }
      }
      
    }
  }
  return (
    <>
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress size={60} color="success"  />
      </Backdrop>
    <Header insideRegister />
      <div className="min-h-screen   py-5 ">
        <h1 className="text-center text-5xl font-extrabold">Edit Your Work Profile</h1>
        <div className="flex justify-center items-center mt-10">
        <label className="text-center">
            <input
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  registerImage: e.target.files[0],
                })
              }
              className="hidden "
              type="file"
              name="registerImage"
              id=""
            />
            <img
              width={250}
              src={regImagePreview ? regImagePreview : `${SERVER_URL}/uploads/${registerExistingImage}`}
              alt=""
              className="cursor-pointer"
            />
          </label>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-2  gap-12  mt-10 max-md:grid-cols-1">
            <TextField
              color="secondary"
              className="w-[350px] text-black"
              id="outlined-basic"
              value={registerData.name}
              onChange={e=>setRegisterData({...registerData,name:e.target.value})}
              label="Company/Your Name"
              variant="outlined"
            />
            <TextField
              label="Phone Number"
              id="outlined-start-adornment"
              className="w-[350px]"
              color="secondary"
              value={registerData.phoneNumber}
              onChange={e=>setRegisterData({...registerData,phoneNumber:e.target.value})}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
            <TextField
              color="secondary"
              className="w-[350px] text-black"
              id="outlined-basic"
              value={registerData.whatsappNumber}
              onChange={e=>setRegisterData({...registerData,whatsappNumber:e.target.value})}
              label="Whatsapp Number"
              variant="outlined"
            />
            <FormControl color="secondary" className="w-[350px] text-black">
              <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple={categoriesNull?false:true}
                value={categoriesNull?"":registerData?.categories}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    onClick={()=>setCategoriesNull(false)}
                    style={getStyles(name, registerData?.categories, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <p onClick={()=>setCategoriesNull(true)} className='font-bold text-red-600 text-end cursor-pointer'>Clear</p>
            </FormControl>

            <TextField
              label="Experience"
              id="outlined-start-adornment"
              className="w-[350px]"
              value={registerData.experience}
              onChange={e=>setRegisterData({...registerData,experience:e.target.value})}
              color="secondary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Year</InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Address/NearBy"
              multiline
              rows={4}
              value={registerData.address}
              onChange={e=>setRegisterData({...registerData,address:e.target.value})}
            />

            <FormControl>
              <FormLabel
                className="text-xl  font-bold"
                id="demo-radio-buttons-group-label"
              >
                Available Time
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={registerData.availableTime}
              onChange={e=>setRegisterData({...registerData,availableTime:e.target.value})}
              >
                <FormControlLabel
                  value="24 Hours"
                  control={<Radio />}
                  label="24 Hours"
                />
                <FormControlLabel
                  value="8AM to 6PM"
                  control={<Radio />}
                  label="8AM to 6PM"
                />
                <FormControlLabel
                  value="9AM to 8PM"
                  control={<Radio />}
                  label="9AM to 8PM"
                />
                <FormControlLabel
                  value="10AM to 10PM"
                  control={<Radio />}
                  label="10AM to 10PM"
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel
                className="text-xl  font-bold"
                id="demo-radio-buttons-group-label"
              >
                Working Days
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={registerData.workingDays}
                onChange={e=>setRegisterData({...registerData,workingDays:e.target.value})}
              >
                <FormControlLabel
                  value="All Days"
                  control={<Radio />}
                  label="All Days"
                />
                <FormControlLabel
                  value="Mon to Sat"
                  control={<Radio />}
                  label="Mon to Sat"
                />
                <FormControlLabel
                  value="Mon to Fri"
                  control={<Radio />}
                  label="Mon to Fri"
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel
                className="text-xl  font-bold"
                id="demo-radio-buttons-group-label"
              >
               Payment Mode
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={registerData.paymentMode}
                onChange={e=>setRegisterData({...registerData,paymentMode:e.target.value})}
              >
                <FormControlLabel
                  value="Cash"
                  control={<Radio />}
                  label="Cash"
                />
                <FormControlLabel
                  value="Cash/Online Payments"
                  control={<Radio />}
                  label="Cash/Online Payments"
                />
              </RadioGroup>
            </FormControl>
            
            <div className="max-md:hidden"></div>
            <h5 className="text-xl font-bold">Location Details</h5> 
            <div className="max-md:hidden"></div>
            <FormControl color="secondary" className="w-[350px] ">
              <InputLabel id="demo-select-small-label">State</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={registerData?.state}
                label="Age"
                onChange={(e) =>
                  setRegisterData({ ...registerData, state: e.target.value })
                }
                MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {IndianStates.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl color="secondary" className="w-[350px] ">
              <InputLabel id="demo-select-small-label">City</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Age"
                value={registerData?.city}
                MenuProps={MenuProps}
                onChange={(e) =>
                  setRegisterData({ ...registerData, city: e.target.value })
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {city?.filter((item) => item.state === registerData?.state)
                  .map((name) => (
                    <MenuItem key={name.name} value={name.name}>
                      {name.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              color="secondary"
              className="w-[350px] text-black"
              id="outlined-basic"
              label="Place"
              variant="outlined"
              value={registerData.place}
              onChange={e=>setRegisterData({...registerData,place:e.target.value})}
            />
          </div>
          <div  className='flex flex-col justify-center items-center'>
          <h3 className="text-start text-xl font-bold mt-5">
            Update Your Works
          </h3>
          <p className="text-red-500 ">*Upload atleast three Photos*</p>
          <div className='space-x-2'>
          {!workerNeedToUploadImageResponse&&<Button variant='contained' onClick={()=>{setWorkerNeedToUploadImageResponse(true)
          setPreview("")
          }}  size="small" color='primary'>
            No Changes Needed
          </Button>}
          <Button
            color="error"
            size="small"
            variant="contained"
            className="text-start"
            onClick={() => {
              setWorkerNeedToUploadImageResponse(false)
              setPreview("");
              setRegisterData({ ...registerData, workImages: "" });
            }}
          >
            Clear
          </Button>
          </div>
          
          {workerNeedToUploadImageResponse?<label onClick={()=>setWorkerNeedToUploadImageResponse(false)} className="text-center">
            <input
              multiple
              className="hidden"
              type="file"
              name="workImages"
              id=""
            />
            <div className="grid grid-cols-4 gap-2 mt-5 max-sm:grid-cols-3">
              <div
                style={{ backgroundImage: workExistingImage[0] && `url(${SERVER_URL}/uploads/${workExistingImage[0].filename})` }}
                className="w-28 h-28 border border-black flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {workExistingImage.length == 0 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>

              <div
                  style={{ backgroundImage: workExistingImage[1] && `url(${SERVER_URL}/uploads/${workExistingImage[1].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {!workExistingImage.length == 1 && (
                  <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                )}
                {workExistingImage.length == 1 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                  style={{ backgroundImage: workExistingImage[2] && `url(${SERVER_URL}/uploads/${workExistingImage[2].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {workExistingImage.length >= 2 ||
                  (!workExistingImage.length < 2 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {workExistingImage.length == 2 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                  style={{ backgroundImage: workExistingImage[3] && `url(${SERVER_URL}/uploads/${workExistingImage[3].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {workExistingImage.length >= 3 ||
                  (!workExistingImage.length < 3 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {workExistingImage.length == 3 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{ backgroundImage: workExistingImage[4] && `url(${SERVER_URL}/uploads/${workExistingImage[4].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover "
              >
                {workExistingImage.length >= 4 ||
                  (!workExistingImage.length < 4 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {workExistingImage.length == 4 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
               
                
              </div>
              <div
                style={{ backgroundImage: workExistingImage[5] && `url(${SERVER_URL}/uploads/${workExistingImage[5].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover "
              >
                {workExistingImage.length >= 5 ||
                  (!workExistingImage.length < 5 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {workExistingImage.length == 5 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
               
                
              </div>
              <div
                style={{ backgroundImage: workExistingImage[6] && `url(${SERVER_URL}/uploads/${workExistingImage[6].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover "
              >
                {workExistingImage.length >= 6 ||
                  (!workExistingImage.length < 6 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {workExistingImage.length == 6 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
               
                
              </div>
              <div
                style={{ backgroundImage: workExistingImage[7] && `url(${SERVER_URL}/uploads/${workExistingImage[7].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover "
              >
                {workExistingImage.length >= 7 ||
                  (!workExistingImage.length < 7 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {workExistingImage.length == 7 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
               
                
              </div>
              <div
                style={{ backgroundImage: workExistingImage[8] && `url(${SERVER_URL}/uploads/${workExistingImage[8].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover "
              >
                {workExistingImage.length >= 8 ||
                  (!workExistingImage.length < 8 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {workExistingImage.length == 8 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
               
                
              </div>
              <div
                style={{ backgroundImage: workExistingImage[9] && `url(${SERVER_URL}/uploads/${workExistingImage[9].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover "
              >
                {workExistingImage.length >= 9 ||
                  (!workExistingImage.length < 9 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {workExistingImage.length == 9 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
               
                
              </div>
              <div
                style={{ backgroundImage: workExistingImage[10] && `url(${SERVER_URL}/uploads/${workExistingImage[10].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover "
              >
                {workExistingImage.length >= 10 ||
                  (!workExistingImage.length < 10 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {workExistingImage.length == 10 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
               
                
              </div>
              <div
                style={{ backgroundImage: workExistingImage[11] && `url(${SERVER_URL}/uploads/${workExistingImage[11].filename})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover "
              >
                {workExistingImage.length >= 11 ||
                  (!workExistingImage.length < 11 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {workExistingImage.length == 11 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
               
                
              </div>
            </div>
          </label>
          :
          <label className="text-center">
            <input
              multiple
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  workImages: [...registerData.workImages, e.target.files[0]],
                })
              }
              className="hidden"
              type="file"
              name="workImages"
              id=""
            />
            <div className="grid grid-cols-4 gap-2 mt-5 max-sm:grid-cols-3">
              <div
                style={{ backgroundImage: preview[0] && `url(${preview[0]})` }}
                className="w-28 h-28 border border-black flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {preview.length == 0 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>

              <div
                style={{ backgroundImage: preview[1] && `url(${preview[1]})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {!preview.length == 1 && (
                  <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                )}
                {preview.length == 1 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{ backgroundImage: preview[2] && `url(${preview[2]})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {preview.length >= 2 ||
                  (!preview.length < 2 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {preview.length == 2 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{ backgroundImage: preview[3] && `url(${preview[3]})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {preview.length >= 3 ||
                  (!preview.length < 3 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {preview.length == 3 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{ backgroundImage: preview[4] && `url(${preview[4]})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover "
              >
                {preview.length >= 4 ||
                  (!preview.length < 4 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {preview.length == 4 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{ backgroundImage: preview[5] && `url(${preview[5]})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {preview.length >= 5 ||
                  (!preview.length < 5 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {preview.length == 5 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{ backgroundImage: preview[6] && `url(${preview[6]})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {preview.length >= 6 ||
                  (!preview.length < 6 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {preview.length == 6 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{ backgroundImage: preview[7] && `url(${preview[7]})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {preview.length >= 7 ||
                  (!preview.length < 7 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {preview.length == 7 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{ backgroundImage: preview[8] && `url(${preview[8]})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {preview.length >= 8 ||
                  (!preview.length < 8 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {preview.length == 8 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{ backgroundImage: preview[9] && `url(${preview[9]})` }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {preview.length >= 9 ||
                  (!preview.length < 9 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {preview.length == 9 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{
                  backgroundImage: preview[10] && `url(${preview[10]})`,
                }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {preview.length >= 10 ||
                  (!preview.length < 10 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {preview.length == 10 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
              <div
                style={{
                  backgroundImage: preview[11] && `url(${preview[11]})`,
                }}
                className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover"
              >
                {preview.length >= 11 ||
                  (!preview.length < 11 && (
                    <AddAPhotoIcon className="text-gray-500" fontSize="large" />
                  ))}
                {preview.length == 11 && (
                  <>
                    <AddAPhotoIcon fontSize="large" />
                    <p>Add Photo</p>
                  </>
                )}
              </div>
            </div>
          </label>} 
          
          <Button
            onClick={handleSubmit}
            color="success"
            style={{ width: "300px", marginTop: "30px" }}
            variant="contained"
          >
            Update
          </Button>
        
          </div>
          
      </div>
    </div>
    <Footer />
    </>
  )
}

export default UserEditableRegister