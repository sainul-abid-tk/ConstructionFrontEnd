import React, { useContext, useEffect, useState } from "react";
import UserPlaceHolder from "../assets/Images/UserPlaceHolder.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addReviewReportAPI,
  addReviewsAPI,
  deleteReviewAPI,
  getAWorkerReviewHighToLowAPI,
  getAWorkerReviewsAPI,
  getAworkerReviewLowToHighAPI,
} from "../Services/allAPI";
import { SERVER_URL } from "../Services/serverURL";
import { addAvarageResponseContext } from "../ContextAPI/AvarageRes";

function Review({ workerDetails }) {
  const { addAvarageResponse, setAddAvarageResponse } = useContext(
    addAvarageResponseContext
  );
  const { wId } = useParams();
  const [reviewStarName, setReviewStarName] = useState("");
  const [workerReviews, setWorkerReviews] = useState();
  const [userEnteredReview, setUserEnteredReview] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [reviewData, setReviewData] = useState({
    workerId: wId,
    ratingPoints: "",
    feedback: "",
    userName: user?.username,
    userPhoto: user?.profileImage,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [reportReview,setReportReview]=useState({
    userName:"",ratingPoints:"",feedback:"",reason:"",reviewId:""
  })
  const handleClose = (e) => {
    e.preventDefault();
    setReviewData({
      workerId: wId,
      ratingPoints: "",
      feedback: "",
      userName: user?.username,
      userPhoto: user?.profileImage,
    });
    setOpen(false);
  };
  const handleRating = async () => {
    console.log(reviewData);
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await addReviewsAPI(reviewData, reqHeader);
        if (result.status == 200) {
          toast.success("Your Review Added Successfully!!!");
          getAWorkerReview()
            setOpen(false);
        } else {
          toast.info(result.response.data);
          setTimeout(() => {
            setOpen(false);
          }, 3000);
        }
      } else {
        toast.info("Please Login!!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [repotOpen, setReportOpen] = useState(false);

  const handleClickOpen = (review) => {
    setReportReview({...reportReview,userName:review?.userName,ratingPoints:review?.ratingPoints,feedback:review?.feedback,reviewId:review?._id})
    setReportOpen(true);
  };

  const handleClickClose = () => {
    setReportOpen(false);
  };
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  function getLabelText(value) {
    return labels[value];
  }
  const getAWorkerReview = async () => {
    try {
      const result = await getAWorkerReviewsAPI(wId);
      if (result.status == 200) {
        
        setAddAvarageResponse(result.data);
        setWorkerReviews(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleReviewDelete = async (id) => {
    console.log(id);
    
    const result = await deleteReviewAPI(id);
    console.log(result);
    if (result.status == 200) {
      toast.info(result.data);
      getAWorkerReview()
      setUserEnteredReview("")
      setReviewData({
        workerId: wId,
        ratingPoints: "",
        feedback: "",
        userName: user?.username,
        userPhoto: user?.profileImage,
      });
    } else {
      console.log(result.response.data);
    }
  };
  useEffect(() => {
    if(workerReviews!="Not Available!!!"){
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        setUserEnteredReview(
          workerReviews?.filter((review) => review.userId == user._id)
        );
      }
    }else{
    setUserEnteredReview("")
    }
  }, [workerReviews]);
  useEffect(()=>{
    getAWorkerReview()
  },[])
  
  useEffect(() => {
    setReviewStarName(getLabelText(reviewData.ratingPoints));
  }, [reviewData.ratingPoints]);
  console.log(reportReview);
  const handleReportReview=async()=>{
    const {reason}=reportReview
    const token = sessionStorage.getItem("token");
    if(token){
      if(!reason){
        toast.warning("Please fill the Reason!!!")
      }else{
        const result=await addReviewReportAPI(reportReview)
        if(result.status==200){
          toast.success("Report Added Successfully!!")
          setTimeout(() => {
            handleClickClose()
            setReportReview({
              userName:"",ratingPoints:"",feedback:"",reason:"",reviewId:""
            })
          }, 2000);
        }else{
          console.log(result.response.data);
        }
      }
    }else{
      toast.warning("Please Login")
    }
    
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mt-10">Reviews and Ratings</h1>
      {workerDetails?.avarageReview != 0 ? (
        <div className="flex text-xl mt-4">
          <p style={{background:workerDetails?.avarageReview<3?'red':'green'}} className=" px-2 text-white rounded-md">
            {workerDetails?.avarageReview}
          </p>
          &nbsp;
          <Rating
            size="large"
            name="half-rating-read"
            defaultValue={parseFloat(workerDetails?.avarageReview)}
            value={parseFloat(workerDetails?.avarageReview)}
            precision={0.5}
            readOnly
          />
        </div>
      ) : (
        <h5 className="text-red-500">No Reviews are Uploaded Yet!!</h5>
      )}
      {JSON.parse(sessionStorage.getItem("user"))?._id !=
        workerDetails?.userId && (
        <>
          <h1 className="text-2xl font-bold mt-5">
            {userEnteredReview != ""
              ? "Your Review"
              : "Start Your Reviews and Ratings"}
          </h1>
          {userEnteredReview != "" ? (
            userEnteredReview?.map((review) => (
              <div className="grid grid-cols-6 border mt-5 w-full h-auto p-3 shadow-md">
                <div className="col-span-4">
                  <div className="flex space-x-3">
                    {review.userPhoto ? (
                      <Avatar
                        sx={{ width: 36, height: 36 }}
                        className="rounded-full"
                        src={
                          review.userPhoto?.startsWith("https://")
                            ? review.userPhoto
                            : `${SERVER_URL}/uploads/${review.userPhoto}`
                        }
                        alt=""
                      />
                    ) : (
                      <Avatar
                        sx={{ width: 36, height: 36 }}
                        className="rounded-full"
                        src={UserPlaceHolder}
                        alt=""
                      />
                    )}
                    <p className="font-bold text-lg">{review.userName}</p>
                  </div>
                  <div className="flex mt-3">
                    <p style={{background:review?.ratingPoints<3?'red':'green'}} className=" px-2 text-white rounded-md">
                      {review.ratingPoints.toString().includes(".")
                        ? review.ratingPoints
                        : `${review.ratingPoints}.0`}
                    </p>
                    &nbsp;
                    <Rating
                      className=" text-xl"
                      name="read-only"
                      value={review.ratingPoints}
                      readOnly
                      precision={0.5}
                    />
                  </div>
                </div>
                <div className="col-span-2 flex justify-end">
                  <div className="flex">
                    <p className="font-bold me-2">
                      {review.createdAt.split("T")[0]}
                    </p>
                    <p onClick={() => handleReviewDelete(review?._id)}>
                      <DeleteIcon className="cursor-pointer" color="error" />
                    </p>
                  </div>
                </div>

                <p className="mt-3 col-span-6">{review.feedback}</p>
              </div>
            ))
          ) : (
            <>
              <Rating
                onClick={handleOpen}
                size="large"
                style={{ fontSize: "40px" }}
                className="mt-4"
                precision={0.5}
                name="simple-controlled"
                value={reviewData.ratingPoints}
                onChange={(event, newValue) => {
                  setReviewData({ ...reviewData, ratingPoints: newValue });
                }}
              />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="rounded-xl" sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <Rating
                      name="hover-feedback"
                      value={reviewData.ratingPoints}
                      onClick={handleOpen}
                      size="large"
                      style={{ fontSize: "40px" }}
                      className="mt-4"
                      getLabelText={getLabelText}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setReviewData({
                          ...reviewData,
                          ratingPoints: newValue,
                        });
                      }}
                    />
                    <h4 className="text-xl font-bold text-yellow-300">
                      {reviewStarName}
                    </h4>
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, mb: 4 }}
                  >
                    <TextField
                      id="standard-multiline-static"
                      label="Add Your Feedback(*Not Mandatory*)"
                      onChange={(e) =>
                        setReviewData({
                          ...reviewData,
                          feedback: e.target.value,
                        })
                      }
                      className="w-full"
                      multiline
                      required={false}
                      rows={5}
                      variant="standard"
                    />
                  </Typography>
                  <div className="flex justify-end space-x-4">
                    <Button
                      onClick={handleClose}
                      color="error"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleRating} variant="contained">
                      Add
                    </Button>
                  </div>
                </Box>
              </Modal>
            </>
          )}
        </>
      )}

      <h1 className="text-2xl font-bold mt-5">Customer Reviews</h1>
          <div className="flex space-x-4  mt-3">
            <Button onClick={()=>{
              getAWorkerReview()
            }} size="small" variant="outlined">
              Latest
            </Button>
            <Button onClick={async()=>{
              const result=await getAWorkerReviewHighToLowAPI(wId)
              if(result.status==200){
                setWorkerReviews(result.data)
              }else{
                console.log(result.response.data);
              }
            }} size="small" variant="outlined">
              High to Low
            </Button>
            <Button onClick={async()=>{
              const result =await getAworkerReviewLowToHighAPI(wId)
              if(result.status==200){
                setWorkerReviews(result.data)
              }else{
                console.log(result.response.data);
              }
            }} size="small" variant="outlined">
              Low to High
            </Button>
          </div>
          {workerReviews!="Not Available!!!"?workerReviews?.map((review) => (
            <div className="grid grid-cols-6 border mt-5 w-full h-auto p-3 shadow-md">
              <div className="col-span-4">
                <div className="flex space-x-3">
                  {review.userPhoto ? (
                    <Avatar
                      sx={{ width: 36, height: 36 }}
                      className="rounded-full"
                      src={
                        review.userPhoto?.startsWith("https://")
                          ? review.userPhoto
                          : `${SERVER_URL}/uploads/${review.userPhoto}`
                      }
                      alt=""
                    />
                  ) : (
                    <Avatar
                      sx={{ width: 36, height: 36 }}
                      className="rounded-full"
                      src={UserPlaceHolder}
                      alt=""
                    />
                  )}
                  <p className="font-bold text-lg">{review.userName}</p>
                </div>
                <div className="flex mt-3">
                  <p style={{background:review?.ratingPoints<3?'red':'green'}} className=" px-2 text-white rounded-md">
                    {review.ratingPoints.toString().includes(".")
                      ? review.ratingPoints
                      : `${review.ratingPoints}.0`}
                  </p>
                  &nbsp;
                  <Rating
                    className=" text-xl"
                    name="read-only"
                    value={review.ratingPoints}
                    readOnly
                    precision={0.5}
                  />
                </div>
              </div>
              <div className="col-span-2 flex justify-end">
                <div className="flex">
                  <p className="font-bold">{review.createdAt.split("T")[0]}</p>
                  <div
                    className=" h-fit pb-5 cursor-pointer"
                    onClick={()=>handleClickOpen(review)}
                  >
                    <MoreVertIcon />
                  </div>
                  <Dialog open={repotOpen} onClose={handleClickClose}>
                    <DialogTitle className="text-red-500 font-bold">
                      Report The Comment
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Why are you reporting this comment?
                      </DialogContentText>
                      <TextField
                        autoFocus
                        required
                        multiline
                        margin="dense"
                        id="name"
                        label="Reason"
                        type="text"
                        fullWidth
                        rows={2}
                        variant="standard"
                        onChange={e=>setReportReview({...reportReview,reason:e.target.value})}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClickClose}>Cancel</Button>
                      <Button
                        onClick={handleReportReview}
                        variant="contained"
                        color="error"
                      >
                        Report
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>

              <p className="mt-3 col-span-6">{review.feedback}</p>
            </div>
          )):
          <h5 className="text-red-500">{workerReviews}</h5>
          }
    </div>
  );
}

export default Review;
