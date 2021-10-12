const User = require('../../model/User')
const bcrypt = require('bcryptjs')

class CreateUserService {
    constructor(data) {
        this.data = data
    }

    async execute() {
        this.validateData()

        const { email } = this.data

        const emailAlreadyExists = await User.exists(email)

        if (emailAlreadyExists) {
            throw new Error('Email is already exists!')
        }

        const user = await this.createUser()

        user.password = undefined

        return user;
    }

    validateData() {
        const { name, email, password } = this.data

        if (!name) throw new Error('The name field is missing!')

        if (!email) throw new Error('The email field is missing!')
        
        if (!password) throw new Error('The password field is missing!')
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
