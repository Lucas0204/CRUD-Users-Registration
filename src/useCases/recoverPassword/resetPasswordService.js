const User = require('../../model/User')
const bcrypt = require('bcryptjs')

class ResetPasswordService {
    constructor(email, token) {
        this.email = email
        this.token = token
    }

    async execute(newPassword) {
        const { 
            password_reset_token: resetPasswordToken, 
            password_reset_expires: expirationTime, 
            ...user 
        } = await User.getSingleUser({ email: this.email })

        if (!user) {
            throw new Error('User is not found!')
        }

        if (!this.tokenMatch(resetPasswordToken)) {
            throw new Error('Invalid token!')
        }
        
        if (this.tokenExpires(expirationTime)) {
            throw new Error('Token expires, generate a new one.')
        }

        await this.updateUserWithNewPassword(newPassword)

        user.password = undefined

        return user 
    }

    tokenMatch(resetPasswordToken) {
        return this.token === resetPasswordToken
    }

    tokenExpires(expirationTime) {
        const now = new Date()
        return now > expirationTime
    }

    async updateUserWithNewPassword(password) {
        const passwordHash = bcrypt.hashSync(password)

        try {
            await User.update({
                where: { email: this.email },
                data: {
                    password: passwordHash
                }
            })
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

module.exports = ResetPasswordService
