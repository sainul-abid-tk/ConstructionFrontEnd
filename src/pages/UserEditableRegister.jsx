import React,{useState} from 'react'
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import { Button, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Electric from '../assets/Images/Electric.jpg'
import Header from "../components/Header";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UserPlaceHolder from '../assets/Images/UserPlaceHolder.jpg'
import carpenter from '../assets/Images/carpenter.jpg'
import welding from '../assets/Images/welding.jpg'
import construction from '../assets/Images/Construction.jpg'
function UserEditableRegister() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
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
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
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
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleState = (event) => {
    setState(event.target.value);
  };
  const handleCity = (event) => {
    setCity(event.target.value);
  };
  return (
    <>
    <Header insideRegister />
      <div className="min-h-screen   py-5 ">
        <h1 className="text-center text-5xl font-extrabold">Edit Your Register</h1>
        <div className="flex justify-center items-center mt-10">
          <label className="text-center">
            <input className="hidden " type="file" name="" id="" />
            <img
              width={300}
              src={Electric}
              alt=""
              className="cursor-pointer rounded-lg"
            />
          </label>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-2  gap-12  mt-10 max-md:grid-cols-1">
            <TextField
              color="secondary"
              className="w-[350px] text-black"
              id="outlined-basic"
              defaultValue={"kaif Umer"}
              label="Company/Your Name"
              variant="outlined"
            />
            <TextField
              label="Phone Number"
              id="outlined-start-adornment"
              className="w-[350px]"
              color="secondary"
              defaultValue={"8086783449"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
            <FormControl color="secondary" className="w-[350px] text-black">
              <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
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
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Experience"
              id="outlined-start-adornment"
              className="w-[350px]"
              defaultValue={3}
              color="secondary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Year</InputAdornment>
                ),
              }}
            />
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
                defaultValue={"Mon to Sat"}
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
                Available Time
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue={"24 Hours"}
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
            <TextField
              id="outlined-multiline-static"
              label="Address/NearBy"
              multiline
              rows={4}
              defaultValue={"Room No. 1/22 - opposite Anna Centenary Library,Kottupuram,Chennai"}
            />
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
                defaultValue={"Cash/Online Payments"}
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
            <h5 className="text-xl font-bold">Location Details</h5>
            <div className="max-md:hidden"></div>
            <FormControl color="secondary" className="w-[350px] ">
              <InputLabel id="demo-select-small-label">State</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={state}
                label="Age"
                onChange={handleState}
                MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {names.map((name) => (
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
                onChange={handleCity}
                MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
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
              defaultValue={"Kottupuram"}
            />
          </div>
          <h3 className="text-start text-xl font-bold mt-5">
            Update Your Works
          </h3>
          <p className="text-red-500 ">*Upload atleast three Photos*</p>
          <div className="grid grid-cols-4 gap-2 mt-5 max-sm:grid-cols-3">
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div style={{backgroundImage:`url(${welding})`}} className="w-28 h-28 border border-black flex flex-col justify-center items-center cursor-pointer bg-cover">
                {/* <AddAPhotoIcon fontSize="large" /> */}
                {/* <p>Add Photo</p> */}
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div style={{backgroundImage:`url(${construction})`}} className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover">
                {/* <AddAPhotoIcon className="text-gray-500" fontSize="large" /> */}
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div style={{backgroundImage:`url(${carpenter})`}} className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover">
                {/* <AddAPhotoIcon className="text-gray-500" fontSize="large" /> */}
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div style={{backgroundImage:`url(${UserPlaceHolder})`}} className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer bg-cover">
                {/* <AddAPhotoIcon className="text-gray-500" fontSize="large" /> */}
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer">
                <AddAPhotoIcon className="text-gray-500" fontSize="large" />
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer">
                <AddAPhotoIcon className="text-gray-500" fontSize="large" />
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer">
                <AddAPhotoIcon className="text-gray-500" fontSize="large" />
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer">
                <AddAPhotoIcon className="text-gray-500" fontSize="large" />
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer">
                <AddAPhotoIcon className="text-gray-500" fontSize="large" />
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer">
                <AddAPhotoIcon className="text-gray-500" fontSize="large" />
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer">
                <AddAPhotoIcon className="text-gray-500" fontSize="large" />
              </div>
            </label>
            <label className="text-center">
              <input className="hidden " type="file" name="" id="" />
              <div className="w-28 h-28 border border-gray-500 flex flex-col justify-center items-center cursor-pointer">
                <AddAPhotoIcon className="text-gray-500" fontSize="large" />
              </div>
            </label>
          </div>
          <Button
            color="success"
            style={{ width: "300px", marginTop: "30px" }}
            variant="contained"
          >
            Update
          </Button>
        </div>
      </div>
    </>
  )
}

export default UserEditableRegister