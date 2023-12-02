
import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';



const createAcademicFaculty  = catchAsync(async (req, res) => {
  
  // creating schema using zod
// console.log(req.body);

  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await AcademicFacultyServices.createAcademicFacultyInDB(req.body)


     
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculty is created successfully',
    data: result,
  });

})


const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic facultys are retrieved successfully',
    data: result,
  });
}

)
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await AcademicFacultyServices.getSingleAcademicFacultiesFromDB(id );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty retrieved  successfully',
    data: result,
  });
}
)


const updateAcademicFaculty  = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty  updated successfully',
    data: result,
  });
})

export const AcademicFacultyControllers = {
     createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
};
