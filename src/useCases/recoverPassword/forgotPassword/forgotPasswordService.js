require('dotenv').config()
const User = require('../../../model/User')
const Queue = require('../../../modules/Queue')
const crypto = require('crypto')

class ForgotPasswordService {
    constructor(email) {
        if (!email) throw new Error('Error! Please, provide your email!')

        this.email = email
    }

    async execute() {
        const user = await User.getSingleUser({ email: this.email })

        if (!user) {
            throw new Error('User is not found!')
        }

        const { token, expires } = this.generateTokenAndExpirationTime()

        await this.updateFieldsOfResetPassword(token, expires)

        this.addQueueToSendEmail(user, token)
    
        return {
            status: 200,
            message: "An email was sent to you, please verify your account. If you didn't receive it, check if the email is correct and try again."
        }
    }

    generateTokenAndExpirationTime() {
        const token = crypto.randomBytes(20).toString('hex')
        const expires = new Date()
        expires.setHours(expires.getHours() + 1)

        return {
            token,
            expires
        }
    }

    async updateFieldsOfResetPassword(token, expires) {
        try {
            await User.update({
                where: { email: this.email },
                data: {
                    password_reset_token: token, 
                    password_reset_expires: expires 
                }
            })
        } catch(err) {
            throw new Error(err.message)
        }
    }

    addQueueToSendEmail(user, token) {
        Queue.add('ForgotPasswordMail', { 
            user, 
            token 
        })
    }
}

module.exports = ForgotPasswordService
