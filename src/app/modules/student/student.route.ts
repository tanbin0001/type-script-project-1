import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// this will call controller function

router.get('/', StudentControllers.getAllStudenTs);

router.get('/:studentId', StudentControllers.getSingleStudent);

export const StudentsRoutes = router;
