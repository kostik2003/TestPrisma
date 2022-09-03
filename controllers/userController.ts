import {PrismaClient} from '@prisma/client'
import {ApiError} from "../error/ApiError";
import uuid from 'uuid'
import path from 'path'
const prisma = new PrismaClient()


class UserController {
    async create(req: any, res: any) {
        try{
            const {name, email, posts} = req.body
            /*
        const {img} = req.files                //TODO: сделать показ изображения
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName ))
        */
            const user = await prisma.user.create({
                data:{
                    name,
                    email,
                    posts
                }
            })
            return res.json(user)
        }
        catch (e) {
            console.log('Bad Request')
        }
    }

    async getOne(req: any, res: any, next: any) {
        try{
            const { id } = req.params //TODO: когда используется body, а когда params
            const user = await prisma.user.findUnique({

                where: {
                    id: Number(id)
                },

            })
            return res.json(user)
        }
        catch (e) {
            next(ApiError.internal("User not found"))
        }
    }

    async getAll(req: any, res: any, next: any) {
        const { skip, take} = req.query
        let user
        try {
            if(!skip && !take)
                user = await prisma.user.findMany({
                })
            if(skip && !take){
                user = await prisma.user.findMany({
                    skip: Number(skip)
                })
            }
            if(!skip && take){
                user = await prisma.user.findMany({
                    take: Number(take)
                })
            }
            if(skip && take){
                user = await prisma.user.findMany({
                    skip: Number(skip),
                    take: Number(take)
                })
            }
            return res.json(user)

        }
        catch (e) {
            next(ApiError.badRequest("Users not found"))
        }
    }
}
module.exports = new UserController()