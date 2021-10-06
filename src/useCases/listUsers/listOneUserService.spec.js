const { describe, test, expect, jest: mock } = require('@jest/globals')
const listOneUserService = require('./listOneUserService')
const User = require('../../model/User')

describe('List one user service test suite', () => {
    test('should list only one user', async () => {
        const mockUser = {
            "id": 1,
            "name": "Test",
            "email": "test@test.com",
            "password": "test123",
            "created_at": "2021-09-27T16:07:51.000Z",
            "updated_at": "2021-09-27T16:07:51.000Z",
            "admin": false,
            "password_reset_token": null,
            "password_reset_expires": null
        }

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(mockUser)

        const user = await listOneUserService.execute(1)

        expect(User.getSingleUser).toHaveBeenCalled()
        expect(user).toStrictEqual(mockUser)
    })

    test('should throw an exception of user not found', async () => {
        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(false)

        let response;

        try {
            response = await listOneUserService.execute(1)
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Error! User is not found!')
        }

        expect(response).toBe(undefined)
    })
})
