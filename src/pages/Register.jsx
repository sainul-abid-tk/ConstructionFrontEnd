import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Backdrop,
  Button,
  CircularProgress,
  ListItemSecondaryAction,
  TextField,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import ImgPlaceHolder from "../assets/Images/ImgPlaceHolder.png";
import Header from "../components/Header";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { city } from "../assets/AllCities/Cities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPI } from "../Services/allAPI";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Register() {
  const navigate = useNavigate();
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
    workImages: [],
  });
  console.log(registerData);
  const [regImagePreview, setRegImagePreview] = useState("");
  const [preview, setPreview] = useState([]);
  const [IndianStates, setIndianStates] = useState([]);
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  useEffect(() => {
    registerData.workImages.length > 0 &&
      registerData.workImages?.map((images) => {
        setPreview([...preview, URL.createObjectURL(images)]);
      });
    if (registerData.registerImage) {
      setRegImagePreview(URL.createObjectURL(registerData.registerImage));
    }
  }, [registerData.workImages, registerData.registerImage]);

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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRegisterData({
      ...registerData,
      categories: typeof value === "string" ? value.split(",") : value,
    });
  };

  useEffect(() => {
    const states = Array.from(new Set(city.map((city) => city.state)));
    setIndianStates(states);
  }, []);
  console.log(registerData.workImages);
  const handleSubmit = async () => {
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
      !registerImage ||
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
      !place ||
      workImages.length==0
    ) {
      toast.warning("Please fill the form completely!!!");
    } else {
      if(workImages.length>=3){
        //  reqBody setUp
      const reqBody = new FormData();
      reqBody.append("registerImage", registerImage);
      reqBody.append("name", name);
      reqBody.append("phoneNumber", phoneNumber);
      reqBody.append("whatsappNumber",whatsappNumber)
      reqBody.append("categories", categories);
      reqBody.append("experience", experience);
      reqBody.append("workingDays", workingDays);
      reqBody.append("availableTime", availableTime);
      reqBody.append("address", address);
      reqBody.append("paymentMode", paymentMode);
      reqBody.append("state", state);
      reqBody.append("city", city);
      reqBody.append("place", place);
      for (let i = 0; i < workImages.length; i++) {
        reqBody.append("workImages", workImages[i]);
      }
      // reqHeader setUp
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
         " Authorization": `Bearer ${token}`,
        };
        // api call
        try {
          const result = await registerAPI(reqBody, reqHeader);
          console.log(result);
          if (result.status == 200) {
            setOpen(true);
            setTimeout(() => {
              toast.success("Your Deatils Added Successfully!!");
              setRegisterData({
                registerImage: "",
                name: "",
                phoneNumber: "",
                categories: [],
                experience: "",
                workingDays: "",
                availableTime: "",
                address: "",
                paymentMode: "",
                state: "",
                city: "",
                place: "",
                workImages: [],
              });
            }, 2000);
            setTimeout(() => {
              setOpen(false)
              navigate("/");
            }, 6000);
          } else {
            toast.info(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
      }else{
        toast.error("Upload atleast 3 images!! ")
      }
      
    }
  };

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
        <h1 className="text-center text-5xl font-extrabold">Register Your Work Profile</h1>
        <div className="flex flex-col justify-center items-center mt-10">
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
              src={regImagePreview ? regImagePreview : ImgPlaceHolder}
              alt=""
              className="cursor-pointer"
            />
          </label>
         {
          regImagePreview==""&& <p className="text-red-500 font-bold">Add a profile photo</p>
         }
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-2  gap-12  mt-10 max-md:grid-cols-1">
            <TextField
              color="secondary"
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              value={registerData.name}
              className="w-[350px] text-black"
              id="outlined-basic"
              label="Company/Your Name"
              variant="outlined"
            />
            <TextField
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  phoneNumber: e.target.value,
                })
              }
              value={registerData.phoneNumber}
              label="Phone Number"
              type="number"
              id="outlined-start-adornment"
              className="w-[350px]"
              color="secondary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
            <TextField
              color="secondary"
              onChange={(e) =>
                setRegisterData({ ...registerData, whatsappNumber: e.target.value })
              }
              value={registerData.whatsappNumber}
              className="w-[350px] text-black"
              id="outlined-basic"
              type="number"
              label="whatsapp Number"
              variant="outlined"
            />
            <FormControl color="secondary" className="w-[350px] text-black">
              <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={registerData.categories}
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
                    style={getStyles(name, registerData.categories, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Experience"
              onChange={(e) =>
                setRegisterData({ ...registerData, experience: e.target.value })
              }
              value={registerData.experience}
              type="number"
              id="outlined-start-adornment"
              className="w-[350px]"
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
              required
              rows={4}
              onChange={(e) =>
                setRegisterData({ ...registerData, address: e.target.value })
              }
              value={registerData.address}
              typeof="string"
            />
            

            <FormControl>
              <FormLabel
                className="text-xl  font-bold"
                id="demo-radio-buttons-group-label"
                required
              >
                Available Time
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    availableTime: e.target.value,
                  })
                }
                value={registerData.availableTime}
                typeof="string"
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
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    workingDays: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    paymentMode: e.target.value,
                  })
                }
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
                value={registerData.state}
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
                value={registerData.city}
                MenuProps={MenuProps}
                onChange={(e) =>
                  setRegisterData({ ...registerData, city: e.target.value })
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {city
                  .filter((item) => item.state === registerData.state)
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
              label="Locality"
              value={registerData.place}
              onChange={(e) =>
                setRegisterData({ ...registerData, place: e.target.value })
              }
              variant="outlined"
            />
          </div>
          <h3 className="text-start text-xl font-bold mt-5">
            Upload Your Works
          </h3>
          <p className="text-red-500 ">*Upload atleast three Photos*</p>

          <Button
            color="error"
            size="small"
            variant="contained"
            className="text-start"
            onClick={() => {
              setPreview("");
              setRegisterData({ ...registerData, workImages: "" });
            }}
          >
            Clear
          </Button>
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
          </label>
          <Button
            onClick={handleSubmit}
            color="success"
            style={{ width: "300px", marginTop: "30px" }}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
