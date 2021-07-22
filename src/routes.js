const express = require('express')
const router = express.Router()
const createUserController = require('./controllers/createUserController')
const listUsersController = require('./controllers/listUsersController')
const listOneUserController = require('./controllers/listOneUserController')
const updateUserController = require('./controllers/updateUserController')
const deleteUserController = require('./controllers/deleteUserController')
const authenticateUserController = require('./controllers/authenticateUserController')
const forgotPasswordController = require('./controllers/forgotPasswordController')
const resetPasswordController = require('./controllers/resetPasswordController')
const ensureAuthenticated = require('./middlewares/ensureAuthenticated')
const ensureAdmin = require('./middlewares/ensureAdmin')

// Create - User
router.post('/users', createUserController.handle)

// Authenticate user - Generates a JWT token that should be used on protected routes, ie routes with 'ensure authenticated'
// The token is taken via 'request / headers / authorization'
router.post('/login', authenticateUserController.handle)


// Read - List users -- Need to be logged in to access 
router.get('/users', ensureAuthenticated, listUsersController.handle)

// Read - Get only one user -- /users/:id
router.get('/users/:id', ensureAuthenticated, listOneUserController.handle)


// Update - User -- Id provided by ensure authenticated
router.post('/users/update', ensureAuthenticated, updateUserController.handle)


// Delete - User
// To delete, the user must be authenticated and an admin
router.delete('/users/:id', ensureAuthenticated, ensureAdmin, deleteUserController.handle)


router.post('/forgot_password', forgotPasswordController.handle)

router.post('/reset_password', resetPasswordController.handle)

module.exports = router
