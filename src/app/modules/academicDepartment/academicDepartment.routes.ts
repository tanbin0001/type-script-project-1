
import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';


const router = express.Router();
 

router.post('/create-academic-department',validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentControllers.createAcademicDepartment)
router.get('/', AcademicDepartmentControllers.getAllAcademicFaculties)
router.get('/:id', AcademicDepartmentControllers.getSingleAcademicDepartment)
router.patch('/:id',validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment)

export const AcademicDepartmentRoutes = router;
