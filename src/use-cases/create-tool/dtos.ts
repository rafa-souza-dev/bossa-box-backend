import { Prisma, Tool } from "@prisma/client";

export interface CreateToolUseCaseRequest {
    tool: Prisma.ToolCreateInput;
    slugs: string[]
}

export interface CreateToolUseCaseResponse {
    tool: Tool
}
