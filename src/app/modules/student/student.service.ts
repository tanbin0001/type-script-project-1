import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchAbleFields } from './student.const';

const getAllStudents = async (query: Record<string, unknown>) => {

//   let searchTerm = '';

//   if (query.searchTerm) {
//     searchTerm = query?.searchTerm as string;
//   }

//   const searchQuery = Student.find({
//     $or: studentSearchAbleFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });

//   const excludeFields = ['searchTerm', 'sort', 'limit', 'page','fields'];
//   excludeFields.forEach((el) => delete queryObj[el]);
 

//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate('academicSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//   let sort = '-createdAt';
//   if (query.sort) {
//     sort = query.sort as string;
//   }

// const sortQuery =  filterQuery.sort(sort)

// let page = 1;
// let limit =1;
// let skip =0;

// if(query.limit){
//   limit = Number( query.limit) 
//   }

// if(query.page) {
//   page = Number(query.page)
//   skip = (page-1)*limit
// }

// const paginateQuery = sortQuery.skip(skip)


// const limitQuery =   paginateQuery.limit(limit)


// //field limiting 
// let fields = '-__v';

// if(query.fields){
//   fields = (query.fields as string).split(',').join(' ')
// }
// const fieldQuery = await limitQuery.select(fields)

//   return fieldQuery;

const studentQuery = new QueryBuilder(Student.find()

.populate('academicSemester')
.populate({
  path: 'academicDepartment',
  populate: {
    path: 'academicFaculty',
  },
})
,query).search(studentSearchAbleFields).filter().sort().paginate().fields();

const result = await studentQuery.modelQuery ;
const meta = await studentQuery.countTotal();
return {
  result,
  meta
};
};

const getSingleFromDb = async (id: string) => {
  const result = await Student.findOne({ id: id })

    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};
const updateStudentIntoDb = async (id: string, payLoad: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

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
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a student');
  }
};

export const StudentServices = {
  getAllStudents,
  getSingleFromDb,
  updateStudentIntoDb,
  deleteStudentFromDB,
};

