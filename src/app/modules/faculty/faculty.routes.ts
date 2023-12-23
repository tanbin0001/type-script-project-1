import express from 'express';
import { updateFacultyValidationSchema } from './faculty.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', auth(USER_ROLE.admin, USER_ROLE.faculty),FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
