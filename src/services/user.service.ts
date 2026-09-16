
import {type RegisterUserInput, type SafeUser, type UpdateUserInput } from "../schemas/user.schema.js";
import { ApplicationError } from "../errors/application.error.js";
import { AuthService } from "./auth.service.js";
import { UserRepository } from "../repositories/user.repository.js";
import type { PaginationInput } from "../schemas/pagination.schema.js";


export class UserService {

    static async create(data:RegisterUserInput) {
        if (await UserRepository.getByEmail(data.email) ) 
            throw new ApplicationError("Alguém já possui esse e-mail");

        data.password = await AuthService.hashPassword(data.password)
        return await UserRepository.create(data)
    }

    static async delete (id:any) {
        return await UserRepository.delete(id)
    }

    static async findAll(pagination:PaginationInput){
        return await UserRepository.findAll(pagination)
    }

    static async findById(id:any){
        return await UserRepository.findById(id)
    }
    
    static async update(id:any, updates:UpdateUserInput) {
        if (await UserRepository.getByEmail(updates.email!))
            throw new ApplicationError("Alguém já possui esse e-mail");
        return await UserRepository.update(id, updates)
    }



}