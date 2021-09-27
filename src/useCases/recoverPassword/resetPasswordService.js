const prisma = require('../../database/prisma')
const bcrypt = require('bcryptjs')

class ResetPasswordService {

    static async execute (email, token, password) {
        const user = await prisma.users.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error('User is not found!')
        }

        if (token !== user.password_reset_token) {
            throw new Error('Invalid token!')
        }

        const now = new Date()
        
        if (now > user.password_reset_expires) {
            throw new Error('Token expires, generate a new one.')
        }

        const passwordHash = bcrypt.hashSync(password)

        try {
            await prisma.users.update({
                where: { email },
                data: { password: passwordHash }
            })
        } catch(err) {
            throw new Error(err.message)
        }

        user.password = undefined
        user.password_reset_token = undefined
        user.password_reset_expires = undefined

        return user 
    }
}

module.exports = ResetPasswordService
