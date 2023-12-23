import httpStatus from 'http-status';

import { RequestHandler } from 'express';
 
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { UserService } from './user.service';

 


const createStudent: RequestHandler = catchAsync(async (req, res) => {
 
  
  // creating schema using zod

  const { password, student: studentData } = req.body;


  const result = await UserService.createStudentIntoDB(req.file, password, studentData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is created successfully',
    data: result,
  });

})
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(req.file,password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});



const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  console.log(req.file,'++++++++++++++++++++++++++');
  const result = await UserService.createAdminIntoDB(req.file,password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {

  const {userId,role} = req.user;

  const result = await UserService.getMe(userId, role);



  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your Data retrieved  successfully',
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {

const id  = req.params.id;
  const result = await UserService.changeStatus(id, req.body);



  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status updated  successfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus
};
