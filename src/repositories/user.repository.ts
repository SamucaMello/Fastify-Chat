import { users } from "../database/schema.js";
import { db } from "../database/index.js";
import type { RegisterUserInput, SafeUser, UpdateUserInput } from "../schemas/user.schema.js";
import { eq } from "drizzle-orm";
import type { PaginationInput } from "../schemas/pagination.schema.js";


const safeFields = {
    id: users.id,
    name: users.name,
    email: users.email,
    createdAt: users.createdAt,
};

type User = typeof users.$inferInsert;

export class UserRepository {

    static async findAll(pagination: PaginationInput): Promise<SafeUser[]>{
        const offset = (pagination.page - 1) * pagination.limit
        return await db.select(safeFields).from(users).limit(pagination.limit).offset(offset)

    }

    static async findById(id: number): Promise<SafeUser | undefined> {
        const [user] = await db
            .select(safeFields)
            .from(users)
            .where(eq(users.id, id));
        return user;
    }

    static async create(data: RegisterUserInput): Promise<SafeUser | undefined> {
        const [user] = await db.insert(users).values(data).returning()
        return user
    }

    static async update(id:number , data: UpdateUserInput): Promise<SafeUser | undefined>{
        const [updatedUser] = await db.update(users).set(data).where(eq(users.id, id)).returning()
        return updatedUser
    }

    static async delete(id:number): Promise<SafeUser | undefined> {
        const [deletedUser] = await db.delete(users).where(eq(users.id, id)).returning()
        return deletedUser
    }

    static async getByEmail(email:string):Promise<SafeUser | undefined> {
        const [user] = await db.select().from(users).where(eq(users.email, email))
        return user
    }
}

