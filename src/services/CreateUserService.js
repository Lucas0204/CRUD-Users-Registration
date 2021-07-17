const User = require('../models/User')
const bcrypt = require('bcryptjs')

const createUserService = {

    execute: async (data) => {
        const { name, email, password, admin } = data

        const emailAlreadyExists = await User.findOne({
            where: { email }
        })

        if (emailAlreadyExists) {
            throw new Error('Email is already exists!')
        }

        const passwordHash = bcrypt.hashSync(password)

        const user = await User.create({ name, email, password: passwordHash, admin })

        user.password = undefined

        return user;
    }
}

module.exports = createUserService
