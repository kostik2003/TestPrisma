import {PrismaClient} from '@prisma/client'
import {ApiError} from "../error/ApiError";
const prisma = new PrismaClient()

class PostController  {
    async create(req: any, res: any, next: any) {
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
            next(ApiError.badRequest("Error created."))
        }
    }

    async getOne(req: any, res: any, next: any) {
        const { id } = req.params
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id)
                }
            })
            return res.json(post)
        }
        catch (e) {
            next(ApiError.badRequest("Post not found"))
        }
    }

    async getAll(req: any, res: any, next: any,) {
        let {authorId, published , take, page} = req.query

        try{
            let posts
            if(published && page && take) {
                 posts = await prisma.post.findMany({
                    skip: (page - 1) * Number(take),
                    take: Number(take),
                    where: { published: false },
                })
            }

            else if(!published && page && take) {
                posts = await prisma.post.findMany({
                    skip: (page - 1) * Number(take),
                    take: Number(take),
                })
            }
            if(authorId && page && take) {
                posts = await prisma.post.findMany({
                    skip: (page - 1) * Number(take),
                    take: Number(take),
                    where: {
                        authorId: Number(authorId)
                    }
                })
            }
            else if(authorId && page && take && published) {
                posts = await prisma.post.findMany({
                    skip: (page - 1) * Number(take),
                    take: Number(take),
                    where: {
                        published: Boolean(published),
                        authorId: Number(authorId)
                    }
                })
            }

            return res.json(posts)
        }
        catch (e) {
            next(ApiError.badRequest("post not found"))
        }
    }
}

module.exports = new PostController