import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudents = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleFromDb = async (id: string) => {
  const result = await Student.findOne({ id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateStudentIntoDb = async (id: string, payLoad: Partial<TStudent>) => {
const {name, guardian,localGuardian, ...remainingStudentData} = payLoad;

const modifiedUpdatedData : Record<string, unknown> = {
 ...remainingStudentData 
}

if(name && Object.keys(name).length){
  for(const [key, value] of Object.entries(name)){
    modifiedUpdatedData[`name.${key}`] = value;
  }
}

if(guardian && Object.keys(guardian).length){
  for(const [key, value] of Object.entries(guardian)){
    modifiedUpdatedData[`guardian.${key}`] = value;
  }
}
if(localGuardian && Object.keys(localGuardian).length){
  for(const [key, value] of Object.entries(localGuardian)){
    modifiedUpdatedData[`localGuardian.${key}`] = value;
  }
}
console.log(modifiedUpdatedData,'from modified data');
  const result = await Student.findOneAndUpdate({ id },
    modifiedUpdatedData,
    {new: true, runValidators: true}
    )    
 
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST,'Failed to create a student')
  }
};

export const StudentServices = {
  getAllStudents,
  getSingleFromDb,
  updateStudentIntoDb,
  deleteStudentFromDB,
};
