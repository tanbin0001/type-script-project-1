
import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
 

const router = express.Router();
 

router.post('/create-academic-faculty',validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty)
router.get('/', AcademicFacultyControllers.getAllAcademicFaculties)
router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty)
router.patch('/:id',validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)

export const AcademicFacultyRoutes = router;
