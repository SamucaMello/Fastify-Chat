import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { registerSchema, updateSchema, idSchema } from "../schemas/user.schema.js";
import { UserController } from "../controllers/user.controller.js";
import { paginationSchema } from "../schemas/pagination.schema.js";


export const userRoutes: FastifyPluginAsyncZod = async (fastify) => {
    
    fastify.get("/",{
        schema: {querystring: paginationSchema}
    }, UserController.findAll)

    fastify.post("/",  {
        schema: {body:registerSchema}
    },
    UserController.create)

    fastify.get("/:id", {
        schema: {params: idSchema}
    },
     UserController.findById)

    fastify.put("/:id",{
        schema: {body: updateSchema}
    }, UserController.update)

}

