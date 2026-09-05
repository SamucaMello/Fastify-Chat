import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { userRoutes } from "./user.route.js";




export const mainRouter: FastifyPluginAsyncZod = async (fastify) => {
    fastify.register(userRoutes, {prefix : "/user"})
} 