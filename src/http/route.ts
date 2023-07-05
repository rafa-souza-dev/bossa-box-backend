import { FastifyInstance } from "fastify";
import { createToolController } from "./controllers/create-tool";
import { fetchToolsController } from "./controllers/fetch-tools";

export async function appRoutes(app: FastifyInstance) {
    app.post("/", createToolController)
    app.get("/", fetchToolsController)
}
