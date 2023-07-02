import { it, describe, expect, beforeEach } from "vitest"
import { ITagRepository } from "../../repositories/i-tag-repository"
import { IToolRepository } from "../../repositories/i-tool-repository";
import { TagInMemoryRepository } from "../../repositories/in-memory-repositories/tag-in-memory-repository";
import { ToolInMemoryRepository } from "../../repositories/in-memory-repositories/tool-in-memory-repository";
import { CreateToolUseCase } from "../../use-cases/create-tool/create-tool-use-case";

let tagRepository: ITagRepository;
let toolRepository: IToolRepository;
let sut: CreateToolUseCase

describe('Black Box tests to Create Tool Use Case', () => {
    beforeEach(() => {
        tagRepository = new TagInMemoryRepository()
        toolRepository = new ToolInMemoryRepository(tagRepository)
        sut = new CreateToolUseCase(toolRepository, tagRepository)
    })

    it('should be able to create a tool', async () => {
        const { tool } = await sut.handle({
            tool: {
                title: "Notion",
                link: "notion.com",
                description: "task organization software",
            },
            slugs: ["organizing", "webapps", "domain", "developer", "https"]
        })

        expect(tool.id).toBe(1)
        expect(tool.title).toBe("Notion")
        expect(tool.link).toBe("notion.com")
        expect(tool.description).toBe("task organization software")
    })

    it('should be able to increment the id', async () => {
        const { tool: notion } = await sut.handle({
            tool: {
                title: "Notion",
                link: "notion.com",
                description: "task organization software",
            },
            slugs: ["organizing", "webapps", "domain", "developer", "https"]
        })

        const { tool: fastifyFramework } = await sut.handle({
            tool: {
                title: "fastify",
                link: "https://www.fastify.io/",
                description: "micro-framework for nodeJS",
            },
            slugs: ["web", "framework", "node", "http2", "https", "localhost"]
        })

        expect(notion.id).toBe(1)
        expect(fastifyFramework.id).toBe(2)
    })
})
