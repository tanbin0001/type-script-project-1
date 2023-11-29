import { Router } from "express";
import { StudentsRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.routes";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";

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
    
]


moduleRoutes.forEach(route => {
    router.use(route.path,route.route)
});
 

export default router;