const User = require('../models/User')
const bcrypt = require('bcryptjs')

const resetPasswordService = {
    execute: async (email, token, newPassword) => {

        const user = await User.findOne({
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

        const passwordHash = bcrypt.hashSync(newPassword)

        try {
            await user.update({ password: passwordHash })
        } catch(err) {
            throw new Error(err.message)
        }

        user.password = undefined
        user.password_reset_token = undefined
        user.password_reset_expires = undefined

        return user 
    }
}

module.exports = resetPasswordService
