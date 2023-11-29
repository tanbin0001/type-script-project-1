import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.model';
import { TStudent } from './../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  //create a new user object

  const userData: Partial<TUser> = {};

  // if   !password, use default pass
  userData.password = password || (config.default_pass as string);

  //set std role
  userData.role = 'student';






const admissionSemester = await AcademicSemester.findById(
  payLoad.admissionSemester
)
  //manually  generated id

    // Check if admissionSemester is null
    if (!admissionSemester) {
      // Handle the case where admissionSemester is null (e.g., throw an error or handle accordingly)
      throw new Error('Admission semester not found');
    }

  userData.id = await generateStudentId(admissionSemester);

  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    payLoad.id = newUser.id;

    payLoad.user = newUser._id; //refer id
    const newStudent = await Student.create(payLoad);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
