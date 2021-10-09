const { describe, test, expect, jest: mock } = require('@jest/globals')
const ResetPasswordService = require('./resetPasswordService')
const User = require('../../model/User')

describe('Reset password service test suite', () => {
    test('should update the user with new password', async () => {
        const expires = new Date()
        const mockUser = {
            "id": 1,
            "name": "Test",
            "email": "test@test.com",
            "created_at": "2021-10-09T01:10:39.000Z",
            "updated_at": "2021-10-09T01:10:39.000Z",
            "admin": false,
            "password_reset_token": 'someToken',
            "password_reset_expires": expires.setHours(expires.getHours() + 1)
        }

        const token = mockUser.password_reset_token

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(mockUser)

        mock.spyOn(User, User.update.name)
            .mockImplementation(mock.fn())

        const resetPasswordService = new ResetPasswordService(mockUser.email, token)

        const user = await resetPasswordService.execute('newPassword')

        expect(User.getSingleUser).toHaveBeenCalled()
        expect(User.update).toHaveBeenCalled()
        expect(user).toHaveProperty('id')
    })

    test('should throw an exception of user not found', async () => {
        const email = 'any@thing.com'
        const token = 'someToken'

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(false)

        const resetPasswordService = new ResetPasswordService(email, token)

        let response;

        try {
            response = await resetPasswordService.execute('newPassword')
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('User is not found!')
        }

        expect(response).toBe(undefined)
    })

    test('should throw an exception of invalid token', async () => {
        const token = 'someToken'
        const wrongToken = 'wrongToken'
        const expires = new Date()
        const mockUser = {
            "id": 1,
            "name": "Test",
            "email": "test@test.com",
            "created_at": "2021-10-09T01:10:39.000Z",
            "updated_at": "2021-10-09T01:10:39.000Z",
            "admin": false,
            "password_reset_token": token,
            "password_reset_expires": expires.setHours(expires.getHours() + 1)
        }

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(mockUser)

        const resetPasswordService = new ResetPasswordService(mockUser.email, wrongToken)

        let response;

        try {
            response = await resetPasswordService.execute('newPassword')
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Invalid token!')
        }

        expect(response).toBe(undefined)
    })

    test('should throw an exception of token expires', async () => {
        const token = 'someToken'
        const expires = new Date()
        const tokenTimeExpired = expires.setHours(expires.getHours() - 1)
        const mockUser = {
            "id": 1,
            "name": "Test",
            "email": "test@test.com",
            "created_at": "2021-10-09T01:10:39.000Z",
            "updated_at": "2021-10-09T01:10:39.000Z",
            "admin": false,
            "password_reset_token": token,
            "password_reset_expires": tokenTimeExpired
        }

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(mockUser)

        const resetPasswordService = new ResetPasswordService(mockUser.email, mockUser['password_reset_token'])
    
        let response;

        try {
            response = await resetPasswordService.execute('newPassword')
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Token expires, generate a new one.')
        }

        expect(response).toBe(undefined)
    })

    test('should throw an error when update user with new password', async () => {
        const token = 'someToken'
        const expires = new Date()
        const mockUser = {
            "id": 1,
            "name": "Test",
            "email": "test@test.com",
            "created_at": "2021-10-09T01:10:39.000Z",
            "updated_at": "2021-10-09T01:10:39.000Z",
            "admin": false,
            "password_reset_token": token,
            "password_reset_expires": expires.setHours(expires.getHours() + 1)
        }

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(mockUser)
        
        mock.spyOn(User, User.update.name)
            .mockImplementation(() => {
                throw new Error('There was an error accessing database!')
            })

        const resetPasswordService = new ResetPasswordService(mockUser.email, mockUser['password_reset_token'])
    
        let response;

        try {
            response = await resetPasswordService.execute('newPassword')
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('There was an error accessing database!')
        }

        expect(response).toBe(undefined)
    })
})
