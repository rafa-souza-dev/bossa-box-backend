import { FastifyInstance } from "fastify";
import { createToolController } from "./controllers/create-tool";
import { fetchToolsController } from "./controllers/fetch-tools";
import { destroyToolController } from "./controllers/destroy-tool";

export async function appRoutes(app: FastifyInstance) {
    app.post("/", createToolController)
    app.get("/", fetchToolsController)
    app.delete("/:id", destroyToolController)
}
