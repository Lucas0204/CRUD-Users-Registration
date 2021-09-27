const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

class CreateUserService {

    static async execute(data) {
        const { name, email, password, admin } = data

        const emailAlreadyExists = await prisma.users.findUnique({
            where: { email }
        })

        if (emailAlreadyExists) {
            throw new Error('Email is already exists!')
        }

        const passwordHash = bcrypt.hashSync(password)

        const user = await prisma.users.create({
            data: { 
                name, 
                email, 
                password: passwordHash, 
                admin 
            }
        })

        user.password = undefined

        return user;
    }
}

module.exports = CreateUserService
