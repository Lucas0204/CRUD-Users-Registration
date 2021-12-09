const User = require('../../model/User')
const bcrypt = require('bcryptjs')

class CreateUserService {
    constructor(data) {
        this.data = data
    }

    async execute() {
        await this.validateData()

        const user = await this.createUser()
        user.password = undefined

        return user;
    }

    async validateData() {
        const { name, email, password } = this.data

        if (!name || !email || !password) {
            throw new Error('Some field is missing!')
        }

        const emailAlreadyExists = await User.exists(email)

        if (emailAlreadyExists) {
            throw new Error('Email is already exists!')
        }
    }

    async createUser() {
        const { name, email, password, admin } = this.data
        const passwordHash = bcrypt.hashSync(password)

        try {
            const user = await User.create({ 
                name, 
                email, 
                password: passwordHash, 
                admin 
            })

            return user
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

module.exports = CreateUserService
