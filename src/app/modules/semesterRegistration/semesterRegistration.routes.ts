


import express from 'express';
import { SemesterRegistrationControllers } from './semesterRegistration.controllers';
// import { validateRequest } from '../../middlewares/validateRequest';
// import { SemesterRegistrationValidations } from './semesterRegistration.validation';
 
const router = express.Router();

// router.post('/create-semester-registration',validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema), SemesterRegistrationControllers.createSemester );
router.post('/create-semester-registration', SemesterRegistrationControllers.createSemester );
router.get('/', SemesterRegistrationControllers.getAllSemestersRegistrations );
router.get('/:id', SemesterRegistrationControllers.getSingleSemestersRegistration );
router.patch('/:id', SemesterRegistrationControllers.updateSemestersRegistration );
 

export const SemesterRegistrationRoutes = router;
