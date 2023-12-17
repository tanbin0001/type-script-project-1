import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime, 
    endTime
  } = payload;
  // check if the semester  registration id is valid
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration not found');
  }
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found');
  }

  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // check if the department is belongs to the faculty
  const isDepartmentBelongsToFaculty = await AcademicDepartment.findOne({
      _id : academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongsToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isAcademicDepartmentExists.name} not belongs to ${isAcademicFacultyExists.name}`,
    );
  }

  // check the same course and section registered in the same semester

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section
  });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with section is already exists! `,
    );
  }


  //get the schedules of the faculties 
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {$in : days}
  }).select('days startTime endTime')

  const newSchedule ={
    days, startTime, endTime
  }
 if(hasTimeConflict(assignedSchedules, newSchedule)){
  throw new AppError(
    httpStatus.CONFLICT,
    `This faculty is not available at that time, please choose another date or time! `,
  );
 }


  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};



const  updateOfferedCourseIntoDB =async (id:string, payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>) => {

  const  {faculty, days, startTime, endTime} = payload
  const isOfferedCorseExists = await OfferedCourse.findById(id);

  if(!isOfferedCorseExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found')
  }
  const isFaculty = await Faculty.findById(faculty);

  if(!isFaculty){
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty  not found')
  }



  const semesterRegistration = isOfferedCorseExists.semesterRegistration; 

  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration);

  if(semesterRegistrationStatus?.status !== 'UPCOMING'){
    throw new AppError(httpStatus.BAD_REQUEST, `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`)

  }


   //get the schedules of the faculties 
   const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {$in : days}
  }).select('days startTime endTime')

  const newSchedule ={
    days, startTime, endTime
  }
 if(hasTimeConflict(assignedSchedules, newSchedule)){
  throw new AppError(
    httpStatus.CONFLICT,
    `This faculty is not available at that time, please choose another date or time! `,
  );
 }
 const result =await OfferedCourse.findByIdAndUpdate(id, payload, {new:true});
return result;

}

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB
};
