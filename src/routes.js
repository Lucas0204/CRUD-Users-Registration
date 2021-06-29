const express = require('express')
const router = express.Router()
const createUserController = require('./controllers/createUserController')

router.post('/users', createUserController.handle)

module.exports = router
