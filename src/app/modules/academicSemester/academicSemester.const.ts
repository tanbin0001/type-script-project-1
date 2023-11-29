import { TAcademicSemesterCode, TAcademicSemesterName, TMonths, TacademicSemesterNameCodeMapper } from "./academicSemester.interface";

export const Months: TMonths[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
 export const AcademicSemestersName: TAcademicSemesterName[] = ['Autumn', 'Summer', 'Fall']
 export  const AcademicSemestersCode: TAcademicSemesterCode[] = ['01', '02', '03']



export const academicSemesterNameCodeMapper : TacademicSemesterNameCodeMapper = {
    Autumn : '01',
    Summer : '02',
    Fall : '03'
};