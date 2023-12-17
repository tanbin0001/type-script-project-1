import { z } from "zod";





const loginValidationSchema = z.object({
    body: z.object({
        id:z.string({required_error:'Id is require'}),
        password:z.string({required_error:'Password is require'})
    })
})


export const AuthValidations = {
    loginValidationSchema
}