require('dotenv').config()

const { describe, test, expect, jest: mock } = require('@jest/globals')
const authenticateUserService = require('./authenticateUserService')
const User = require('../../model/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


describe('Authenticate user service test suite', () => {
    test('should return a token that proves the user is logged in', async () => {
        const password = 'test123'
        const passwordHash = bcryptjs.hashSync(password)

        const mockUser = {
            "id": 1,
            "name": "Test",
            "email": "test@test.com",
            "password": passwordHash,
            "created_at": "2021-10-01T11:26:32.000Z",
            "updated_at": "2021-10-01T11:26:32.000Z",
            "admin": false,
            "password_reset_token": null,
            "password_reset_expires": null
        }

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(mockUser)

        const data = {
            email: mockUser.email,
            password
        }

        const token = await authenticateUserService.execute(data)

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

        expect(verifiedToken).toHaveProperty('sub')
        expect(verifiedToken.sub).toEqual(mockUser.id.toString())
        expect(verifiedToken.email).toEqual(mockUser.email)
    })

    test('should throw an exception of invalid credentials', async () => {
        let response;
        
        try {
            response = await authenticateUserService.execute({})
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Invalid credentials!')
        }

        expect(response).toBe(undefined)
    })

    test('should throw an exception of email incorrect / user not exists', async () => {
        const data = {
            email: 'any@thing.com',
            password: 'test123'
        }

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(null)

        let response;
        
        try {
            response = await authenticateUserService.execute(data)
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Email/Password incorrect!')
        }

        expect(response).toBe(undefined)
    })
})
