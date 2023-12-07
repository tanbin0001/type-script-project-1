import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.const';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseInToDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

 
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const updateCourseInToDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
 

    //step:1 basic course info update
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, ' Failed to update course');
    }
    //check if there is any prerequisite data to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, ' Failed to update course');
      }
      // filter out the new added  fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, ' Failed to update course');
      }
      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );

      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, ' Failed to update course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};


const assignFacultiesWithCourseIntoDB =async (courseId:string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(courseId,
        {
            course: courseId,
            $addToSet: {faculties: {$each: payload}}
        }, {
            upsert: true,
            new: true,
        }
        )
        return result;
}
const removeFacultiesWithCourseFromDB =async (courseId:string, payload: Partial<TCourseFaculty>) => {
  console.log(courseId);
    const result = await CourseFaculty.findByIdAndUpdate(courseId,
        {
   $pull : {faculties: {$in : payload}}
        }, {
     
            new: true,
        }
        )
        return result;
}
export const CourseServices = {
  createCourseInToDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseInToDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseFromDB,
  deleteCourseFromDB,
};
