import express from "express";
const authController = require('../controllers/authController')
const router = express()

router.post('/login', authController.login)
router.post('/registration', authController.registration)

module .exports = router