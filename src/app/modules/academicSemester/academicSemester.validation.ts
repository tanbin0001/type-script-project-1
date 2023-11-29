import { z } from "zod";
import { AcademicSemestersCode, AcademicSemestersName, Months } from "./academicSemester.const";

const createAcademicSemesterValidationSchema = z.object(({
    body: z.object({
        name:z.enum([...AcademicSemestersName] as [string, ...string[]]),
        code:z.enum([...AcademicSemestersCode] as [string, ...string[]]),
        year: z.string(),
        startMonth: z.enum([...Months] as [string, ...string[]]),
        endMonth: z.enum([...Months] as [string, ...string[]])
    }),
   
    



}))

const updateAcademicSemesterValidationSchema = z.object(({
    body: z.object({
        name:z.enum([...AcademicSemestersName] as [string, ...string[]]).optional(),
        code:z.enum([...AcademicSemestersCode] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
        endMonth: z.enum([...Months] as [string, ...string[]]).optional()
    }),
   
    



}))


export  const AcademicSemesterValidation = {
   createAcademicSemesterValidationSchema,
   updateAcademicSemesterValidationSchema
}