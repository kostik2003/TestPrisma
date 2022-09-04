import express from "express";
const router = express()
const postRouter = require('./postRoutes')
const userRouter = require('./userRoutes')
const startPage = require('./startPage')
const authRouter = require('../routes/authRouter')

router.use(express.json())

router.use(startPage)
router.use(authRouter)
router.use('/post', postRouter)
router.use('/user', userRouter)

module.exports = router