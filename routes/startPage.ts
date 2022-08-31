import express from "express";

const router = express()

router.use(express.json())

router.get('/', (req, res) => {
    res.json({message: 'hello get startPage'})
} )

module.exports = router