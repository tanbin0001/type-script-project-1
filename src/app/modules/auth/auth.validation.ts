import { z } from "zod";





const loginValidationSchema = z.object({
    body: z.object({
        id:z.string({required_error:'Id is require'}),
        password:z.string({required_error:'Password is require'})
    })
})
const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({required_error: 'Old password is required'}),
        newPassword:z.string({required_error:'Password is require'})
    })
})

const refreshTokenValidation = z.object({
    cookies: z.object({
        refreshToken: z.string({required_error: 'Refresh token is required'})
    })              
})
const forgetPasswordValidationSchema  = z.object({
   body:z.object({
    id: z.string({required_error: 'User ID is required'})
   })
})
const resetPasswordValidationSchema  = z.object({
   body:z.object({
    id: z.string({required_error: 'User ID is required'}),
    newPassword: z.string({required_error: 'password is required'})
   })
})


export const AuthValidations = {
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidation,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema

}