import { Prisma, Tool } from "@prisma/client";
import { IToolRepository } from "../i-tool-repository";
import { ITagRepository } from "../i-tag-repository";

export class ToolInMemoryRepository implements IToolRepository {
    private toolsData: Tool[] = []
    private toolsTagsData: {
        toolId: number;
        tagId: number;
    }[] = []

    constructor(
        private tagRepository: ITagRepository
    ) {}

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

    async findAll(slug: string = "") {
        if (slug === "") return this.toolsData

        const tag = await this.tagRepository.findBySlug(slug)

        if (!tag) {
            return []
        }

        const tagId = tag.id

        const filteredToolsIds = this.toolsTagsData.filter(toolsTagObject => toolsTagObject.tagId === tagId)
            .map(toolsTagObject => toolsTagObject.toolId)

        const tools = this.toolsData.filter(tool => filteredToolsIds.includes(tool.id))

        return tools
    }

    async findById(toolId: number) {
        const tool = this.toolsData.find(tool => tool.id === toolId)

        return tool || null
    }

    async findByTitle(title: string) {
        const tool = this.toolsData.find(tool => tool.title === title)

        return tool || null
    }

    async connectToolTag(toolId: number, tagId: number) {
        this.toolsTagsData.push({
            toolId,
            tagId
        })
    }

    async destroy(toolId: number) {
        this.toolsData = this.toolsData.filter(tool => tool.id !== toolId)
    }
}
