import httpStatus from 'http-status';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.model';
import { TStudent } from './../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  //create a new user object

  const userData: Partial<TUser> = {};

  // if   !password, use default pass
  userData.password = password || (config.default_pass as string);

  //set std role
  userData.role = 'student';






const admissionSemester = await AcademicSemester.findById(
  payLoad.academicSemester
)



const session =  await mongoose.startSession()
try {
  session.startTransaction();
   // Check if admissionSemester is null
   if (!admissionSemester) {
    // Handle the case where admissionSemester is null (e.g., throw an error or handle accordingly)
    throw new AppError(httpStatus.NOT_FOUND,'Admission semester not found');
  }

userData.id = await generateStudentId(admissionSemester);


//create a user(trans-1)
const newUser = await User.create([userData],{session});

//create a student
if (!newUser.length) {

  throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
}
  //set id, _id as user
  payLoad.id = newUser[0].id;

  payLoad.user = newUser[0]._id; //refer id


// trans-2



  const newStudent = await Student.create([payLoad],{session});

  if (!newStudent.length) {

    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
  }

  await session.commitTransaction()
  await session.endSession();
  return newStudent;
  
} catch (error) {
  console.log(error);
  session.abortTransaction()
  session.endSession()
  
}


 
   
};

export const UserService = {
  createStudentIntoDB,
};
