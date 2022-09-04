import {PrismaClient} from '@prisma/client'
import {ApiError} from "../error/ApiError";
// const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

class AuthController {
    async login (req: any, res: any, next: any) {
        try{

        }
        catch (e) {
            next(ApiError.forbidden("forbidden login"))
        }
    }

    async registration (req: any , res: any, next: any) {
        try{

        }
        catch (e) {
            next(ApiError.forbidden("forbidden registration"))
        }
    }
}

module.exports = new AuthController()

