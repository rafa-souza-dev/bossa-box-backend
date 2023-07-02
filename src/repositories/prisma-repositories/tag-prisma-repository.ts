import { Prisma } from "@prisma/client";
import { ITagRepository } from "../i-tag-repository";
import { prisma } from "../../prisma";
import { GetResult } from "@prisma/client/runtime";

export class TagPrismaRepository implements ITagRepository {
    async create(data: Prisma.TagCreateInput) {
        const tag = await prisma.tag.create({
            data
        })

        return tag
    }

    async findAll() {
        const tags = await prisma.tag.findMany()

        return tags
    }

    async findManyBySlugOrCreate(slugs: string[]) {
        const tags = await prisma.tag.findMany({
            where: {
                slug: {
                    in: slugs
                }
            }
        })

        const isNotCreatedTags = slugs.filter(slug => {
            const slugTags = tags.map(tag => tag.slug)

            return !slugTags.includes(slug)
        })

        isNotCreatedTags.forEach(async (slug) => {
            tags.push(await prisma.tag.create({
                data: {
                    slug
                }
            }))
        })

        return tags
    }

    async findBySlug(slug: string) {
        const tag = await prisma.tag.findFirst({
            where: {
                slug
            }
        })

        return tag || null
    }
}
