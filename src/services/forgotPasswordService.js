require('dotenv').config()
const User = require('../models/User')
const transporter = require('../modules/mailTransporter')
const crypto = require('crypto')

const forgotPasswordService = {
    execute: async (email) => {

        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            throw new Error('User is not found!')
        }

        const token = crypto.randomBytes(20).toString('hex')

        const expires = new Date()
        expires.setDate(expires.getHours() + 1)

        try {
            const updatedUser = await user.update({
                password_reset_token: token, 
                password_reset_expires: expires 
            })

            const mail = await transporter.sendMail({
                from: `Lucas Zordan <209bd69ca807b3>`,
                to: user.email,
                subject: 'Recuperação de senha.',
                text: 'Acesse este link para recuperar sua senha.'
            })
    
            return updatedUser

        } catch(err) {
            throw new Error(err.message)
        }

    }
}

module.exports = forgotPasswordService
