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

    test.todo('should throw exception of user not found')

    test.todo('should throw exception of invalid token')

    test.todo('should throw exception of token expires')
})
