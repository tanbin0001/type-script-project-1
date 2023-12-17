import { Router } from "express";
import { StudentsRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.routes";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { CourseRoutes } from "../modules/course/course.routes";
import { FacultyRoutes } from "../modules/faculty/faculty.routes";
import { SemesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.routes";
import { offeredCourseRoutes } from "../modules/offeredCourse/offeredCourse.routes";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { AuthRoutes } from "../modules/auth/auth.routes";

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
        path: '/faculties',
        route: FacultyRoutes ,
      },
      {
        path: '/admins',
        route: AdminRoutes,
      },
      {
        path: '/auth',
        route: AuthRoutes,
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
    {
        path:"/semester-registrations",
        route: SemesterRegistrationRoutes,
    },
    {
        path:"/courses",
        route: CourseRoutes,
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes,
      },
    
]


moduleRoutes.forEach(route => {
    router.use(route.path,route.route)
});
 

export default router;