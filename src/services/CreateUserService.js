const User = require('../models/User')
const bcrypt = require('bcryptjs')

const createUserService = {

    execute: async (data) => {
        const { name, email, password, admin } = data

        if (!name || !email || !password) {
            throw new Error('Error! Invalid credentials!')
        }

        const emailAlreadyExists = await User.findOne({
            where: { email }
        })

        if (emailAlreadyExists) {
            throw new Error('Email is already exists!')
        }

        const passwordHash = bcrypt.hashSync(password)

        const user = await User.create({ name, email, password: passwordHash, admin })

        return user;
    }
}

module.exports = createUserService
