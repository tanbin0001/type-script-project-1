import { UserControllers } from './user.controller';
import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { AdminValidations } from '../Admin/admin.validation';
 

const router = express.Router();

// this will call controller function
router.post(
  '/create-student',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);


export const UserRoutes = router;
    