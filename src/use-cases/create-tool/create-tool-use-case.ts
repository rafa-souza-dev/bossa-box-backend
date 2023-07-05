import { IToolRepository } from "../../repositories/i-tool-repository";
import { CreateToolUseCaseRequest, CreateToolUseCaseResponse } from "./dtos";
import { ToolAlreadyExists } from "./errors";

export class CreateToolUseCase {
    constructor(
        private toolRepository: IToolRepository,
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

        const connectSlugs = slugs.map(slug => ({
            where: {
                slug
            },
            create: {
                slug
            }
        }))

        const newTool = await this.toolRepository.create({
            description: tool.description,
            link: tool.link,
            title: tool.title,
            tags: {
                connectOrCreate: connectSlugs
            }
        })

        return { tool: newTool }
    }
}
