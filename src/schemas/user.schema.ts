import { z } from "zod"

const baseFields = {
    name : z.string().min(1).max(32),
    email : z.email().max(45)
}


export const registerSchema = z.object({
    ...baseFields,
    password: z.string().min(8),
})
export type RegisterUserInput = z.infer<typeof registerSchema>



export const loginSchema = z.object({
    email: baseFields.email,
    password: z.string().min(1), 
})
export type LoginUserInput = z.infer<typeof loginSchema>



export const idSchema = z.object({
    id: z.coerce.number().int().positive(),
})
export type IdParamsInput = z.infer<typeof idSchema>



export const updateSchema = z.object(baseFields).partial() 
export type UpdateUserInput = z.infer<typeof updateSchema>


export const safeUserSchema = z.object({
    id: z.number(),
    ...baseFields,
    createdAt: z.date(),
})
export type SafeUser = z.infer<typeof safeUserSchema>