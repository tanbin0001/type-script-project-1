
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model"
import { TLoginUser } from "./auth.interface"
import  jwt  from "jsonwebtoken";
import config from "../../config";




const loginUser =async (payload:TLoginUser) => {

    const userData =  await User.isUserExistsByCustomId(payload.id)
    // console.log({userData});

    //check if the user is exists 
    // const isUserExists = 
    if(!userData){
        throw new  AppError(httpStatus.NOT_FOUND,  'This user is not found')
    }
    // checking if the user is already deleted
  
    if(userData.isDeleted === true){
        throw new  AppError(httpStatus.NOT_FOUND,  'This user is already deleted')
    }
    

    if(userData.status === 'blocked'){
        throw new  AppError(httpStatus.NOT_FOUND,  'This user is already blocked')
    }

    // // checking if the pass is correct
   if(! await User.isUserPasswordMatched(payload?.password, userData.password)){
    throw new  AppError(httpStatus.FORBIDDEN,  'Password is not matched!')
   }


   //create token and sent to the client
   const jwtPayload = {
    userId: userData.id,
    role: userData.role
   }
   const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    {expiresIn:'10d'}
   )
   return {
    accessToken,
    needsPasswordChange: userData.needsPasswordChange
   }; 
}



export const AuthServices = {
loginUser
}