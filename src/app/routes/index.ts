import { Router } from "express";
import { StudentsRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.routes";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";

const router = Router();

const moduleRoutes = [
    {
        path:"/users",
        route: UserRoutes,
    },
    {
        path:"/students",
        route: StudentsRoutes,
    },
    {
        path:"/academic-semester",
        route: AcademicSemesterRoutes,
    },
    {
        path:"/academic-faculties",
        route: AcademicFacultyRoutes,
    },
    {
        path:"/academic-departments",
        route: AcademicDepartmentRoutes,
    },
    
]


moduleRoutes.forEach(route => {
    router.use(route.path,route.route)
});
 

export default router;