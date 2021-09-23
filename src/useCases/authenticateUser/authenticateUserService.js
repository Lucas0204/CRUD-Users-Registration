require('dotenv').config()
const User = require('../../models/User')
const { compareSync } = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AuthenticateUser {

    static async execute(userData) {
        const { email, password } = userData
        
        if (!email) {
            throw new Error('Invalid credentials!')
        }

        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            throw new Error('Email/Password incorrect!')
        }

        const passwordMatch = compareSync(password, user.password)

        if (!passwordMatch) {
            throw new Error('Email/Password incorrect!')
        }

        const token = jwt.sign({
            email: user.email
        }, 
        process.env.JWT_SECRET,
        {
            subject: (user.id).toString(),
            expiresIn: '1d'
        })

        return token
    }
}

module.exports = AuthenticateUser
