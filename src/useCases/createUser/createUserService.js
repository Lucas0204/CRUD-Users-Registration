const User = require('../../model/User')
const bcrypt = require('bcryptjs')

class CreateUserService {

    static async execute(data) {
        const { name, email, password, admin } = data

        const emailAlreadyExists = await User.exists(email)

        if (emailAlreadyExists) {
            throw new Error('Email is already exists!')
        }

        const passwordHash = bcrypt.hashSync(password)

        const user = await User.create({ 
            name, 
            email, 
            password: passwordHash, 
            admin 
        })

        user.password = undefined

        return user;
    }
}

module.exports = CreateUserService
