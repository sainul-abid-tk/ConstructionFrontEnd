import { commonAPI } from "./CommonAPI"
import { SERVER_URL } from "./serverURL"

// signUp API
export const SignUpAPI =async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/signup`,reqBody,reqHeader)
}
// login
export const LoginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody,"")
}
// google login
export const GoogleLoginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/google`,reqBody,"")
}
// registerAPI
export const registerAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody,reqHeader)
}
// get All workers
export const getAllWorkersAPI=async(searchKey)=>{
    return await commonAPI("GET",`${SERVER_URL}/getWorkers?search=${searchKey}`,"","")
}
// Show One Worker
export const getAWorkerAPI=async(wId)=>{
    return await commonAPI("GET",`${SERVER_URL}/getAWorker/${wId}`,"","")
}
// Add Review
export const addReviewsAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/addReview`,reqBody,reqHeader)
}
// getAWorkerReviews
export const getAWorkerReviewsAPI=async(wId)=>{
    return await commonAPI("GET",`${SERVER_URL}/getAWorkerReview/${wId}`,"","")
}
// Delete Review
export const deleteReviewAPI=async(id)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/deleteReview/${id}`,{},"")
}
// getgetAWorkerReviewHighToLow
export const getAWorkerReviewHighToLowAPI=async(wId)=>{
    return await commonAPI("GET",`${SERVER_URL}/getAWorkerReviewHighToLow/${wId}`,"","")
}
// getAworkerReviewLowToHigh
export const getAworkerReviewLowToHighAPI=async(wId)=>{
    return await commonAPI("GET",`${SERVER_URL}/getAworkerReviewLowToHigh/${wId}`,"","")
}
// get DecryptedKey
export const getDecryptedEnvAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/getDecryptedEnv`,"","")
}
// update User Profile
export const updateUserProfileAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/updateUserProfile`,reqBody,reqHeader)
}
// get userWork Details
export const getUserWorkDetailsAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/getUserWorkDetails`,"",reqHeader)
}
// delete worker
export const deleteWorkerAPI=async(wId)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/deleteWorker/${wId}`,{},"")
}
// update worker
export const updateWorkerAPI=async(wId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/updateWorker/${wId}`,reqBody,reqHeader)
}
// Admin

// Get all Users
export const getAdAllUsersAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/getAdallUsers`,"","")
}
// Update Users 
export const updateAdUsersAPI=async(uId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/updateAdUsers/${uId}`,reqBody,reqHeader)
}
// Delete USer
export const deleteUserAPI=async(uId)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/deleteUser/${uId}`,{},"")
}
// get All Reviews
export const getAllReviewsAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/getAllReviews`,"","")
}
// Add Review Reports
export const addReviewReportAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/addreportReview`,reqBody,"")
}
//get All ReportedReviews
export const getReportedReviewsAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/getReportedReviews`,"","")
}
// Delete reviewReports
export const deleteReviewReportsAPI=async(rrId)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/deleteReportReview/${rrId}`,{},"")
}
// Delete reviewReports
export const getAdminAllworkersAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/getAllWorkersAdmin`,"","")
}
// update status
export const updateStatusAPI=async(id,reqBody)=>{
    return await commonAPI("PUT",`${SERVER_URL}/updateStatus/${id}`,reqBody,"")
}
// get All Counts 
export const getAllCountsAPI=async()=>{
    return await commonAPI('GET',`${SERVER_URL}/getAllCount`,"","")
}