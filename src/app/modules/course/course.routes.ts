
import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
 
const router = express.Router();
 

router.post('/create-course',
validateRequest(CourseValidations.createCourseValidationSchema), 
CourseControllers.createCourse)
router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
router.get('/:id', CourseControllers.getSingleCourse)
router.patch('/:courseId',  CourseControllers.assignFacultiesWithCourse)
router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse)
router.delete('/:courseId/remove-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.removeFacultiesWithCourse)
router.delete('/:id', CourseControllers.deleteCourse)


export const CourseRoutes = router;
 