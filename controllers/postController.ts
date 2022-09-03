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
        let {authorId, published , skip, take} = req.query

        try{
            let posts
            if(authorId && published) {
                 posts = await prisma.post.findMany({
                    skip: Number(skip) || undefined,
                    take: Number(take) || undefined,
                    where: {authorId: Number(authorId), published: false},
                })
            }
            if(!authorId && published) {
                posts = await prisma.post.findMany({
                    skip: Number(skip) || undefined,
                    take: Number(take) || undefined,
                    where: {published: false}
                })
            }
            if(authorId && !published) {
                posts = await prisma.post.findMany({
                    skip: Number(skip) || undefined,
                    take: Number(take) || undefined,
                    where: { authorId: Number(authorId)}
                })
            }
            if(!authorId && !published) {
                posts = await prisma.post.findMany({
                    skip: Number(skip) || undefined,
                    take: Number(take) || undefined,
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