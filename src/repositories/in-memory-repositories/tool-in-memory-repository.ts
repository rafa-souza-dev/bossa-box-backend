import { Prisma, Tool } from "@prisma/client";
import { IToolRepository } from "../i-tool-repository";

export class ToolInMemoryRepository implements IToolRepository {
    private toolsData: Tool[] = []

    async create(data: Prisma.ToolUncheckedCreateInput) {
        const tool: Tool = {
            id: this.toolsData.length + 1,
            title: data.title,
            description: data.description,
            link: data.link
        }

        this.toolsData.push(tool)

        return tool
    }

    async findAll() {
        return this.toolsData
    }

    async findById(toolId: number) {
        const tool = this.toolsData.find(tool => tool.id === toolId)

        return tool || null
    }
}
