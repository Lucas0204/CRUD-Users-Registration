require('dotenv').config()
const User = require('../../model/User')
const Queue = require('../../modules/Queue')
const crypto = require('crypto')

class ForgotPasswordService {

    static async execute(email) {
        const user = await User.getSingleUser({ email })

        if (!user) {
            throw new Error('User is not found!')
        }

        const token = crypto.randomBytes(20).toString('hex')
        const expires = new Date()
        expires.setHours(expires.getHours() + 1)

        try {
            await User.update({
                where: { email },
                data: {
                    password_reset_token: token, 
                    password_reset_expires: expires 
                }
            })

            Queue.add('ForgotPasswordMail', { user, token })

            const res = {
                status: 200,
                message: "An email was sent to you, please verify your account. If you didn't receive it, check if the email is correct and try again."
            }
    
            return res
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

module.exports = ForgotPasswordService
