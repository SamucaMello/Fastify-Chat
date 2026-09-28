import {z} from "zod"

export const createRoomSchema = z.object({
    name: z.string().max(32).min(5),
    owner: z.number()
})
export type createRoomInput = z.infer<typeof createRoomSchema>

export const outRoomSchema = createRoomSchema.extend({
    id: z.number()
})
export type outRoom = z.infer<typeof outRoomSchema | undefined>  


export const updateRoomSchema = outRoomSchema
export type updateRoomInput = z.infer<typeof updateRoomSchema>