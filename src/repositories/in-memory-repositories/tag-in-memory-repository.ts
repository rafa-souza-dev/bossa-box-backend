import { Prisma, Tag } from "@prisma/client";
import { ITagRepository } from "../i-tag-repository";
import { GetResult } from "@prisma/client/runtime";

export class TagInMemoryRepository implements ITagRepository {
    private data: Tag[] = []

    async create(data: Prisma.TagCreateInput) {
        const tag: Tag = {
            id: this.data.length + 1,
            slug: data.slug
        }

        this.data.push(tag)

        return tag
    }

    async findAll() {
        return this.data
    }

    async findManyBySlugOrCreate(slugs: string[]) {
        const dataSlugs = this.data.map(tag => tag.slug)

        slugs.forEach(slug => {
            if (!dataSlugs.includes(slug)) {
                this.data.push({
                    id: this.data.length + 1,
                    slug
                })
            }
        })

        return this.data
    }

    async findBySlug(slug: string) {
        const tag = this.data.find(tag => tag.slug === slug)

        return tag || null
    }
}
