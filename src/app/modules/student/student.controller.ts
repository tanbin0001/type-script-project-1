/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// import studentValidationSchema from './student.validation';

const getAllStudents = catchAsync(async (req, res) => {
 
  const result = await StudentServices.getAllStudents(req.query);
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




const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  console.log(studentId);
  const {student} = req.body
  console.log(student);
  const result = await StudentServices.updateStudentIntoDb(studentId, student);
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});
export const StudentControllers = {
 getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
};
