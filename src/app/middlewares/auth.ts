import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

 

const auth = (...requiredRoles : TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;
            // check if the token is recived from the client 
            if(!token){
                throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized')
            }
            // check if the token is valid 
            
         const decoded =  jwt.verify(token, config.jwt_access_secret as string)   as JwtPayload
         const {role, userId, iat} = decoded;
 
         const userData =  await User.isUserExistsByCustomId(userId)


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
        if(userData.passwordChangedAt && User.isJwtIssuedBeforePasswordChange(userData.passwordChangedAt, iat as number)){
            throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized')

        }
    
         if(requiredRoles && !requiredRoles.includes(role)){
             throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized')

         }
         req.user = decoded as JwtPayload;
         next();
        }
    )
}

export default auth;