
import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';
 


const createCourse  = catchAsync(async (req, res) => {
  

  const result = await CourseServices.createCourseInToDB(req.body)


     
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course   is created successfully',
    data: result,
  });

})


const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
}

)
const getSingleCourse = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrieved  successfully',
    data: result,
  });
}
)
const deleteCourse = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await CourseServices.deleteCourseFromDB(id );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted  successfully',
    data: result,
  });
}
)
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
const {courseId} = req.params;
console.log(courseId);
const {faculties} = req.body;
console.log(faculties);


  const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties );
  console.log({result});
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is assigned  successfully',
    data: result,
  });
}
)
const removeFacultiesWithCourse = catchAsync(async (req, res) => {
const {courseId} = req.params;
const {faculties} = req.body;
console.log(courseId);
const result = await CourseServices.removeFacultiesWithCourseFromDB(courseId, faculties );
console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is removed  successfully',
    data: result,
  });
}
)


const updateCourse  = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await CourseServices.updateCourseInToDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course  updated successfully',
    data: result,
  });
})

export const CourseControllers = {
     createCourse,
     getAllCourses,
  getSingleCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse,
  deleteCourse
   
};
