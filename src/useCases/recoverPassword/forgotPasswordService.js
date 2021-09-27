require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const transporter = require('../../modules/mailTransporter')
const crypto = require('crypto')

class ForgotPasswordService {

    static async execute (email) {
        const user = await prisma.users.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error('User is not found!')
        }

        const token = crypto.randomBytes(20).toString('hex')
        const expires = new Date()
        expires.setHours(expires.getHours() + 1)

        try {
            await prisma.users.update({
                where: { email },
                data: {
                    password_reset_token: token, 
                    password_reset_expires: expires 
                }
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

module.exports = ForgotPasswordService
