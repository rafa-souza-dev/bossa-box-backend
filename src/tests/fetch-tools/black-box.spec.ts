import { it, describe, expect, beforeEach } from "vitest"
import { TagInMemoryRepository } from "../../repositories/in-memory-repositories/tag-in-memory-repository";
import { ToolInMemoryRepository } from "../../repositories/in-memory-repositories/tool-in-memory-repository";
import { FetchToolsUseCase } from "../../use-cases/get-tools/fetch-tools-use-case";

let tagRepository: TagInMemoryRepository;
let toolRepository: ToolInMemoryRepository;
let sut: FetchToolsUseCase

describe('Black Box tests to Fetch Tools Use Case', () => {
    beforeEach(() => {
        tagRepository = new TagInMemoryRepository()
        toolRepository = new ToolInMemoryRepository(tagRepository)
        sut = new FetchToolsUseCase(toolRepository)
    })

    it('should be able to fetch tools with slug filter', async () => {
        toolRepository.create({
            title: "Notion",
            link: "notion.com",
            description: "task organization software",
        })

        toolRepository.create({
            title: "Jira",
            link: "jira.com",
            description: "task organization software",
        })

        toolRepository.create({
            title: "NodeJS",
            link: "node.com",
            description: "js code platform",
        })

        tagRepository.findManyBySlugOrCreate(["organizing", "webapps", "domain", "developer", "https"])

        toolRepository.connectToolTag(1, 1)
        toolRepository.connectToolTag(1, 2)
        toolRepository.connectToolTag(2, 1)
        toolRepository.connectToolTag(2, 2)

        const { tools } = await sut.handle({
            slug: "organizing"
        })

        expect(tools[0].id).toBe(1)
        expect(tools[0].title).toBe("Notion")
        expect(tools[1].id).toBe(2)
        expect(tools[1].title).toBe("Jira")
        expect(tools.length).toBe(2)
    })

    it('should be able to fetch tools no slug filter', async () => {
        toolRepository.create({
            title: "Notion",
            link: "notion.com",
            description: "task organization software",
        })

        toolRepository.create({
            title: "Jira",
            link: "jira.com",
            description: "task organization software",
        })

        toolRepository.create({
            title: "NodeJS",
            link: "node.com",
            description: "js code platform",
        })

        tagRepository.findManyBySlugOrCreate(["organizing", "webapps", "domain", "developer", "https"])

        toolRepository.connectToolTag(1, 1)
        toolRepository.connectToolTag(1, 2)
        toolRepository.connectToolTag(2, 1)
        toolRepository.connectToolTag(2, 2)

        const { tools } = await sut.handle({})

        expect(tools.length).toBe(3)
    })

    it('should not be able to fetch tools with nonexistent slug', async () => {
        toolRepository.create({
            title: "Notion",
            link: "notion.com",
            description: "task organization software",
        })

        toolRepository.create({
            title: "Jira",
            link: "jira.com",
            description: "task organization software",
        })

        toolRepository.create({
            title: "NodeJS",
            link: "node.com",
            description: "js code platform",
        })

        tagRepository.findManyBySlugOrCreate(["organizing", "webapps", "domain", "developer", "https"])

        toolRepository.connectToolTag(1, 1)
        toolRepository.connectToolTag(1, 2)
        toolRepository.connectToolTag(2, 1)
        toolRepository.connectToolTag(2, 2)

        const { tools } = await sut.handle({
            slug: "devops"
        })

        expect(tools.length).toBe(0)
    })
})
