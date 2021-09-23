const router = require('express').Router()
const createUserController = require('./useCases/createUser/createUserController')
const listUsersController = require('./useCases/listUsers/listUsersController')
const listOneUserController = require('./useCases/listUsers/listOneUserController')
const updateUserController = require('./useCases/updateUser/updateUserController')
const deleteUserController = require('./useCases/deleteUser/deleteUserController')
const authenticateUserController = require('./useCases/authenticateUser/authenticateUserController')
const forgotPasswordController = require('./useCases/recoverPassword/forgotPasswordController')
const resetPasswordController = require('./useCases/recoverPassword/resetPasswordController')
const ensureAuthenticated = require('./middlewares/ensureAuthenticated')
const ensureAdmin = require('./middlewares/ensureAdmin')

// Create - User
router.post('/users', createUserController.handle)

// Authenticate user - Generates a JWT token that should be used on protected routes, ie routes with 'ensure authenticated'
// The token is taken via 'request / headers / authorization'
router.post('/login', authenticateUserController.handle)


// Read - List users -- Need to be logged in to access 
router.get('/users', ensureAuthenticated, ensureAdmin, listUsersController.handle)

// Read - Get only one user -- /users/:id
router.get('/users/:id', ensureAuthenticated, ensureAdmin, listOneUserController.handle)


// Update - User -- Id provided by ensure authenticated
router.post('/users/update', ensureAuthenticated, updateUserController.handle)


// Delete - User
// To delete, the user must be authenticated and an admin
router.delete('/users/:id', ensureAuthenticated, ensureAdmin, deleteUserController.handle)

// This route sends an email with a token to be used in password recovery/reset
router.post('/forgot_password', forgotPasswordController.handle)

// Checks if there is a valid token in order to reset the password
router.post('/reset_password', resetPasswordController.handle)

module.exports = router
