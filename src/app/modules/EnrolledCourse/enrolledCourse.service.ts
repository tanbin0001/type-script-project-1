/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import EnrolledCourse from "./enrolledCourse.model";
import { Student } from "../student/student.model";
import mongoose from "mongoose";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { calculateGradeAndPoints } from "./enrolledCourse.utils";

 
const createEnrolledCourseIntoDB = async (userId:string, payload: TEnrolledCourse) => {
 
  const {offeredCourse } = payload;
 
 
  const isOfferedCourseExists =  await  OfferedCourse.findById(offeredCourse);
  if(!isOfferedCourseExists){
    throw new AppError(httpStatus.NOT_FOUND, 'This course not exists')
  };

  const course = await Course.findById(isOfferedCourseExists.course)


  if(isOfferedCourseExists.maxCapacity <=0){
    throw new AppError(httpStatus.BAD_REQUEST, 'No room left')
  };


  

  const student =  await Student.findOne({id:userId},{_id:1}) 


  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });




  if(isStudentAlreadyEnrolled){
    throw new AppError(httpStatus.CONFLICT, 'This course is already enrolled')
  };



  //CHECK total credits 
 
  const semesterRegistration = await SemesterRegistration.findById(isOfferedCourseExists.semesterRegistration).select('maxCredit');
 

  const enrolledCourse = await EnrolledCourse.aggregate([
    {$match: {
      semesterRegistration: isOfferedCourseExists.semesterRegistration,
      student:  student?._id
    },
  }
  ,{
    $lookup:{
      from:'courses',
      localField: 'course',
      foreignField:'_id',
      as:'enrolledCourseData'
    }
  },
  {
    $unwind: '$enrolledCourseData'
  },
  {
    $group: {_id: null, totalEnrolledCredits: {$sum:"$enrolledCourseData.credits"}}
  }
  ])
  console.log(enrolledCourse);
const totalCredits = enrolledCourse.length>0 ? enrolledCourse[0].totalEnrolledCredits: 0;
if(totalCredits && semesterRegistration?.maxCredit && totalCredits + course?.credits >  semesterRegistration?.maxCredit ){
  throw new AppError(httpStatus.BAD_REQUEST,'You have exceeded max number of credits')
}


const session = await mongoose.startSession();
try {
    session.startTransaction();
  const result = await EnrolledCourse.create([{
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
  academicSemester: isOfferedCourseExists.academicSemester,
  academicFaculty: isOfferedCourseExists.academicFaculty,
  academicDepartment: isOfferedCourseExists.academicDepartment,
  offeredCourse: offeredCourse,
  course: isOfferedCourseExists.course,
  student: student?._id,
  faculty: isOfferedCourseExists.faculty,
  isEnrolled:true,
  }],{session}) 
if(!result){
  throw new AppError(httpStatus.BAD_REQUEST,'Failed to enroll in this course!')
}


const maxCapacity = isOfferedCourseExists.maxCapacity;
await OfferedCourse.findByIdAndUpdate(offeredCourse,{maxCapacity: maxCapacity-1})

await session.commitTransaction();
await session.endSession();
  return result;
} catch (err: any) {
  await session.abortTransaction();
  await session.endSession();
  throw new Error(err);
}
};
const updateEnrolledCourseMarksIntoDB = async (payload: Partial<TEnrolledCourse>, facultyId:string) => {
  const {semesterRegistration,offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExists =  await  SemesterRegistration.findById(semesterRegistration);

  if(!isSemesterRegistrationExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Semester does  not exists')
  };

  const isOfferedCourseExists =  await  OfferedCourse.findById(offeredCourse);
  if(!isOfferedCourseExists){
    throw new AppError(httpStatus.NOT_FOUND, 'This course not exists')
  };
  const isStudentExists =  await  Student.findById(student);
  if(!isStudentExists){
    throw new AppError(httpStatus.NOT_FOUND, 'This Student is not exists')
  };


  const faculty = await Faculty.findOne({id:facultyId},{_id:1})


  if(!faculty){
    throw new AppError(httpStatus.NOT_FOUND, 'This faculty is not exists')
  };

  const isCourseBelongsToTheFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id
  })
  if(!isCourseBelongsToTheFaculty){
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
  };


  const modifiedData : Record<string, unknown> = {
    ...courseMarks
  };


if(courseMarks?.finalTerm){
  const {classTest1,classTest2,midTerm,finalTerm} = isCourseBelongsToTheFaculty.courseMarks;



  const totalMarks = Math.ceil(classTest1 * 0.1) +Math.ceil(midTerm * 0.3) + Math.ceil(classTest2 * 0.1)+Math.ceil(finalTerm * 0.5)

 const result = calculateGradeAndPoints(totalMarks)
 modifiedData.grade = result.grade;
 modifiedData.gradePoints = result.gradePoints;
 modifiedData.isCompleted = true;

}

 
  if(courseMarks && Object.keys(courseMarks).length){
    for(const [key, value] of Object.entries(courseMarks)){
      modifiedData[`courseMarks.${key}`] = value;
    }
  }


  const result = await EnrolledCourse.findByIdAndUpdate(isCourseBelongsToTheFaculty._id,modifiedData,{new:true})


  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
