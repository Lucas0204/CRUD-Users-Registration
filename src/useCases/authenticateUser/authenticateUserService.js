require('dotenv').config()
const User = require('../../model/User')
const { compareSync } = require('bcryptjs')
const jwt = require('jsonwebtoken')

class authenticateUserService {
    constructor(email, password) {
        if (!email || !password) throw new Error('Invalid credentials!')

        this.email = email
        this.password = password
    }

    async execute() {
        const user = await User.getSingleUser({ email: this.email })

        if (!user) {
            throw new Error('Email/Password incorrect!')
        }

        if (!this.passwordMatch(user.password)) {
            throw new Error('Email/Password incorrect!')
        }

        const token = this.generateToken(user.id)

        return token
    }

    passwordMatch(userPassword) {
        const passwordMatch = compareSync(this.password, userPassword)
        return passwordMatch
    }

    generateToken(userId) {
        const token = jwt.sign({
            email: this.email
        }, 
        process.env.JWT_SECRET,
        {
            subject: (userId).toString(),
            expiresIn: '1d'
        })

        return token
    }
}

module.exports = authenticateUserService
