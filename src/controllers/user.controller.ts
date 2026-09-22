
import { type FastifyReply, type FastifyRequest } from 'fastify';

import type {  IdParamsInput,  RegisterUserInput, UpdateUserInput } from "../schemas/user.schema.js"
import type { PaginationInput } from '../schemas/pagination.schema.js';
import { UserService } from "../services/user.service.js"
import { StatusCodes } from "http-status-codes"

export class UserController {

    static async create(req:FastifyRequest<{Body: RegisterUserInput}>, reply:FastifyReply){
        console.log(req.body)
        const user = await UserService.create(req.body)
        return reply.status(StatusCodes.CREATED).send({
            message: "Usuário criado com sucesso",
            user
        })
        
    }

    static async delete(req:FastifyRequest<{Params: IdParamsInput}>, reply:FastifyReply){
        await UserService.delete(req.id)
        return reply.status(StatusCodes.OK).send({
            message: "Usuário apagado com sucesso"
        })
    }

    static async update(req:FastifyRequest<{Params: IdParamsInput, Body:UpdateUserInput}>, reply:FastifyReply){
        const user = await UserService.update(req.params.id, req.body)
        return reply.status(StatusCodes.OK).send({
            message: "Usuário atualizado com sucesso",
            user
        })

    }

    static async findAll(req:FastifyRequest<{Params: PaginationInput}>, reply:FastifyReply){
        const users = await UserService.findAll(req.params)
        return reply.status(StatusCodes.OK).send({
            users
        })
    }
    
    static async findById(req:FastifyRequest<{Params: IdParamsInput}>, reply:FastifyReply){
        const user  = await UserService.findById(req.params.id)
        return reply.status(StatusCodes.OK).send(user)
    }
}