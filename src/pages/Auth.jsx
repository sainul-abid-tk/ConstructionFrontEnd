import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Google from "../assets/Images/google.png";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import UserPlaceHolder from "../assets/Images/UserPlaceHolder.jpg";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLoginAPI, LoginAPI, SignUpAPI } from "../Services/allAPI";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { auth } from "../FireBase/fireBase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import EngineeringIcon from '@mui/icons-material/Engineering';
import signupBack from '../assets/Images/signupBack.jpg'
import LoginBack from '../assets/Images/LoginBack.png'
import { tokenAuthenticationContext } from "../ContextAPI/TokenAuth";
function Auth({ insideSignup }) {
  const provider = new GoogleAuthProvider();
  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthenticationContext)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: "",
  });
  const [googleLogin,setGoogleLogin]=useState({
    username: "",
    email: "",
    password: "",
    profileImage: "",
  })
  
  const [preview, setPreview] = useState("");

  const handleSignUp = async () => {
    console.log(user);
    const { username, email, password, profileImage } = user;
    if (!username || !email || !password) {
      toast.info("Please fill the form completely!!!");
    } else {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      reqBody.append("profileImage",preview?profileImage:UserPlaceHolder);
      const reqHeader = {
        "Content-Type": preview ? "multipart/form-data" : "application/json",
      };
      try {
        const result = await SignUpAPI(reqBody, reqHeader);
        console.log(result);
        if (result.status === 200) {
          toast.success("SignUp successfully!");
          setTimeout(() => {
            setUser({
              username: "",
              email: "",
              password: "",
              profileImage: "",
            });
            navigate("/login");
          }, 3000);
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = user;
    if (!email || !password) {
      toast.info("Please fill the form Completely!!!");
    } else {
      try {
        const result = await LoginAPI(user);
        if (result.status == 200) {
          setOpen(true);
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem(
            "user",
            JSON.stringify(result.data.existingUser)
          );
          setTimeout(() => {
            setUser({ email: "", password: "" });
            setIsAuthorized(true)
            setOpen(false);
            if(result.data.existingUser.email=="admin123@gmail.com"){
              navigate('/adhome')
            }else{
              navigate("/");
            }
          }, 3000);
        } else {
          toast.error(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handlegoogle = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        setGoogleLogin({
          email: result.user.email,
          username: result.user.displayName,
          profileImage: result.user.photoURL,
          password:""
        })
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(error);
        // ...
      });
  };
  const GoogleLogin=async()=>{
    const googleLoginResult =await GoogleLoginAPI(googleLogin);
    if (googleLoginResult.status == 200) {
      sessionStorage.setItem("token",googleLoginResult.data.token)
      sessionStorage.setItem("user",JSON.stringify(googleLoginResult.data.user))
      navigate('/')
      setIsAuthorized(true)
      setGoogleLogin({
        username: "",
        email: "",
        password: "",
        profileImage: "",
      })
    } else {
      console.log(googleLoginResult.response.data);
    }
  }
  useEffect(() => {
    
    if (user.profileImage) {
      setPreview(URL.createObjectURL(user.profileImage));
    }
  }, [user.profileImage]);
  useEffect(()=>{
    GoogleLogin()
  },[googleLogin,handleLogin])
  

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress size={60} color="warning" />
        
      </Backdrop>
      <div  className="min-h-screen  flex  justify-center items-center  py-3">
      <ToastContainer
          autoClose={3000}
          position="top-center"
          theme="colored"
        />
        <div className="grid grid-cols-2 max-[850px]:grid-cols-1 w-[850px] shadow-2xl">
          <div className="flex flex-col justify-center items-center h-96 bg-white">
            {insideSignup?
            <div className="flex justify-center flex-col items-center ">
              <EngineeringIcon fontSize="large" style={{fontSize:'80px'}} className="mb-5  font-bold"/>
            <h1 className="text-5xl font-bold w-80 text-center">WELCOME TO <span className="text-yellow-400">CONNECTIE</span></h1>
            </div>
            :
            <img src={LoginBack} alt="" />
          }
          </div>
        <div className=" space-y-10   px-3  bg-yellow-400 py-3">
        {!insideSignup&&<h1 className="text-center text-4xl mb-3  font-bold">
          LOGIN
        </h1>}
          {insideSignup && (
            <div className="flex justify-center items-center mt-10">
              <label className="text-center">
                <input
                  onChange={(e) =>
                    setUser({ ...user, profileImage: e.target.files[0] })
                  }
                  className="hidden "
                  type="file"
                  name=""
                  id=""
                />
                <div
                  style={{
                    backgroundImage: `url(${
                      preview ? preview : UserPlaceHolder
                    })`
                  }}
                  className="w-32 h-32 rounded-full bg-cover  cursor-pointer
            relative flex justify-center items-center"
                >
                  <AddAPhotoIcon
                    className="absolute bottom-2 "
                    style={{ color: "white" }}
                  />
                </div>
              </label>
            </div>
          )}
          {insideSignup && (
            <TextField
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              className="w-full"
              id="standard-basic"
              label="Username"
              variant="standard"
            />
          )}
          <TextField
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            className="w-full "
            id="standard-basic"
            label="Email"
            variant="standard"
          />
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
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
          {insideSignup ? (
            <Button
              onClick={handleSignUp}
              style={{
                width: "100%",
                background: " rgb(22 180 74 / var(--tw-bg-opacity))",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              className="bg-green-600"
              variant="contained"
            >
              SignUp
            </Button>
          ) : (
            <Button
              onClick={handleLogin}
              style={{
                width: "100%",
                background: " rgb(22 180 74 / var(--tw-bg-opacity))",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              className="bg-green-600"
              variant="contained"
            >
              LogIn
            </Button>
          )}
          {!insideSignup && (
            <div>
              <p className=" text-center font-bold">OR</p>
              <Button
                onClick={(e) => handlegoogle(e)}
                style={{
                  width: "100%",
                  background: "white",
                  color: "black",
                  fontWeight: "bold",
                }}
                variant="contained"
              >
                <img width={20} src={Google} alt="" />
                &nbsp;Continue With Google
              </Button>
            </div>
          )}
          {insideSignup ? (
            <div className="flex flex-col  w-full items-center mt-2">
              <p className="text-md mt-2">
                Already have an account?
                <Link to={"/login"} className="text-blue-500">
                  Login
                </Link>
              </p>
              <Link to={"/"}>
                <HomeIcon className="cursor-pointer" fontSize="large" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col  w-full items-center mt-2">
              <p className="text-md">
                Don't have an account?
                <Link to={"/signup"} className="text-blue-500">
                  Signup
                </Link>
              </p>
              <Link to={"/"}>
                <HomeIcon className="cursor-pointer" fontSize="large" />
              </Link>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
