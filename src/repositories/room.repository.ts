import { eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { rooms } from "../database/schema.js";
import { outRoomSchema, type createRoomInput, type outRoom, type updateRoomInput } from "../schemas/room.schema.js";
import type { PaginationInput } from "../schemas/pagination.schema.js";

export class RoomRepository {
    static  async create(data:createRoomInput): Promise<outRoom> {
        const [room] = await db.insert(rooms).values(data).returning()
        return room
    }

    static async  findById(id: any) : Promise<outRoom> {
        const [room] = await db.select().from(rooms).where(eq(rooms.id, id))
        return room
    }

    static async  findAll(pagination: PaginationInput) : Promise<outRoom[]> {
        const offset = ( pagination.page - 1 ) * pagination.limit
        return await db.select().from(rooms).offset(offset).limit(pagination.limit)
    }

     static async  delete(id:any) : Promise<outRoom> {
        const [deletedRoom] =  await db.delete(rooms).where(eq(rooms.id, id)).returning()
        return deletedRoom
    }

    static async update(id:any, data:updateRoomInput): Promise<outRoom> {
        const [updatedRoom] =  await db.update(rooms).set(data).where(eq(rooms.id, id)).returning()
        return updatedRoom
    }
}