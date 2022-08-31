import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

class PostController  {
    async create(req: any, res: any) {
        try {
            const {content, title, authorEmail} = req.body
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    published: false,
                    author: { connect: { email: authorEmail}}
                }
            })
            return res.json(post)
        }
        catch (e) {
            console.log("Bad Request 3")
        }
    }

    async getOne(req: any, res: any) {
        const { id } = req.body
        const post = await prisma.post.findFirst({
            where: {
                id,
            }
        })
        res.json(post)
    }

    async getAll(req: any, res: any) {
        const posts = await prisma.post.findMany({
        where:{ published: false},
            include: { author: true}
        })
        return res.json(posts)
    }
}

module.exports = new PostController