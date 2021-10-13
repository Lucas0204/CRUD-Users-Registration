const { describe, test, expect, jest: mock } = require('@jest/globals')
const CreateUserService = require('./createUserService')
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
        const data = {
            name: mockUser.name,
            email: mockUser.email,
            password: 'test123'
        }

        mock.spyOn(User, User.exists.name)
            .mockResolvedValue(false)

        mock.spyOn(User, User.create.name)
            .mockResolvedValue(mockUser)

        const createUserService = new CreateUserService(data)

        const user = await createUserService.execute()

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

        const createUserService = new CreateUserService(data)

        let response;

        try {
            response = await createUserService.execute()
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Email is already exists!')
        }

        expect(User.create).toHaveBeenCalledTimes(0)
        expect(response).toBeUndefined()
    })

    test('should throw an exception when create user', async () => {
        const data = {
            name: 'test',
            email: 'test@test.com',
            password: 'test123'
        }

        mock.spyOn(User, User.exists.name)
            .mockResolvedValue(false)
        
        mock.spyOn(User, User.create.name)
            .mockImplementation(() => {
                throw new Error('Error accessing database!')
            })
        
        const createUserService = new CreateUserService(data)

        let response;

        try {
            response = await createUserService.execute()
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Error accessing database!')
        }

        expect(response).toBeUndefined()
    })

    test('should throw an exception of name field missing', async () => {
        const data = {
            name: '',
            email: 'test@test.com',
            password: 'test123'
        }

        const createUserService = new CreateUserService(data)

        let response;

        try {
            response = await createUserService.execute()
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('The name field is missing!')
        }

        expect(response).toBeUndefined()
    })

    test('should throw an exception of email field missing', async () => {
        const data = {
            name: 'Test',
            email: '',
            password: 'test123'
        }

        const createUserService = new CreateUserService(data)

        let response;

        try {
            response = await createUserService.execute()
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('The email field is missing!')
        }

        expect(response).toBeUndefined()
    })

    test('should throw an exception of password field missing', async () => {
        const data = {
            name: 'Test',
            email: 'test@test.com',
            password: ''
        }

        const createUserService = new CreateUserService(data)

        let response;

        try {
            response = await createUserService.execute()
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('The password field is missing!')
        }

        expect(response).toBeUndefined()
    })
})
