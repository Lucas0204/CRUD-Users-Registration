const express = require('express')
const router = express.Router()
const createUserController = require('./controllers/createUserController')
const listUsersController = require('./controllers/listUsersController')
const listOneUserController = require('./controllers/listOneUserController')
const updateUserController = require('./controllers/updateUserController')
const deleteUserController = require('./controllers/deleteUserController')
const authenticateUserController = require('./controllers/authenticateUserController')
const ensureAuthenticated = require('./middlewares/ensureAuthenticated')

// Create - User
router.post('/users', createUserController.handle)

// Read - List users
router.get('/users', listUsersController.handle)

router.post('/login', authenticateUserController.handle)

// Read - Get only one user -- /users/:id
router.get('/users/:id', listOneUserController.handle)

// Update - User
router.post('/users/update/:id', updateUserController.handle)

// Delete - User
router.delete('/users/:id', ensureAuthenticated, deleteUserController.handle)

module.exports = router
