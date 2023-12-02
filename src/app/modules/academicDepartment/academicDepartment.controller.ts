
import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';
 


const createAcademicDepartment  = catchAsync(async (req, res) => {
  
  // creating schema using zod
// console.log(req.body);

  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await AcademicDepartmentServices.createAcademicDepartmentInDB(req.body)


     
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic department is created successfully',
    data: result,
  });

})


const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicFacultiesFromDB();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments are retrieved successfully',
    data: result,
  });
}

)
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await AcademicDepartmentServices.getSingleAcademicFacultiesFromDB(id );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department retrieved  successfully',
    data: result,
  });
}
)


const updateAcademicDepartment  = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department  updated successfully',
    data: result,
  });
})

export const AcademicDepartmentControllers = {
     createAcademicDepartment,
    getAllAcademicFaculties,
    getSingleAcademicDepartment,
    updateAcademicDepartment
};
