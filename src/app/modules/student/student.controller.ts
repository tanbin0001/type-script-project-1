import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    console.log(studentData);
    // will call service () to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    //send res
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudenTs = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'got all students',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'got all students',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudenTs,
  getSingleStudent,
};
