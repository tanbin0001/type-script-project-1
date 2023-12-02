import { UserControllers } from './user.controller';
import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
 

const router = express.Router();

// this will call controller function
router.post(
  '/create-student',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
