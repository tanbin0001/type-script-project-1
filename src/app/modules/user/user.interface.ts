import { Model } from "mongoose";
import { USER_ROLE } from "./user.const";

export interface TUser  {
    id:string;
    email:string,
    password:string;
    needsPasswordChange: boolean;
    passwordChangedAt?:Date;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted : boolean;
}

export type TUserRole =  keyof typeof USER_ROLE


 export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId  (id: string): Promise<TUser>
    isUserPasswordMatched(plainTextPassword : string,hashedPassword : string): Promise<boolean>;
    isJwtIssuedBeforePasswordChange (passwordChangedTimeStamp : Date, jwtIssuedTimeStamp: number): boolean;
 }