import express from 'express';
import { StudentControllers } from './student.controller';
import { validateRequest } from '../../middlewares/validateRequest';

import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

// this will call controller function

router.get('/', auth('admin', 'student', 'faculty'),StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);
// router.patch('/:studentId', StudentControllers.updateStudent);
router.patch('/:studentId',validateRequest(studentValidations.updateStudentValidationSchema), StudentControllers.updateStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentsRoutes = router;
