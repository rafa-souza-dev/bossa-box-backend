import { Tag, Prisma } from "@prisma/client"

export interface ITagRepository{
    create: (data: Prisma.TagCreateInput) => Promise<Tag>
    findBySlug: (slug: string) => Promise<Tag | null>
    findAll: () => Promise<Tag[]>
}
