import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { IToolRepository } from "../i-tool-repository";

export class ToolPrismaRepository implements IToolRepository {
    async create(data: Prisma.ToolCreateInput) {
        const tool = await prisma.tool.create({
            data,
            include: {
                tags: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        return tool
    }

    async findAll(slug: string = "") {
        const tools = await prisma.tool.findMany({
            include: {
                tags: {
                    select: {
                        slug: true
                    }
                }
            },
            where: {
                tags: {
                    every: {
                        slug: {
                            contains: slug
                        }
                    }
                }
            }
        })

        return tools
    }

    async findById(toolId: number) {
        const tool = await prisma.tool.findUnique({
            where: {
                id: toolId
            },
            include: {
                tags: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        return tool || null
    }

    async findByTitle(title: string) {
        const tool = await prisma.tool.findUnique({
            where: {
                title
            }
        })

        return tool || null
    }

    async destroy(toolId: number) {
        await prisma.tool.delete({
            where: {
                id: toolId
            }
        })
    }
}
