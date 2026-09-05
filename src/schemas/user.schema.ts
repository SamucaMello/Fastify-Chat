

import {z} from "zod"

export const registerSchema = z.object({
    name: z.string().min(1).max(32),
    email: z.email().max(45),
    password: z.string().min(8)
})
export type RegisterUserInput = z.infer<typeof registerSchema>




export const loginSchema = z.object({
    email: z.email().min(1).max(45),
    password: z.string()
})
export type LoginUserInput = z.infer<typeof loginSchema>



export const idSchema = z.object({
    id: z.number()
})
export type IdQuerySchema = z.infer<typeof idSchema>




export const updateSchema = z.object({
    email: z.email().min(1).max(45),
    name:  z.string().min(1).max(32)
})
export type updateUserInput = z.infer<typeof updateSchema>




export const safeUserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    createdAt: z.date()
})