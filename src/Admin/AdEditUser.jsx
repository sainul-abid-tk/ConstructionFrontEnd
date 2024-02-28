import React, { useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import EditIcon from '@mui/icons-material/Edit';
  import {
    Button,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  import welding from "../assets/Images/Electric.jpg";
  import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { SERVER_URL } from '../Services/serverURL';
import {decrypt} from 'n-krypta'
import { updateAdUsersAPI } from '../Services/allAPI';
import { profileUpdateResponseContext } from '../ContextAPI/AvarageRes';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function AdEditUser({user,decryptKey}) {
  const uId=user._id
  const {profileUpdateResponse,setProfileUpdateResponse} =useContext(profileUpdateResponseContext)
    const [existingImage,setExistingImage]=useState("")
  const [profileImagePreview,setProfileImagePreview]=useState("")
  const [updateUser,setUpdateUser]=useState({
    profileImage:existingImage,
    username:user?.username,
    email:user?.email,
    password:decrypt(user?.password,decryptKey)
  })
  useEffect(()=>{
    setExistingImage(user?.profileImage)
  },[user])
  useEffect(()=>{
    if(updateUser.profileImage){
      setProfileImagePreview(URL.createObjectURL(updateUser.profileImage))
    }
  },[updateUser.profileImage])
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleUpdate=async()=>{
    const {username,email,password,profileImage}=updateUser
    console.log(password);
    if(password==""){
     if(!username||!email){
       toast.warning("Please fill the form completely!!!")
     }else{
       const reqBody=new  FormData()
       reqBody.append("username",username)
       reqBody.append("email",email)
       reqBody.append("password",password)
       reqBody.append("profileImage",profileImagePreview?profileImage:existingImage)
       const token=sessionStorage.getItem("token")
       if(token){
         try{
          const reqHeader={
           "Content-Type":profileImagePreview?"multipart/form-data":"application/json",
           "Authorization":`Bearer ${token}`
          }
          const result =await updateAdUsersAPI(uId,reqBody,reqHeader)
          if(result.status==200){
           toast.success("Profile updated Successfully")
           setTimeout(() => {
            handleClose()
           }, 2000);
           setProfileUpdateResponse(result.data)
          }else{
           console.log(result.response.data);
          }
         }catch(err){
           console.log(err);
         }
       }
      }
    }
    else{
     if(!username||!email||!password){
       toast.warning("Please fill the form completely!!!")
      }else{
       const reqBody=new  FormData()
       reqBody.append("username",username)
       reqBody.append("email",email)
       reqBody.append("password",password)
       reqBody.append("profileImage",profileImagePreview?profileImage:existingImage)
       const token=sessionStorage.getItem("token")
       if(token){
         try{
          const reqHeader={
           "Content-Type":profileImagePreview?"multipart/form-data":"application/json",
           "Authorization":`Bearer ${token}`
          }
          const result =await updateAdUsersAPI(uId,reqBody,reqHeader)
          if(result.status==200){
           toast.success("profile updated Successfully")
           setTimeout(() => {
            handleClose()
           }, 2000);
           setProfileUpdateResponse(result.data)
          }else{
           toast.info(result.response.data);
          }
         }catch(err){
           console.log(err);
         }
       }
      }
    }
   
   }
  return (
    <>
    <Button><EditIcon fontSize='large' onClick={handleClickOpen} /></Button>
                <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {updateUser?.username}
            </Typography>
            <Button
            onClick={handleUpdate}
              style={{
                background: " rgb(22 180 74 / var(--tw-bg-opacity))",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              className="bg-green-600"
              variant="contained"
            >
              Update
            </Button>
              
          </Toolbar>
        </AppBar>
        <div className="col-span-3 max-[840px]:col-auto h-full flex justify-center mt-3">
          <div className="space-y-12 w-96 rounded-xl px-3">
            <div className="flex justify-center items-center mt-10">
            <label className="text-center">
                <input onChange={e=>setUpdateUser({...updateUser,profileImage:e.target.files[0]})} className="hidden " type="file" name="" id="" />
                {updateUser.password!=""?<div
                  style={{backgroundImage:profileImagePreview?`url(${profileImagePreview})`:`url(${SERVER_URL}/uploads/${existingImage})`}}
                  className="w-44 h-44 rounded-full bg-cover  cursor-pointer relative flex justify-center items-center"
                >
                <AddAPhotoIcon
                    className="absolute bottom-3 "
                    style={{ color: "white" }}
                    fontSize="large"
                  />
                </div>
                :
                <div
                  style={{backgroundImage:profileImagePreview?`url(${profileImagePreview})`:existingImage.startsWith('https')?`url(${existingImage})`:`url(${SERVER_URL}/uploads/${existingImage})`}}
                  className="w-44 h-44 rounded-full bg-cover  cursor-pointer relative flex justify-center items-center"
                >
                <AddAPhotoIcon
                    className="absolute bottom-3 "
                    style={{ color: "white" }}
                    fontSize="large"
                  />
                </div>
                }
                  
              </label>
            </div>
            <TextField
              value={updateUser?.username}
              onChange={e=>setUpdateUser({...updateUser,username:e.target.value})}
              type="text"
              className="w-full border-black border-2 text-lg"
              id="standard-basic"
              label="Username"
              variant="standard"
            />
            <div>
            <TextField
              value={updateUser?.email}
              onChange={e=>setUpdateUser({...updateUser,email:e.target.value})}
              type="email"
              className="w-full border-black border-2 text-lg"
              id="standard-basic"
              label="Email"
              variant="standard"
              disabled={updateUser.password==""?true:false}
            />
            <p className="text-red-500">*Update a valid E-mail Address*</p>
            </div>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                value={updateUser?.password}
                onChange={e=>setUpdateUser({...updateUser,password:e.target.value})}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                disabled={updateUser.password==""?true:false}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      disabled={updateUser.password==""?true:false}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
        <ToastContainer
          autoClose={2000}
          position="top-center"
          theme="colored"
        />
      </Dialog>
    </>
  )
}

export default AdEditUser