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

    async getOne(req: any, res: any) {
        try{
            const { id } = req.body //TODO: когда используется body, а когда params
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
            })
            return res.json(user)
        }
        catch (e) {
            console.log("Bad Request 2")
        }
    }

    async getAll(req: any, res: any) {
        const user = await prisma.user.findMany({
        })
        return res.json(user)
    }


    async test (req: any, res: any, next: any) {

        try {
            const { id } = req.params
            if(!id) {
                return next(ApiError.badRequest('Не задан id'))
            }
            const user = await prisma.user.findUnique({
                where: {
                   id: Number(id) //TODO: сделать везде поиск по id.
                }
            })
            return res.json(user)
        }
        catch (e) {
            next(ApiError.internal('internal'))
        }

    }


}

module.exports = new UserController()