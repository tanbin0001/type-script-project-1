import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { EnrolledCourseServices } from './enrolledCourse.service';
import sendResponse from '../../utils/sendResponse';


const createEnrolledCourse = catchAsync(async (req, res) => {
 
  const userId = req.user.userId;
 const result =  await EnrolledCourseServices.createEnrolledCourseIntoDB(userId,req.body) 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled succesfully',
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
 
const facultyId = req.user.userId;
const result =  await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(req.body,facultyId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks is updated succesfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
