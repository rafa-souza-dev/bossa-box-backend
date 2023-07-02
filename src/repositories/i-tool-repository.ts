import { Tool, Prisma } from "@prisma/client"

export interface IToolRepository{
    create: (data: Prisma.ToolUncheckedCreateInput) => Promise<Tool>
    findAll: () => Promise<Tool[]>
    findById: (toolId: number) => Promise<Tool | null>
}
