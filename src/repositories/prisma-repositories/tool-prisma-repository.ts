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

    async findAll() {
        const tools = await prisma.tool.findMany({
            include: {
                tags: {
                    select: {
                        slug: true
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
}
