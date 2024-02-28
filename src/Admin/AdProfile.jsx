import React, { useContext, useEffect, useState } from 'react'
import AdHeader from './AdHeader'
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UserEditableWorkCard from "../components/UserEditableWorkCard";
import {decrypt} from 'n-krypta'
import { getDecryptedEnvAPI, updateUserProfileAPI } from "../Services/allAPI";
import { SERVER_URL } from "../Services/serverURL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { profileUpdateResponseContext } from "../ContextAPI/AvarageRes";
function AdProfile() {
  const navigate=useNavigate()
  const {profileUpdateResponse,setProfileUpdateResponse} =useContext(profileUpdateResponseContext)
  const [showPassword, setShowPassword] = useState(false);
  const [existingImage,setExistingImage]=useState("")
  const [profileImagePreview,setProfileImagePreview]=useState("")
  const [userProfile,setUserProfile]=useState({
    profileImage:existingImage,
    username:JSON.parse(sessionStorage.getItem("user")).username,
    email:JSON.parse(sessionStorage.getItem("user")).email,
    password:""
  })
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const getDecryptingEnv=async()=>{
    const result=await getDecryptedEnvAPI()
    if(result.status==200){
      setUserProfile({...userProfile,password:decrypt(JSON.parse(sessionStorage.getItem("user")).password,result.data)})
    }else{
      console.log(result.response.data);
    }
  }
  useEffect(()=>{
    if(JSON.parse(sessionStorage.getItem("user")).password!=""){
      getDecryptingEnv()
    }
    if(userProfile.profileImage){
      setProfileImagePreview(URL.createObjectURL(userProfile.profileImage))
    }
    setExistingImage(JSON.parse(sessionStorage.getItem("user")).profileImage)
   },[userProfile.profileImage])

   const handleUpdate=async()=>{
    const {username,email,password,profileImage}=userProfile
    const passwordCheckingforGoogleuser=JSON.parse(sessionStorage.getItem("user")).password
    console.log(passwordCheckingforGoogleuser);
    if(passwordCheckingforGoogleuser==""){
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
          const result =await updateUserProfileAPI(reqBody,reqHeader)
          if(result.status==200){
           toast.success("Your profile updated Successfully")
           sessionStorage.setItem("user",JSON.stringify(result.data))
           useNavigate('/')
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
          const result =await updateUserProfileAPI(reqBody,reqHeader)
          if(result.status==200){
           toast.success("Your profile updated Successfully")
           useNavigate('/')
           sessionStorage.setItem("user",JSON.stringify(result.data))
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
    <AdHeader/>
    <div className="h-screen flex justify-center items-center w-full">
          <div className="w-96 space-y-12 rounded-xl ">
            <div className="flex justify-center items-center mt-10">
              <label className="text-center">
                <input onChange={e=>setUserProfile({...userProfile,profileImage:e.target.files[0]})} className="hidden " type="file" name="" id="" />
                {userProfile.password!=""?<div
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
              value={userProfile.username}
              onChange={e=>setUserProfile({...userProfile,username:e.target.value})}
              type="text"
              className="w-full border-black border-2 text-lg"
              id="standard-basic"
              label="Username"
              variant="standard"
            />
            <div >
            <TextField
              value={userProfile.email}
              onChange={e=>setUserProfile({...userProfile,email:e.target.value})}
              type="email"
              className="w-full border-black border-2 text-lg"
              id="standard-basic"
              label="Email"
              disabled={userProfile.password==""?true:false}
              variant="standard"
            />
            <p style={{display:userProfile.password==""?'none':'block'}} className="text-red-500 hi">*Update a valid E-mail Address*</p>
            </div>
           <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                value={userProfile.password}
                onChange={e=>setUserProfile({...userProfile,password:e.target.value})}
                disabled={userProfile.password==""?true:false}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      disabled={userProfile.password==""?true:false}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
            onClick={handleUpdate}
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
        <ToastContainer
          autoClose={2000}
          position="top-center"
          theme="colored"
        />
    </>
  )
}

export default AdProfile