
import { type FastifyReply, type FastifyRequest } from 'fastify';

import {  safeUserSchema, updateSchema, type IdQuerySchema, type RegisterUserInput, type updateUserInput } from "../schemas/user.schema.js"
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

    static async delete(req:FastifyRequest<{Params: IdQuerySchema}>, reply:FastifyReply){
        await UserService.delete(req.params.id)
        return reply.status(StatusCodes.OK).send({
            message: "Usuário apagado com sucesso"
        })
    }

    static async update(req:FastifyRequest<{Params: IdQuerySchema, Body:updateUserInput}>, reply:FastifyReply){
        const user = await UserService.update(req.params.id, req.body)

        return reply.status(StatusCodes.OK).send({
            message: "Usuário atualizado com sucesso",
            user
        })

    }
    
    static async getById(req:FastifyRequest<{Params: IdQuerySchema}>, res:FastifyReply){
        const user  = await UserService.getById(req.params.id)
        return res.status(StatusCodes.OK).send(user)
    }
}