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
        const {authorId, published} = req.query
        try{
            // limit: any, page: any
            // page = page || 1
            // limit = limit || 9
            // let offset = page + limit - limit
            let posts
            if(!authorId && published) {
                posts = await prisma.post.findMany({
                    where: { published: false }
                })
            }
            if(authorId && !published) {
                posts = await prisma.post.findMany({
                    where: { authorId: Number(authorId) }
                })
            }
            if(!authorId && !published) {
                posts = await prisma.post.findMany({
                })
            }
            if(authorId && published) {
                posts = await prisma.post.findMany({
                    where: {authorId: Number(authorId), published: false}
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