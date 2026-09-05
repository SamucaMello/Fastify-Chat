import { eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { users } from "../database/schema.js";
import {safeUserSchema, type RegisterUserInput, type updateUserInput } from "../schemas/user.schema.js";
import { ApplicationError } from "../errors/application.error.js";
import { AuthService } from "./auth.service.js";


export class UserService {
    static toSafeUser(data:object){
        return safeUserSchema.parse(data)
    }

    static async create(data:RegisterUserInput) {
        if ( await this.getByEmail(data.email) ){
            throw new ApplicationError("Alguém já possui esse e-mail")
        }
        data.password = await AuthService.hashPassword(data.password)
        const [user] = await db.insert(users).values(data).returning()
        return this.toSafeUser(user!)
        
    }

    static async delete (id:any) {
        const user = await db.delete(users).where(eq(users.id, id)).returning()
        return this.toSafeUser(user)
    }

    static async getByEmail(email:string) {
        const [user] = await db.select().from(users).where(eq(users.email, email))
        return user
    }

    static async getById(id:any){
        const [user] = await db.select().from(users).where(eq(users.id, id))
        if (!user) throw new ApplicationError("Usuário não encontrado")
        return this.toSafeUser(user)
    }
    
    static async update(id:any, updates:updateUserInput){
        if ( await this.getByEmail(updates.email) ) throw new ApplicationError("Esse e-mail já está sendo usado")
        const updtUser = await db.update(users).set(updates).where(eq(users.id, id)).returning()

        return this.toSafeUser(updtUser)
    }



}