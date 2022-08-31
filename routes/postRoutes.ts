import express from "express";
const postController = require('../controllers/postController')
const router = express()

router.use(express.json())

router.post('/', postController.create)
router.get('/', postController.getAll)
router.get('/:id', postController.getOne)


module.exports = router