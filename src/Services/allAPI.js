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
