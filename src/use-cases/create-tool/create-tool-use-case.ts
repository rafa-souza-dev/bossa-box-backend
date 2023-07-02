import { ITagRepository } from "../../repositories/i-tag-repository";
import { IToolRepository } from "../../repositories/i-tool-repository";
import { CreateToolUseCaseRequest, CreateToolUseCaseResponse } from "./dtos";
import { ToolAlreadyExists } from "./errors";

export class CreateToolUseCase {
    constructor(
        private toolRepository: IToolRepository,
        private tagRepository: ITagRepository
    ) {}

    async handle({
        tool,
        slugs
    }: CreateToolUseCaseRequest)
    : Promise<CreateToolUseCaseResponse> {
        const toolAlreadyExists = !!(await this.toolRepository.findByTitle(tool.title))

        if (toolAlreadyExists) {
            throw new ToolAlreadyExists()
        }

        const tags = await this.tagRepository.findManyBySlugOrCreate(slugs)

        const newTool = await this.toolRepository.create({
            description: tool.description,
            link: tool.link,
            title: tool.title,
            tags: {
                connect: tags
            }
        })

        return { tool: newTool }
    }
}
