/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// import studentValidationSchema from './student.validation';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudents();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'got all students',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleFromDb(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'got one student',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudenTs: getAllStudents,
  getSingleStudent,
};
