const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class ListOneUserService {

    static async execute(id) {
        const user = await prisma.users.findUnique({
            where: { id: parseInt(id) }
        })

        if (!user) {
            throw new Error('Error! User is not found!')
        }

        user.password = undefined

        return user
    }
}

module.exports = ListOneUserService
