import {PrismaClient} from '@prisma/client'
import express from 'express'
require('dotenv').config()
import fileUpload from 'express-fileupload'
const DB_PORT = process.env.DB_PORT
const router = require('./routes/mainRouites')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')


const app = express()
const prisma = new PrismaClient()

app.use(express.json())
//app.use(fileUpload({})) TODO: сделать показ изображения
app.use('/api', router)



app.use(errorHandler)


const start = async () => {
    try {
        app.listen(3000, () => console.log(`Server started on port ${DB_PORT}`) )
    }
    catch (e) {
        console.log(e)
    }
}
start() // npm run dev
