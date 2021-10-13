require('dotenv').config()

const { describe, test, expect, jest: mock } = require('@jest/globals')
const AuthenticateUserService = require('./authenticateUserService')
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

        const authenticateUserService = new AuthenticateUserService(mockUser.email, password)
        const token = await authenticateUserService.execute()

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

        expect(verifiedToken).toHaveProperty('sub')
        expect(verifiedToken.sub).toEqual(mockUser.id.toString())
        expect(verifiedToken.email).toEqual(mockUser.email)
    })

    test('should throw an exception of invalid credentials', async () => {
        let response;
        
        try {
            const authenticateUserService = new AuthenticateUserService()
            response = await authenticateUserService.execute()
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Invalid credentials!')
        }

        expect(response).toBeUndefined()
    })

    test('should throw an exception of email incorrect', async () => {
        const email = 'any@thing.com'
        const password = 'test123'

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(null)
        
        const authenticateUserService = new AuthenticateUserService(email, password)

        let response;
        
        try {
            response = await authenticateUserService.execute()
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Email/Password incorrect!')
        }

        expect(response).toBeUndefined()
    })

    test('should throw an exception of password incorrect', async () => {
        const email = 'any@thing.com'
        const password = 'test123'

        const authenticateUserService = new AuthenticateUserService(email, password)

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(true)

        mock.spyOn(authenticateUserService, authenticateUserService.passwordMatch.name)
            .mockReturnValue(false)

        let response;
            
        try {
            response = await authenticateUserService.execute()
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Email/Password incorrect!')
        }

        expect(response).toBeUndefined()
    })
})
