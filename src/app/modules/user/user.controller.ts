import httpStatus from 'http-status';

import { RequestHandler } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';



const createStudent: RequestHandler = catchAsync(async (req, res) => {
  
  // creating schema using zod

  const { password, student: studentData } = req.body;

  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await UserService.createStudentIntoDB(password, studentData);

  //send res
  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is created successfully',
    data: result,
  });

})

export const UserControllers = {
  createStudent,
};
