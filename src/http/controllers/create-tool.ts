import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
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
        const toolRepository = new ToolPrismaRepository()
        const createToolUseCase = new CreateToolUseCase(toolRepository)

        const { tool } = await createToolUseCase.handle({
            tool: {
                title,
                link,
                description
            },
            slugs: tags
        })

        const toolTagsSchema = z.object({
            id: z.number(),
            title: z.string(),
            description: z.string(),
            tags: z.array(z.object({
                slug: z.string()
            })).transform(tags => tags.map(tag => tag.slug))
        })

        const createdTool = toolTagsSchema.parse(tool)

        return res.status(201).send(createdTool)
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
