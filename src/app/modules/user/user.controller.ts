import httpStatus from 'http-status';

import { RequestHandler } from 'express';
 
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { UserService } from './user.service';
 


const createStudent: RequestHandler = catchAsync(async (req, res) => {
  
  // creating schema using zod

  const { password, student: studentData } = req.body;

  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await UserService.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is created successfully',
    data: result,
  });

})
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});



const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin
};
