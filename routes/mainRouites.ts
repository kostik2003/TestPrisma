import express from "express";
const router = express()
const postRouter = require('./postRoutes')
const userRouter = require('./userRoutes')
const startPage = require('./startPage')

router.use(express.json())

router.use(startPage)
router.use('/post', postRouter)
router.use('/user', userRouter)

module.exports = router