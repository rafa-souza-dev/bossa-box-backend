import { IToolRepository } from "../../repositories/i-tool-repository";
import { FetchToolsUseCaseRequest, FetchToolsUseCaseResponse } from "./dtos";

export class FetchToolsUseCase {
    constructor(
        private toolRepository: IToolRepository
    ) {}

    async handle({
        slug
    }: FetchToolsUseCaseRequest)
    : Promise<FetchToolsUseCaseResponse> {
        const tools = slug === undefined ? await this.toolRepository.findAll() :
            await this.toolRepository.findAllFilterTag(slug)
        
        return { tools }
    }
}
