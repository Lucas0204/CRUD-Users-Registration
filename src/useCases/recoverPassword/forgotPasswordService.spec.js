const { describe, test, expect, jest: mock } = require('@jest/globals')
const forgotPasswordService = require('./forgotPasswordService')
const Queue = require('../../modules/Queue')
const User = require('../../model/User')

describe('Forgot password service test suite', () => {
    test('should send an email with token that will be used to change password', async () => {
        const email = 'any@thing.com'
        const expectResponse = {
            status: 200,
            message: "An email was sent to you, please verify your account. If you didn't receive it, check if the email is correct and try again."
        }

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(true)

        mock.spyOn(User, User.update.name)
            .mockResolvedValue({})

        mock.spyOn(Queue, Queue.add.name)
            .mockImplementation(mock.fn())

        mock.spyOn(Queue, Queue.queues.name)
            .mockResolvedValue([])

        const response = await forgotPasswordService.execute(email)

        expect(User.update).toHaveBeenCalled()
        expect(Queue.add).toHaveBeenCalled()
        expect(response).toStrictEqual(expectResponse)
    })

    test('should throw an exception of user is not found', async () => {
        const email = 'any@thing.com'

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(false)

        let response;

        try {
            response = await forgotPasswordService.execute(email)
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('User is not found!')
        }

        expect(response).toBeUndefined()
    })

    test('should throw an error when update fields of recover password of user', async () => {
        const email = 'any@thing.com'

        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(true)

        mock.spyOn(User, User.update.name)
            .mockImplementation(() => {
                throw new Error('There was an error accessing database!')
            })

        let response;

        try {
            response = await forgotPasswordService.execute(email)
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('There was an error accessing database!')
        }

        expect(response).toBeUndefined()
    })
})
