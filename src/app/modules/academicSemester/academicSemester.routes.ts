import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controllers';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// this will call controller function

// router.get('/', StudentControllers.getAllStudenTs);

// router.get('/:studentId', StudentControllers.getSingleStudent);

router.post('/create-academic-semester',
// validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema),
 AcademicSemesterControllers.createAcademicSemester)
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester)
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester)
router.patch('/:id',validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidationSchema), AcademicSemesterControllers.updateAcademicSemester)

export const AcademicSemesterRoutes = router;
