
import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';



const createAcademicSemester  = catchAsync(async (req, res) => {
  
  // creating schema using zod
// console.log(req.body);

  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await AcademicSemesterServices.createAcademicSemesterInDB(req.body)


     
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester is created successfully',
    data: result,
  });

})


const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
}

)
const getSingleAcademicSemester = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester retrieved  successfully',
    data: result,
  });
}
)


const updateAcademicSemester  = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester  updated successfully',
    data: result,
  });
})

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester
};
