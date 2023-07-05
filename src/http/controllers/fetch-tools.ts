import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ToolPrismaRepository } from "../../repositories/prisma-repositories/tool-prisma-repository";
import { FetchToolsUseCase } from "../../use-cases/fetch-tools/fetch-tools-use-case";

export async function fetchToolsController(req: FastifyRequest, res: FastifyReply) {
    const fetchToolsValidationSchema = z.object({
        tag: z.string().optional()
    })

    const { tag } = fetchToolsValidationSchema.parse(req.query)

    const toolRepository = new ToolPrismaRepository()
    const fetchToolsUseCase = new FetchToolsUseCase(toolRepository)

    const { tools } = await fetchToolsUseCase.handle({
        slug: tag
    })

    const toolsTagsSchema = z.array(z.object({
        id: z.number(),
        title: z.string(),
        link: z.string(),
        description: z.string(),
        tags: z.array(z.object({
            slug: z.string()
        })).transform(tags => tags.map(tag => tag.slug))
    }))

    const fetchedTools = toolsTagsSchema.parse(tools)

    return res.status(200).send(fetchedTools)
}
