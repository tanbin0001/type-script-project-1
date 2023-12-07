import httpStatus from 'http-status';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.model';
import { TStudent } from './../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  //create a new user object

  const userData: Partial<TUser> = {};

  // if   !password, use default pass
  userData.password = password || (config.default_pass as string);

  //set std role
  userData.role = 'student';






const academicSemester = await AcademicSemester.findById(
  payLoad.academicSemester
)



const session =  await mongoose.startSession()
try {
  session.startTransaction();
   // Check if admissionSemester is null
   if (!academicSemester) {
    // Handle the case where admissionSemester is null (e.g., throw an error or handle accordingly)
    throw new AppError(httpStatus.NOT_FOUND,'Admission semester not found');
  }

userData.id = await generateStudentId(academicSemester);


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
  
} catch (err: any) {
   await session.abortTransaction()
  await session.endSession()
  throw new Error(err)

  
}


 
   
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.database_url as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
 
export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB
};
