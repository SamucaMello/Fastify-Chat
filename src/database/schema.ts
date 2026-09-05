import { integer, serial, timestamp, varchar, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length:32}).notNull(),
    email: varchar('email', { length: 45}).notNull().unique(),
    password: varchar("password", {length:60}).notNull(),           //limite de 60 por conta do bcrypt 
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const rooms = pgTable("rooms", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length:32}).notNull(),
    owner: integer("owner_id").notNull().references(()=>users.id, {onDelete:"cascade"})
})

export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    content: varchar("content", {length: 255}).notNull(),
    userId: integer("user_id").notNull().references( ()=>users.id, {onDelete: "cascade"} ), //p deletar as msgs qnd o usuario for apagado
    createdAt: timestamp('created_at').defaultNow().notNull(),
    room: integer("room_id").notNull().references(()=>rooms.id, {onDelete:"cascade"})
})