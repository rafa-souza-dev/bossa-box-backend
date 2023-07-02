import { IToolRepository } from "../../repositories/i-tool-repository";
import { FetchToolsUseCaseRequest, FetchToolsUseCaseResponse } from "./dtos";

export class FetchToolsUseCase {
    constructor(
        private toolRepository: IToolRepository
    ) {}

    async handle({
        slug=""
    }: FetchToolsUseCaseRequest)
    : Promise<FetchToolsUseCaseResponse> {
        const tools = await this.toolRepository.findAll(slug)
        
        return { tools }
    }
}
