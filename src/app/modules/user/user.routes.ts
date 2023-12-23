import { UserControllers } from './user.controller';
import express, { NextFunction, Request, Response } from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { AdminValidations } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.const';
import { upload } from '../../utils/sendImageToCloudinary';
import { studentValidations } from '../student/student.validation';
 

const router = express.Router();

// this will call controller function
router.post(
  '/create-student',
  auth(USER_ROLE.admin),upload.single('file'),(req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next()
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post( 
  '/create-faculty',
  auth(USER_ROLE.admin),upload.single('file'),(req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next()
  },
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',upload.single('file'),(req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next()
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.get(
  '/me',
  auth('student','admin','faculty'),
  UserControllers.getMe,
);

router.post(
  '/change-status/:id', auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);


export const UserRoutes = router;
    