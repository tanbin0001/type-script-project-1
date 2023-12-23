
import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
import auth from '../../middlewares/auth';

const router = express.Router();
 

router.post('/create-course',auth('admin'),
validateRequest(CourseValidations.createCourseValidationSchema), 
CourseControllers.createCourse)
router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
router.get('/:id', CourseControllers.getSingleCourse)
router.patch('/:courseId', auth('admin'), CourseControllers.assignFacultiesWithCourse)
router.put('/:courseId/assign-faculties', auth('admin'), validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse)
router.delete('/:courseId/remove-faculties',auth('admin'), validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.removeFacultiesWithCourse)
router.delete('/:id', CourseControllers.deleteCourse)


export const CourseRoutes = router;
 