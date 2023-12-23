
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model"
import { TLoginUser } from "./auth.interface"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";




const loginUser = async (payload: TLoginUser) => {

    const userData = await User.isUserExistsByCustomId(payload.id)
    // console.log({userData});

    //check if the user is exists 
    // const isUserExists = 
    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
    }
    // checking if the user is already deleted

    if (userData.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already deleted')
    }


    if (userData.status === 'blocked') {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already blocked')
    }

    // // checking if the pass is correct
    if (! await User.isUserPasswordMatched(payload?.password, userData.password)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched!')
    }


    //create token and sent to the client
    const jwtPayload = {
        userId: userData.id,
        role: userData.role
    }
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expiresIn as string)
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expiresIn as string)
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: userData.needsPasswordChange
    };
}

const changePassword = async (user: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {

    const userData = await User.isUserExistsByCustomId(user.userId)
    // console.log({userData});

    //check if the user is exists 
    // const isUserExists = 
    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
    }
    // checking if the user is already deleted

    if (userData.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already deleted')
    }


    if (userData.status === 'blocked') {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already blocked')
    }

    // // checking if the pass is correct
    if (! await User.isUserPasswordMatched(payload?.oldPassword, userData.password)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched!')
    }

    // hash new password 
    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds))
    await User.findOneAndUpdate({
        id: user.userId,
        role: user.role
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date,
    });
    return null
}

const refreshToken = async (token: string) => {

    // check if the token is valid 

    const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload
    const { userId, iat } = decoded;

    const userData = await User.isUserExistsByCustomId(userId)


    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
    }
    // checking if the user is already deleted

    if (userData.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already deleted')
    }


    if (userData.status === 'blocked') {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already blocked')
    }
    if (userData.passwordChangedAt && User.isJwtIssuedBeforePasswordChange(userData.passwordChangedAt, iat as number)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')

    }

    //create token and sent to the client
    const jwtPayload = {
        userId: userData.id,
        role: userData.role
    }
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expiresIn as string)
    return {
        accessToken
    }
};

const forgetPassword = async (userId: string) => {
    const userData = await User.isUserExistsByCustomId(userId);


    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
    }
    // checking if the user is already deleted

    if (userData.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already deleted')
    }


    if (userData.status === 'blocked') {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already blocked')
    }
    //create token and sent to the client
    const jwtPayload = {
        userId: userData.id,
        role: userData.role
    }
    const resetToken = createToken(jwtPayload, config.jwt_access_secret as string, '10m')

    const resetUILink = `${config.reset_pass_ui_link}?id=${userData.id}&token=${resetToken}`;
    sendEmail(userData.email, resetUILink)
}



const resetPassword = async (payload: { id: string, newPassword: string }, token: string) => {
    const userData = await User.isUserExistsByCustomId(payload.id);
    
    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
    }
    // checking if the user is already deleted

    if (userData.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already deleted')
    }
    
    
    if (userData.status === 'blocked') {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already blocked')
    }
    const decoded =  verifyToken(token,config.jwt_refresh_secret as string)
    
    if (payload.id !== decoded.id) {
            throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
        }
        // hash new password 

        const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));
        console.log({newHashedPassword});
        await User.findOneAndUpdate({
            id: decoded.id,
            role: decoded.role
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date,
    });
}





export const AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}