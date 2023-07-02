import { Tool, Prisma } from "@prisma/client"

export interface IToolRepository{
    create: (data: Prisma.ToolCreateInput) => Promise<Tool>
    findAll: () => Promise<Tool[]>
    findById: (toolId: number) => Promise<Tool | null>
    findByTitle: (title: string) => Promise<Tool | null>
}
