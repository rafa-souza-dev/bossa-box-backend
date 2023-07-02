import { it, describe, expect, beforeEach } from "vitest"
import { ITagRepository } from "../../repositories/i-tag-repository"
import { IToolRepository } from "../../repositories/i-tool-repository";
import { TagInMemoryRepository } from "../../repositories/in-memory-repositories/tag-in-memory-repository";
import { ToolInMemoryRepository } from "../../repositories/in-memory-repositories/tool-in-memory-repository";
import { DestroyToolUseCase } from "../../use-cases/destroy-tool/delete-tool-use-case";
import { ToolDoesNotExist } from "../../use-cases/destroy-tool/errors";

let tagRepository: ITagRepository;
let toolRepository: IToolRepository;
let sut: DestroyToolUseCase

describe('White Box tests to Destroy Tool Use Case', () => {
    beforeEach(() => {
        tagRepository = new TagInMemoryRepository()
        toolRepository = new ToolInMemoryRepository(tagRepository)
        sut = new DestroyToolUseCase(toolRepository)
    })

    it('should not be able to destroy a nonexistent tool', async () => {
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

        await expect(() =>
            sut.handle({
                toolId: 3
            })
        ).rejects.toBeInstanceOf(ToolDoesNotExist)
    })
})
