import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object(({
        name:z.string({invalid_type_error:'Academic Department must be string',
        required_error: 'Academic Department is required'

    }),
        academicFaculty: z.string({
            invalid_type_error:'Academic Department must be string',
            required_error: 'Academic Department is required'
        })
    }))

})

const updateAcademicDepartmentValidationSchema = z.object(({
    body: z.object(({
        name:z.string({invalid_type_error:'Academic Department must be string',
        required_error: 'Academic Department is required'

    }).optional(),
        academicFaculty: z.string({
            invalid_type_error:'Academic Department must be string',
            required_error: 'Academic Department is required'
        }).optional()
    }))

}))


export  const academicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}