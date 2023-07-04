import { FastifyInstance } from "fastify";
import { createToolController } from "./controllers/create-tool";

export async function appRoutes(app: FastifyInstance) {
    app.post("/", createToolController)
}
