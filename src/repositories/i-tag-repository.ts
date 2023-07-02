import { Tag, Prisma } from "@prisma/client"

export interface ITagRepository{
    create: (data: Prisma.TagCreateInput) => Promise<Tag>
    findAll: () => Promise<Tag[]>
    findManyBySlugOrCreate: (slugs: string[]) => Promise<Tag[]>
}
