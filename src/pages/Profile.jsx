import React, { useState } from "react";
import Header from "../components/Header";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import welding from "../assets/Images/Electric.jpg";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UserEditableWorkCard from "../components/UserEditableWorkCard";
function Profile() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-8 max-[840px]:grid-cols-1 min-h-screen">
        <div className="col-span-3 max-[840px]:col-auto h-full flex justify-center mt-3">
          <div className="max-w-md space-y-12 rounded-xl px-3">
            <div className="flex justify-center items-center mt-10">
              <label className="text-center">
                <input className="hidden " type="file" name="" id="" />
                <div
                  style={{ backgroundImage: `url(${welding})` }}
                  className="w-44 h-44 rounded-full bg-cover  cursor-pointer relative flex justify-center items-center"
                >
                  <AddAPhotoIcon
                    className="absolute bottom-3 "
                    style={{ color: "white" }}
                    fontSize="large"
                  />
                </div>
              </label>
            </div>
            <TextField
              defaultValue={"Kaif Umer"}
              type="text"
              className="w-full border-black border-2 text-lg"
              id="standard-basic"
              label="Username"
              variant="standard"
            />
            <TextField
              defaultValue={"kaifumer123@gmail.com"}
              type="email"
              className="w-full border-black border-2 text-lg"
              id="standard-basic"
              label="Email"
              variant="standard"
            />
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                defaultValue={"kaif123456"}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              style={{
                width: "100%",
                background: " rgb(22 180 74 / var(--tw-bg-opacity))",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              className="bg-green-600"
              variant="contained"
            >
              Update
            </Button>
          </div>
        </div>
        <div className="col-span-5 max-[840px]:col-auto">
          <h1 className="font-bold text-center text-3xl mt-9">Edit Your Work Profile</h1>
          <div className="max-[840px]:mt-5">
            <UserEditableWorkCard/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
