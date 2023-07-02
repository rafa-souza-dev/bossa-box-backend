import { it, describe, expect, beforeEach } from "vitest"
import { ITagRepository } from "../../repositories/i-tag-repository"
import { IToolRepository } from "../../repositories/i-tool-repository";
import { TagInMemoryRepository } from "../../repositories/in-memory-repositories/tag-in-memory-repository";
import { ToolInMemoryRepository } from "../../repositories/in-memory-repositories/tool-in-memory-repository";
import { CreateToolUseCase } from "../../use-cases/create-tool/create-tool-use-case";
import { ToolAlreadyExists } from "../../use-cases/create-tool/errors";

let tagRepository: ITagRepository;
let toolRepository: IToolRepository;
let sut: CreateToolUseCase

describe('White Box tests to Create Tool Use Case', () => {
    beforeEach(() => {
        tagRepository = new TagInMemoryRepository()
        toolRepository = new ToolInMemoryRepository()
        sut = new CreateToolUseCase(toolRepository, tagRepository)
    })

    it('should be able to create tools with different titles', async () => {
        const { tool: notion } = await sut.handle({
            tool: {
                title: "Notion",
                link: "notion.com",
                description: "task organization software",
            },
            slugs: ["organizing", "webapps", "domain", "developer", "https"]
        })

        const { tool: jira } = await sut.handle({
            tool: {
                title: "Jira",
                link: "notion.com",
                description: "task organization software",
            },
            slugs: ["organizing", "webapps", "domain", "developer", "https"]
        })

        expect(notion.id).toBe(1)
        expect(notion.title).toBe("Notion")
        expect(jira.id).toBe(2)
        expect(jira.title).toBe("Jira")
    })

    it('should not be able to create tools with equal titles', async () => {
        await sut.handle({
            tool: {
                title: "Notion",
                link: "notion.com",
                description: "task organization software",
            },
            slugs: ["organizing", "webapps", "domain", "developer", "https"]
        })

        await expect(() =>
            sut.handle({
                tool: {
                    title: "Notion",
                    link: "notion.com",
                    description: "task organization software",
                },
                slugs: ["organizing", "webapps", "domain", "developer", "https"]
            }),
        ).rejects.toBeInstanceOf(ToolAlreadyExists)
    })
})
