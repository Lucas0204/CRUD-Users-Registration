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
        expires.setHours(expires.getHours() + 1)

        try {
            await user.update({
                password_reset_token: token, 
                password_reset_expires: expires 
            })

            const mail = await transporter.sendMail({
                from: `Lucas Zordan <209bd69ca807b3>`,
                to: user.email,
                subject: 'Recuperação de senha.',
                text: `Esqueceu sua senha, use este token para definir uma nova: ${token}`
            })
    
            return mail

        } catch(err) {
            throw new Error(err.message)
        }

    }
}

module.exports = forgotPasswordService
