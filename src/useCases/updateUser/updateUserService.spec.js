const { describe, test, expect, jest: mock } = require('@jest/globals')
const UpdateUserService = require('./updateUserService')
const bcryptjs = require('bcryptjs')
const User = require('../../model/User')

describe('Update user service test suite', () => {
    test('should update the user', async () => {
        const password = 'test123'
        const passwordHash = bcryptjs.hashSync(password)

        const mockUser = {
            "id": 1,
            "name": "Test",
            "email": "test@test.com",
            "password": passwordHash,
            "created_at": "2021-10-01T11:26:32.000Z",
            "updated_at": "2021-10-01T11:26:32.000Z",
            "admin": false
        }
        
        const updateUserService = new UpdateUserService(password)

        const newData = {
            name: 'Test1',
            email: 'test@test1.com',
            password: '123test'
        }
        
        mock.spyOn(User, User.getSingleUser.name)
        .mockResolvedValue(mockUser)
        
        mock.spyOn(User, User.update.name)
        .mockResolvedValue(mockUser)
        
        const user = await updateUserService.execute(mockUser.id, newData)
    
        expect(User.getSingleUser).toHaveBeenCalled()
        expect(User.update).toHaveBeenCalled()
        expect(user.name).toEqual(mockUser.name)
        expect(user.email).toEqual(mockUser.email)
    })

    test('should throw an exception of user not found', async () => {
        const password = 'test123'
        const anyId = 1
        const newData = {
            name: 'Test1',
            email: 'test@test1.com',
            password: '123test'
        }

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(false)

        const updateUserService = new UpdateUserService(password)

        let response;

        try {
            response = await updateUserService.execute(anyId, newData)
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('User is not found!')
        }

        expect(response).toBe(undefined)
    })

    test('should throw an exception of password incorrect', async () => {
        const password = 'test123'
        const anyId = 1
        const newData = {
            name: 'Test1',
            email: 'test@test1.com',
            password: '123test'
        }

        const updateUserService = new UpdateUserService(password)

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(true)

        mock.spyOn(updateUserService, updateUserService.passwordMatch.name)
            .mockReturnValue(false)

        let response;

        try {
            response = await updateUserService.execute(anyId, newData)
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Error! Password incorrect!')
        }

        expect(response).toBe(undefined)
    })
})
