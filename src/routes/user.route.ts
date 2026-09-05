import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { registerSchema, updateSchema } from "../schemas/user.schema.js";
import { UserController } from "../controllers/user.controller.js";


export const userRoutes: FastifyPluginAsyncZod = async (fastify) => {
    
    fastify.get("/",()=>{})

    fastify.post("/",  {
        schema: {body:registerSchema}
    },
    UserController.create)

    fastify.get("/:id", UserController.getById)

    fastify.put("/:id",{
        schema: {body: updateSchema}
    }, UserController.update)

}

