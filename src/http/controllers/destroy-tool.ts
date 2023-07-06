import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ToolPrismaRepository } from "../../repositories/prisma-repositories/tool-prisma-repository";
import { DestroyToolUseCase } from "../../use-cases/destroy-tool/delete-tool-use-case";
import { ToolDoesNotExist } from "../../use-cases/destroy-tool/errors";

export async function destroyToolController(req: FastifyRequest, res: FastifyReply) {
    const destroyToolValidationSchema = z.object({
        id: z.coerce.number().int()
    })
    
    const { id } = destroyToolValidationSchema.parse(req.params)

    try {
        const toolRepository = new ToolPrismaRepository()
        const destroyToolUseCase = new DestroyToolUseCase(toolRepository)

        await destroyToolUseCase.handle({ toolId: id })

        return res.status(204).send()
    } catch (error) {
        if (error instanceof ToolDoesNotExist) {
            const message = error.message

            return res.status(400).send({ message })
        }
    }
}
