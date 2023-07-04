import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { TagPrismaRepository } from "../../repositories/prisma-repositories/tag-prisma-repository";
import { ToolPrismaRepository } from "../../repositories/prisma-repositories/tool-prisma-repository";
import { CreateToolUseCase } from "../../use-cases/create-tool/create-tool-use-case";
import { ToolAlreadyExists } from "../../use-cases/create-tool/errors";

export async function createToolController(req: FastifyRequest, res: FastifyReply) {
    const createToolValidationSchema = z.object({
        title: z.string().nonempty(),
        link: z.string().url(),
        description: z.string().nonempty(),
        tags: z.array(z.string()).nonempty()
    })

    const {
        title,
        link,
        description,
        tags
    } = createToolValidationSchema.parse(req.body)

    try {
        const tagRepository = new TagPrismaRepository()
        const toolRepository = new ToolPrismaRepository()
        const createToolUseCase = new CreateToolUseCase(
            toolRepository,
            tagRepository
        )

        const { tool } = await createToolUseCase.handle({
            tool: {
                title,
                link,
                description
            },
            slugs: tags
        })

        return res.status(201).send({
            id: tool.id,    
            title,
            link,
            description,
            tags
        })
    } catch (error) {
        console.log(error)
        if (error instanceof ToolAlreadyExists) {
            const message = error.message

            return res.status(400).send({
                message
            })
        }
    }
}
