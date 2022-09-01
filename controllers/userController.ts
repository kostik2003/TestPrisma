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

    async getAll(req: any, res: any) {
        const user = await prisma.user.findMany({
        })
        return res.json(user)
    }

}

module.exports = new UserController()