const express = require('express')
const router = express.Router()
const createUserController = require('./controllers/createUserController')
const listUsersController = require('./controllers/listUsersController')

// Create - User
router.post('/users', createUserController.handle)

// Read - List users
router.get('/users', listUsersController.handle)

// Read - Get only one user -- /users/:id


module.exports = router
