import Fastify, { type FastifyInstance } from "fastify"

import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { PORT } from "./src/config/config.js";

import { mainRouter } from "./src/routes/router.js";
import swaggerUi from "@fastify/swagger-ui";
import swagger from "@fastify/swagger"

class App {
    private app: FastifyInstance

    constructor(opt = {useSwagger: true}) {
        this.app = Fastify().withTypeProvider<ZodTypeProvider>()
        this.app.setValidatorCompiler(validatorCompiler);
        this.app.setSerializerCompiler(serializerCompiler);

        if (opt.useSwagger){
            this.useSwagger()
        }
        this.registerRoutes()
    }

    private registerRoutes(){
        this.app.register(mainRouter, { prefix: "/" })
    }

    private async useSwagger() {
        await this.app.register(swagger, {
            openapi: {
                info: {
                    title: "Chat com TypeScript",
                    version: "1.0.0",
                },
            },
            transform: jsonSchemaTransform
        });

        await this.app.register(swaggerUi, {
            routePrefix: "/docs",
        });
    }


    public start() {
        try {
            this.app.listen({ port: PORT, host: "0.0.0.0" }, console.warn)
            console.warn(`Servidor iniciado na porta ${PORT}`)
        }
        catch (err) {
            this.app.log.error(err);
            process.exit(1);
        }
    }

}

const app = new App({useSwagger:true})
app.start()
