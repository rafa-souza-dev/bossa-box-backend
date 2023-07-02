import { Tool } from "@prisma/client";

export interface FetchToolsUseCaseRequest {
    slug?: string
}

export interface FetchToolsUseCaseResponse {
    tools: Tool[]
}
