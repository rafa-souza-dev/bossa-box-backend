import { IToolRepository } from "../../repositories/i-tool-repository";
import { DestroyToolUseCaseRequest, DestroyToolUseCaseResponse } from "./dtos";
import { ToolDoesNotExist } from "./errors";

export class DestroyToolUseCase {
    constructor(
        private toolRepository: IToolRepository
    ) {}

    async handle({
        toolId
    }: DestroyToolUseCaseRequest)
    : DestroyToolUseCaseResponse {
        const toolNonexistent = !!(await this.toolRepository.findById(toolId)) === false

        if (toolNonexistent) {
            throw new ToolDoesNotExist()
        }

        await this.toolRepository.destroy(toolId)
    }
}
