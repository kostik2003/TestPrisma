import express from "express";
const userController = require('../controllers/userController')

const router = express()

router.use(express.json())

router.post('/', userController.create)
router.get('/', userController.getAll)
router.get('/:id', userController.test)

module.exports = router