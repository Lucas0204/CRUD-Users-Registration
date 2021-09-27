const prisma = require('../../database/prisma')

class ListUsersService {

    static async execute() {
        let users = await prisma.users.findMany()

        if (users) {
            users = users.map(user => {
                const { id, name, email, admin, createdAt, updatedAt } = user

                return {
                    id,
                    name,
                    email,
                    admin,
                    createdAt,
                    updatedAt
                }
            })
        }

        return users
    }
}

module.exports = ListUsersService
