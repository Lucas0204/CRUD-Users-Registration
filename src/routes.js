const express = require('express')
const router = express.Router()
const createUserController = require('./controllers/createUserController')
const listUsersController = require('./controllers/listUsersController')
const listOneUserController = require('./controllers/listOneUserController')
const updateUserController = require('./controllers/updateUserController')
const deleteUserController = require('./controllers/deleteUserController')

// Create - User
router.post('/users', createUserController.handle)

// Read - List users
router.get('/users', listUsersController.handle)

// Read - Get only one user -- /users/:id
router.get('/users/:id', listOneUserController.handle)

// Update - User
router.post('/users/update/:id', updateUserController.handle)

// Delete - User
router.delete('/users/:id', deleteUserController.handle)

module.exports = router
