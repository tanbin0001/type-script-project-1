import express from 'express';
import { updateFacultyValidationSchema } from './faculty.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controllers';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
