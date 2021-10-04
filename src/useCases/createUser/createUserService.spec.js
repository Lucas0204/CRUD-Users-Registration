const { describe, test, expect, jest: mock } = require('@jest/globals')
const createUserService = require('./createUserService')
const User = require('../../model/User')

describe('Create user service test suite', () => {
    test('should be able to create a new user', async () => {
        const mockUser = {
            "id": 1,
            "name": "Test",
            "email": "test@test.com",
            "created_at": "2021-10-01T11:26:32.000Z",
            "updated_at": "2021-10-01T11:26:32.000Z",
            "admin": false,
            "password_reset_token": null,
            "password_reset_expires": null
        }

        mock.spyOn(User, User.exists.name)
            .mockResolvedValue(false)

        mock.spyOn(User, User.create.name)
            .mockResolvedValue(mockUser)

        const user = await createUserService.execute({
            name: mockUser.name,
            email: mockUser.email,
            password: 'test123'
        })

        expect(User.create).toHaveBeenCalled()
        expect(user).toHaveProperty('id')
    })

    test('should throw an exception of user already exists', async () => {
        const mockUser = {
            "id": 1,
            "name": "Test",
            "email": "test@test.com",
            "created_at": "2021-10-01T11:26:32.000Z",
            "updated_at": "2021-10-01T11:26:32.000Z",
            "admin": false,
            "password_reset_token": null,
            "password_reset_expires": null
        }

        const data = {
            name: mockUser.name,
            email: mockUser.email,
            password: 'test123'
        }
    
        mock.spyOn(User, User.exists.name)
            .mockResolvedValue(true)
    
        mock.spyOn(User, User.create.name)
            .mockResolvedValue(mockUser)

        try {
            await createUserService.execute(data)
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Email is already exists!')
        }

        expect(User.create).toHaveBeenCalledTimes(0)
    })
})
